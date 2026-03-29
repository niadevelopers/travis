require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static(__dirname)); 

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

function cleanPhone(phone) {
  if (!phone) return null;
  return phone.toString().replace(/[\s\-\+]/g, '');
}

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

app.post('/register', async (req, res) => {
  const { fullName, location, phone, email, password } = req.body;
  if (!fullName || !location || !phone || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ error: 'Phone already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, location, phone, email: email || undefined, password: hashed });
    res.json({ message: 'Registered successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    const user = await User.findOne({ phone: phone.trim() });

    if (!user) {
      console.log(" User not found");
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

app.post('/initiate-stk', auth, async (req, res) => {
  let { targetPhone, payerMsisdn } = req.body;

  if (!targetPhone || !payerMsisdn) {
    return res.status(400).json({ error: 'Both phone numbers are required' });
  }

  const cleanedTarget = cleanPhone(targetPhone);
  const cleanedPayer = cleanPhone(payerMsisdn);

  if (!cleanedTarget || !cleanedPayer) {
    return res.status(400).json({ error: 'Invalid phone numbers' });
  }

  const reference = `TRV-${Date.now()}`;

  try {
    await Payment.create({
      userId: req.user.id,
      targetPhone: cleanedTarget,    
      reference,
      amount: 750,
      msisdn: cleanedPayer.replace(/^0/, '254'),
      status: 'pending'
    });

    console.log(`Payment created for target phone: ${cleanedTarget}`);

    const payload = {
      api_key: process.env.PESAFLUX_API_KEY,
      email: process.env.PESAFLUX_EMAIL,
      amount: 750,
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

app.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

app.get('/my-queries', auth, async (req, res) => {
  const logs = await QueryLog.find({ userId: req.user.id }).sort({ queriedAt: -1 });
  res.json(logs);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
