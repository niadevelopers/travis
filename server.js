require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// ====================== CORS — allow all origins ======================
// NOTE: cors() already handles OPTIONS preflight on its own.
// Do NOT add app.options('*', ...) — Express 5 rejects '*' as a path.
app.use(cors({
  origin: true,
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

// ====================== Supabase Postgres Connection Pool ======================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000
});

pool.query('SELECT NOW()')
  .then(() => console.log('✅ Supabase Postgres connected successfully'))
  .catch(err => console.error('❌ Supabase connection error:', err.message));

// ====================== Helper Functions ======================
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

function normalizeKenyanPhone(phone) {
  if (!phone) return '';
  let p = phone.toString().replace(/[\s\-\(\)]/g, '');
  if (p.startsWith('+')) p = p.slice(1);
  if (p.startsWith('0')) p = '254' + p.slice(1);
  if (p.startsWith('7') || p.startsWith('1')) p = '254' + p;
  return p;
}

// ====================== Auth Middleware ======================
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

// ====================== Phone-specific fingerprint lookup ======================
app.post('/lookup-fingerprint', async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  const normalized = normalizeKenyanPhone(phone);
  if (!/^254(7|1)\d{8}$/.test(normalized)) {
    return res.status(400).json({ error: 'Invalid Kenyan phone number' });
  }

  const localForm = '0' + normalized.slice(3);
  const plusForm  = '+' + normalized;

  try {
    const fpRes = await pool.query(
      `SELECT fp, used FROM fingerprints
       WHERE phone = ANY($1::text[])
       LIMIT 1`,
      [[normalized, localForm, plusForm]]
    );

    if (fpRes.rows[0] && fpRes.rows[0].fp) {
      const storedFp = fpRes.rows[0].fp;
      const extracted = storedFp.substring(3, 11);
      const formattedFP = `TRV-KE-${extracted}-5634`;
      return res.json({
        phone: normalized,
        fingerprint: formattedFP,
        source: 'fingerprints',
        used: !!fpRes.rows[0].used
      });
    }

    const logRes = await pool.query(
      `SELECT formatted_fp FROM query_logs
       WHERE target_phone = ANY($1::text[])
       ORDER BY queried_at DESC
       LIMIT 1`,
      [[normalized, localForm, plusForm]]
    );

    if (logRes.rows[0] && logRes.rows[0].formatted_fp) {
      return res.json({
        phone: normalized,
        fingerprint: logRes.rows[0].formatted_fp,
        source: 'query_logs'
      });
    }

    return res.status(404).json({ error: 'No fingerprint found for that number' });
  } catch (e) {
    console.error('Lookup error:', e);
    return res.status(500).json({ error: 'Server error during lookup' });
  }
});

app.get('/my-queries', auth, async (req, res) => {
  try {
    const logsRes = await pool.query(
      `SELECT 
         target_phone,
         formatted_fp AS "formattedFP",
         receipt,
         queried_at AS "queriedAt"
       FROM query_logs 
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
        formattedFP: log.formattedFP || '',
        receipt: log.receipt || '-',
        queriedAt: log.queriedAt,
        maskedPhone: maskedPhone,
        targetPhone: undefined
      };
    });

    res.json(maskedLogs);
  } catch (e) {
    console.error("My Queries Error:", e);
    res.status(500).json({ error: 'Failed to load queries' });
  }
});

app.get('/me', auth, async (req, res) => {
  try {
    const userRes = await pool.query(
      `SELECT 
         full_name AS "fullName",
         phone,
         success_queries AS "successQueries",
         failure_queries AS "failureQueries"
       FROM users 
       WHERE id = $1`,
      [req.user.id]
    );

    res.json(userRes.rows[0] || {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'travis-api', time: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
