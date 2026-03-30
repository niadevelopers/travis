require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();
app.set('trust proxy', 1);   // ← trust proxy layer 1 so rate limiting doesnt bother me

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://travis-three.vercel.app',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.static(__dirname));

const authLimiter = rateLimit({
  windowMs: 60 * 1000,    
  max: 5,
  message: { error: 'Too many attempts. Please wait 60 seconds before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const stkLimiter = rateLimit({
  windowMs: 60 * 1000,     
  max: 5,                 
  message: { error: 'Too many payment requests. Please wait 60 seconds before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});


function sanitizePhone(phone) {
  if (!phone) return '';
  return phone.toString().replace(/[^0-9+]/g, '').trim();
}

function cleanPhone(phone) {
  if (!phone) return null;
  return phone.toString().replace(/[\s\-\+]/g, '');
}

function isValidKenyanPhone(phone) {
  const cleaned = sanitizePhone(phone);
  return /^(\+?254|0)[17]\d{8}$/.test(cleaned) && cleaned.length >= 9;
}

function sanitizeText(text) {
  if (!text) return '';
  return text.toString().trim().replace(/[<>"/\\]/g, '');
}


const userSchema = new mongoose.Schema({
  fullName: String,
  location: String,
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  successQueries: { type: Number, default: 0 },
  failureQueries: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const fingerprintSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  fp: { type: String, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const paymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  targetPhone: String,
  reference: { type: String, unique: true },
  status: { type: String, default: 'pending' },
  amount: Number,
  msisdn: String,
  initiatedAt: { type: Date, default: Date.now }
});

const queryLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  targetPhone: String,
  formattedFP: String,
  status: String,
  receipt: String,
  queriedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Fingerprint = mongoose.model('Fingerprint', fingerprintSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const QueryLog = mongoose.model('QueryLog', queryLogSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

function decryptFingerprint(encryptedBase64) {
  const key = "TRAVIS-GUARDIAN-SECURE-2026-x7k9";
  let decoded;
  try {
    decoded = Buffer.from(encryptedBase64, 'base64').toString('binary');
  } catch { return null; }
  let fp = '';
  for (let i = 0; i < decoded.length; i++) {
    fp += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return fp;
}

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error("JWT Error:", e.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/register', authLimiter, async (req, res) => {
  const { fullName, location, phone, email, password } = req.body;

  const sanitizedFullName = sanitizeText(fullName);
  const sanitizedLocation = sanitizeText(location);
  const sanitizedPhone = sanitizePhone(phone);
  const sanitizedPassword = password ? password.toString().trim() : '';

  if (!sanitizedFullName || !sanitizedLocation || !sanitizedPhone || !sanitizedPassword) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  if (!isValidKenyanPhone(sanitizedPhone)) {
    return res.status(400).json({ error: 'Invalid Kenyan phone number' });
  }

  if (sanitizedPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const existing = await User.findOne({ phone: sanitizedPhone });
    if (existing) return res.status(400).json({ error: 'Phone already registered' });

    const hashed = await bcrypt.hash(sanitizedPassword, 10);
    await User.create({
      fullName: sanitizedFullName,
      location: sanitizedLocation,
      phone: sanitizedPhone,
      email: email ? email.trim() : undefined,
      password: hashed
    });

    res.json({ message: 'Registered successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', authLimiter, async (req, res) => {
  try {
    let { phone, password } = req.body;

    phone = sanitizePhone(phone);
    password = password ? password.toString().trim() : '';

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    if (!isValidKenyanPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        fullName: user.fullName,
        phone: user.phone,
        successQueries: user.successQueries || 0,
        failureQueries: user.failureQueries || 0
      }
    });

  } catch (err) {
    console.error("LOGIN ROUTE CRASHED:", err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

app.post('/initiate-stk', auth, stkLimiter, async (req, res) => {
  let { targetPhone, payerMsisdn } = req.body;

  if (!targetPhone || !payerMsisdn) {
    return res.status(400).json({ error: 'Both phone numbers are required' });
  }

  const cleanedTarget = cleanPhone(targetPhone);
  const cleanedPayer = cleanPhone(payerMsisdn);

  if (!cleanedTarget || !cleanedPayer || !isValidKenyanPhone(targetPhone) || !isValidKenyanPhone(payerMsisdn)) {
    return res.status(400).json({ error: 'Invalid phone numbers' });
  }

  const reference = `TRV-${Date.now()}`;

  try {
    await Payment.create({
      userId: req.user.id,
      targetPhone: cleanedTarget,    
      reference,
      amount: 1,
      msisdn: cleanedPayer.replace(/^0/, '254'),
      status: 'pending'
    });

    console.log(`Payment created for target phone: ${cleanedTarget}`);

    const payload = {
      api_key: process.env.PESAFLUX_API_KEY,
      email: process.env.PESAFLUX_EMAIL,
      amount: 1,
      msisdn: cleanedPayer.replace(/^0/, '254'),
      reference: reference
    };

    await axios.post('https://api.pesaflux.co.ke/v1/initiatestk', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json({
      success: true,
      message: "STK Push sent! Check your phone and complete the payment."
    });

  } catch (error) {
    console.error("STK Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to send STK Push" });
  }
});

app.post('/store-fingerprint', async (req, res) => {
  const { encrypted, phone } = req.body;
  if (!encrypted || !phone) return res.status(400).json({ error: 'Missing data' });

  const fp = decryptFingerprint(encrypted);
  if (!fp) return res.status(400).json({ error: 'Invalid fingerprint' });

  await Fingerprint.findOneAndUpdate(
    { phone },
    { phone, fp, used: false, createdAt: new Date() },
    { upsert: true, new: true }
  );

  res.json({ status: 'stored', message: 'Device fingerprint linked successfully' });
});

app.post('/pesaflux-webhook', async (req, res) => {
  const data = req.body;
  console.log("=== WEBHOOK RECEIVED ===", JSON.stringify(data, null, 2));

  res.status(200).send('OK');

  if (data.ResponseCode === 0) {
    const reference = data.TransactionReference || data.reference;

    const payment = await Payment.findOne({ reference, status: 'pending' });

    if (!payment) {
      console.log("No pending payment found for reference:", reference);
      return;
    }

    const cleanedTarget = cleanPhone(payment.targetPhone);

    const fpDoc = await Fingerprint.findOne({ phone: cleanedTarget });

    if (!fpDoc || fpDoc.used) {
      console.log("Fingerprint not found for cleaned phone:", cleanedTarget);
      return;
    }

    const extracted = fpDoc.fp.substring(3, 11);
    const formattedFP = `TRV-KE-${extracted}-5634`;

    await QueryLog.create({
      userId: payment.userId,
      targetPhone: payment.targetPhone,
      formattedFP: formattedFP,
      status: 'success',
      receipt: data.TransactionReceipt
    });

    await User.findByIdAndUpdate(payment.userId, { $inc: { successQueries: 1 } });

    fpDoc.used = true;
    await fpDoc.save();

    payment.status = 'success';
    await payment.save();
  }
});

app.get('/my-queries', auth, async (req, res) => {
  const logs = await QueryLog.find({ userId: req.user.id }).sort({ queriedAt: -1 });

  // Mask the target phone (last 3 digits hidden)
  const maskedLogs = logs.map(log => {
    const phone = log.targetPhone || '';
    const maskedPhone = phone.length > 3 
      ? phone.slice(0, -3) + 'XXX' 
      : phone + 'XXX';

    return {
      ...log.toObject(),
      maskedPhone: maskedPhone,        // This is what frontend will display
      targetPhone: undefined           // Hide full phone from response
    };
  });

  res.json(maskedLogs);
});

app.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});





app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
