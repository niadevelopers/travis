require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { Pool } = require('pg');   // ← New for Supabase Postgres

const app = express();
app.set('trust proxy', 1);

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

// ====================== Supabase Postgres Connection Pool ======================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000   // Increased timeout
});

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Supabase Postgres connected successfully'))
  .catch(err => console.error('❌ Supabase connection error:', err.message));

// ====================== Helper Functions (Unchanged) ======================
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

// ====================== Auth Middleware (Unchanged) ======================
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

// ====================== Routes ======================

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
    const existing = await pool.query('SELECT id FROM users WHERE phone = $1', [sanitizedPhone]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Phone already registered' });
    }

    const hashed = await bcrypt.hash(sanitizedPassword, 10);

    await pool.query(
      `INSERT INTO users (full_name, location, phone, email, password)
       VALUES ($1, $2, $3, $4, $5)`,
      [sanitizedFullName, sanitizedLocation, sanitizedPhone, email ? email.trim() : null, hashed]
    );

    res.json({ message: 'Registered successfully' });
  } catch (e) {
    console.error(e);
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

    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        fullName: user.full_name,
        phone: user.phone,
        successQueries: user.success_queries || 0,
        failureQueries: user.failure_queries || 0
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

  if (!cleanedTarget || !cleanedPayer || 
      !isValidKenyanPhone(targetPhone) || 
      !isValidKenyanPhone(payerMsisdn)) {
    return res.status(400).json({ error: 'Invalid phone numbers' });
  }

  const reference = `TRV-${Date.now()}`;

  try {
    await pool.query(
      `INSERT INTO payments (user_id, target_phone, reference, amount, msisdn, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [req.user.id, cleanedTarget, reference, 1, cleanedPayer.replace(/^0/, '254'), 'pending']
    );

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

  try {
    await pool.query(
      `INSERT INTO fingerprints (phone, fp, used, created_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (phone) DO UPDATE 
       SET fp = $2, used = $3, created_at = NOW()`,
      [phone, fp, false]
    );

    res.json({ status: 'stored', message: 'Device fingerprint linked successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/pesaflux-webhook', async (req, res) => {
  const data = req.body;
  console.log("=== WEBHOOK RECEIVED ===", JSON.stringify(data, null, 2));
  res.status(200).send('OK');

  if (data.ResponseCode === 0) {
    const reference = data.TransactionReference || data.reference;

    try {
      const paymentRes = await pool.query(
        `SELECT * FROM payments WHERE reference = $1 AND status = 'pending'`,
        [reference]
      );
      const payment = paymentRes.rows[0];

      if (!payment) {
        console.log("No pending payment found for reference:", reference);
        return;
      }

      const cleanedTarget = cleanPhone(payment.target_phone);
      const fpRes = await pool.query('SELECT * FROM fingerprints WHERE phone = $1', [cleanedTarget]);
      const fpDoc = fpRes.rows[0];

      if (!fpDoc || fpDoc.used) {
        console.log("Fingerprint not found or already used for phone:", cleanedTarget);
        return;
      }

      const extracted = fpDoc.fp.substring(3, 11);
      const formattedFP = `TRV-KE-${extracted}-5634`;

      await pool.query(
        `INSERT INTO query_logs (user_id, target_phone, formatted_fp, status, receipt, queried_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [payment.user_id, payment.target_phone, formattedFP, 'success', data.TransactionReceipt]
      );

      await pool.query(
        `UPDATE users SET success_queries = success_queries + 1 WHERE id = $1`,
        [payment.user_id]
      );

      await pool.query('UPDATE fingerprints SET used = true WHERE phone = $1', [cleanedTarget]);
      await pool.query("UPDATE payments SET status = 'success' WHERE reference = $1", [reference]);

    } catch (e) {
      console.error("Webhook processing error:", e);
    }
  }
});

app.get('/my-queries', auth, async (req, res) => {
  try {
    const logsRes = await pool.query(
      `SELECT * FROM query_logs 
       WHERE user_id = $1 
       ORDER BY queried_at DESC`,
      [req.user.id]
    );

    const logs = logsRes.rows;

    const maskedLogs = logs.map(log => {
      const phone = log.target_phone || '';
      const maskedPhone = phone.length > 3
        ? phone.slice(0, -3) + 'XXX'
        : phone + 'XXX';

      return {
        ...log,
        maskedPhone: maskedPhone,
        target_phone: undefined   // hide full phone
      };
    });

    res.json(maskedLogs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/me', auth, async (req, res) => {
  try {
    const userRes = await pool.query(
      `SELECT id, full_name, location, phone, email, success_queries, failure_queries, created_at 
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    const user = userRes.rows[0];
    if (user) {
      user.fullName = user.full_name;   // match old frontend expectation
      delete user.full_name;
    }

    res.json(user || {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
