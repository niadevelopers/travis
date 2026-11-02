require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const webpush = require('web-push');
const crypto = require('crypto');

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// ====================== CORS — allow all origins ======================
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

// Stricter limiter for device endpoints (registration = free, verify = cheap)
const deviceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Verify is cheap (one indexed read) and many phones share one carrier IP, so allow more.
const verifyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

// ====================== Web Push (VAPID) ======================
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:jobisaacmaina22@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ====================== Device Signing Secret ======================
// MUST be set in .env. If missing, refuse to start.
const DEVICE_SIGNING_SECRET = process.env.DEVICE_SIGNING_SECRET;
if (!DEVICE_SIGNING_SECRET || DEVICE_SIGNING_SECRET.length < 32) {
  console.error('❌ FATAL: DEVICE_SIGNING_SECRET missing or too short (need >=32 chars).');
  console.error('   Generate one:  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
  process.exit(1);
}

const DEVICE_TOKEN_TTL_DAYS = 365; // how long a device stays registered

// ====================== Activation mode (scaling provision) ======================
// 'free' : every registered device is active immediately (CURRENT BEHAVIOUR).
// 'paid' : new devices start as 'pending' and get no activation code until
//          grantActivation() is called (from the PesaFlux/Daraja callback, ResultCode 0).
const ACTIVATION_MODE = (process.env.ACTIVATION_MODE || 'free').toLowerCase() === 'paid' ? 'paid' : 'free';
console.log(`ℹ️  Activation mode: ${ACTIVATION_MODE}`);

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

// Bootstrap tables (idempotent)
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        endpoint TEXT UNIQUE NOT NULL,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Legacy table kept for backward compat / /lookup-fingerprint
    await pool.query(`
      CREATE TABLE IF NOT EXISTS fingerprints (
        phone TEXT PRIMARY KEY,
        fp TEXT NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Server-issued device records
    await pool.query(`
      CREATE TABLE IF NOT EXISTS devices (
        device_id      CHAR(32) PRIMARY KEY,
        phone          TEXT NOT NULL,
        token_jti      TEXT NOT NULL UNIQUE,
        issued_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at     TIMESTAMPTZ NOT NULL,
        revoked_at     TIMESTAMPTZ,
        last_seen_at   TIMESTAMPTZ,
        last_ip        TEXT,
        last_ua        TEXT
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_devices_phone ON devices(phone)`);

    // Provision for paid activation (safe on existing tables)
    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activation_status TEXT NOT NULL DEFAULT 'active'`);
    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activated_at TIMESTAMPTZ`);
    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activation_ref TEXT`);

    // Audit log for every register / verify attempt
    await pool.query(`
      CREATE TABLE IF NOT EXISTS device_events (
        id          BIGSERIAL PRIMARY KEY,
        device_id   CHAR(32),
        phone       TEXT,
        event_type  TEXT NOT NULL,
        success     BOOLEAN NOT NULL,
        reason      TEXT,
        ip          TEXT,
        ua          TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_device_events_dev ON device_events(device_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_device_events_created ON device_events(created_at DESC)`);

    console.log('✅ tables ready (push_subscriptions, fingerprints, devices, device_events)');
  } catch (err) {
    console.error('❌ table bootstrap error:', err.message);
  }

  // One live device per phone, enforced by the database (closes the register race).
  // Separate try so a pre-existing duplicate can't break the rest of the bootstrap.
  try {
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_device_phone
      ON devices(phone) WHERE revoked_at IS NULL
    `);
  } catch (err) {
    console.error('⚠️ could not create uniq_active_device_phone (duplicate live devices for one phone exist?):', err.message);
  }
})();

// Audit rows older than 30 days are deleted daily so the table can't grow without bound.
async function pruneDeviceEvents() {
  try {
    await pool.query(`DELETE FROM device_events WHERE created_at < NOW() - INTERVAL '30 days'`);
  } catch (e) {
    console.error('prune device_events failed:', e.message);
  }
}
setTimeout(pruneDeviceEvents, 60 * 1000);
setInterval(pruneDeviceEvents, 24 * 3600 * 1000);

// ====================== Helpers ======================
function sanitizePhone(phone) {
  if (!phone) return '';
  return phone.toString().replace(/[^0-9+]/g, '').trim();
}

function isValidKenyanPhone(phone) {
  const cleaned = sanitizePhone(phone);
  return /^(\+?254|0)[17]\d{8}$/.test(cleaned) && cleaned.length >= 9;
}

function sanitizeText(text) {
  if (!text) return '';
  return text.toString().trim().replace(/[<>"/\\]/g, '');
}

function normalizeKenyanPhone(phone) {
  if (!phone) return '';
  let p = phone.toString().replace(/[\s\-\(\)]/g, '');
  if (p.startsWith('+')) p = p.slice(1);
  if (p.startsWith('0')) p = '254' + p.slice(1);
  if (p.startsWith('7') || p.startsWith('1')) p = '254' + p;
  return p;
}

// device_id is 32 UPPERCASE hex chars. Uppercase on purpose: the client (and any
// other client module) derives the code with fingerprint.substring(3, 11) and the
// activation input is upper-cased before comparing, so the code must be uppercase.
const DEVICE_ID_RE = /^[A-F0-9]{32}$/;

function deriveActivationCode(deviceId) {
  // MUST match client: TRV-KE-<deviceId[3..11]>-5634
  return `TRV-KE-${String(deviceId).substring(3, 11).toUpperCase()}-5634`;
}

// ---- Future payment hook -------------------------------------------------
// Call this from the PesaFlux / Daraja callback when ResultCode === 0.
// In 'free' mode devices are already active, so nothing calls this yet.
async function grantActivation(deviceId, reference) {
  const r = await pool.query(
    `UPDATE devices
        SET activation_status = 'active', activated_at = NOW(), activation_ref = $2
      WHERE device_id = $1 AND revoked_at IS NULL
      RETURNING device_id`,
    [deviceId, reference || null]
  );
  return r.rowCount > 0;
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

// ====================== Legacy Routes ======================

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

    if (!phone || !password) return res.status(400).json({ error: 'Phone and password are required' });
    if (!isValidKenyanPhone(phone)) return res.status(400).json({ error: 'Invalid phone number' });
    if (password.length < 6) return res.status(400).json({ error: 'Invalid credentials' });

    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

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

// ====================== /register-device ======================
// Called ONCE per install (from the phone modal). Issues device_id + signed token.
// The client stores device_id as its fingerprint and derives the activation code from it.
app.post('/register-device', deviceLimiter, async (req, res) => {
  const { phone } = req.body || {};
  const cleanPhone = sanitizePhone(phone);
  const ip = req.ip;
  const ua = (req.headers['user-agent'] || '').substring(0, 500);

  if (!cleanPhone || !isValidKenyanPhone(cleanPhone)) {
    return res.status(400).json({ error: 'Valid Kenyan phone number required' });
  }

  // Always store/compare ONE canonical format (254XXXXXXXXX) so 0712…, +254712… and
  // 254712… are the same phone and can't be used to get several devices.
  const phoneKey = normalizeKenyanPhone(cleanPhone);

  try {
    // Housekeeping: a device past its expiry no longer blocks the phone.
    await pool.query(
      `UPDATE devices SET revoked_at = NOW()
       WHERE phone = $1 AND revoked_at IS NULL AND expires_at <= NOW()`,
      [phoneKey]
    );

    const existing = await pool.query(
      `SELECT device_id FROM devices
       WHERE phone = $1 AND revoked_at IS NULL AND expires_at > NOW()
       ORDER BY issued_at DESC LIMIT 1`,
      [phoneKey]
    );
    if (existing.rows[0]) {
      await pool.query(
        `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
         VALUES ($1, $2, 'register', FALSE, 'phone_already_linked', $3, $4)`,
        [existing.rows[0].device_id, phoneKey, ip, ua]
      ).catch(() => {});
      return res.status(409).json({
        error: 'This phone number is already linked to a device. Restore your backup on that device, or contact support to move it.',
        device_id_masked: existing.rows[0].device_id.substring(0, 6) + '…'
      });
    }

    // 32 uppercase hex chars, cryptographically random.
    const deviceId = crypto.randomBytes(16).toString('hex').toUpperCase();

    const jti = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + DEVICE_TOKEN_TTL_DAYS * 86400 * 1000);
    const token = jwt.sign(
      { sub: deviceId, phone: phoneKey, jti, type: 'device' },
      DEVICE_SIGNING_SECRET,
      { expiresIn: `${DEVICE_TOKEN_TTL_DAYS}d` }
    );

    const activationStatus = ACTIVATION_MODE === 'paid' ? 'pending' : 'active';

    try {
      await pool.query(
        `INSERT INTO devices
           (device_id, phone, token_jti, issued_at, expires_at, last_seen_at, last_ip, last_ua,
            activation_status, activated_at)
         VALUES ($1, $2, $3, NOW(), $4, NOW(), $5, $6, $7,
                 CASE WHEN $7 = 'active' THEN NOW() ELSE NULL END)`,
        [deviceId, phoneKey, jti, expiresAt, ip, ua, activationStatus]
      );
    } catch (insErr) {
      // Two simultaneous registrations for one phone: the unique index lets only one win.
      if (insErr.code === '23505') {
        return res.status(409).json({
          error: 'This phone number is already linked to a device. Restore your backup on that device, or contact support to move it.'
        });
      }
      throw insErr;
    }

    // Non-fatal extras: a failure here must NOT leave the user with a registered-but-unusable device.
    try {
      await pool.query(
        `INSERT INTO fingerprints (phone, fp, used, created_at)
         VALUES ($1, $2, TRUE, NOW())
         ON CONFLICT (phone) DO UPDATE SET fp = $2, used = TRUE, created_at = NOW()`,
        [phoneKey, deviceId]
      );
      await pool.query(
        `INSERT INTO device_events (device_id, phone, event_type, success, ip, ua)
         VALUES ($1, $2, 'register', TRUE, $3, $4)`,
        [deviceId, phoneKey, ip, ua]
      );
    } catch (extraErr) {
      console.error('register-device (non-fatal) extras failed:', extraErr.message);
    }

    const body = {
      device_id: deviceId,
      token,
      activation_status: activationStatus,
      expires_at: expiresAt.toISOString()
    };
    // The code is only revealed once the device is active (immediately in 'free' mode).
    if (activationStatus === 'active') body.activationCode = deriveActivationCode(deviceId);

    return res.json(body);
  } catch (e) {
    console.error('register-device error:', e);
    await pool.query(
      `INSERT INTO device_events (phone, event_type, success, reason, ip, ua)
       VALUES ($1, 'register', FALSE, $2, $3, $4)`,
      [phoneKey, String(e.message).substring(0, 200), ip, ua]
    ).catch(() => {});
    return res.status(500).json({ error: 'Server error during device registration' });
  }
});

// ====================== /verify-device ======================
// Called by the client on activation and on every online boot.
// Client rule: ONLY a response with valid:false and HTTP 401/403/404 sends the user
// back to the activation window. Timeouts / 429 / 5xx never do.
app.post('/verify-device', verifyLimiter, async (req, res) => {
  const { fp, token } = req.body || {};
  const ip = req.ip;
  const ua = (req.headers['user-agent'] || '').substring(0, 500);

  if (!fp || !token) {
    return res.status(400).json({ valid: false, reason: 'missing_fields' });
  }

  // Only well-formed ids are logged / queried (fp is client-controlled input).
  const fpOk = typeof fp === 'string' && DEVICE_ID_RE.test(fp);

  const event = (success, reason, deviceId = fpOk ? fp : null, phone = null) =>
    pool.query(
      `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
       VALUES ($1, $2, 'verify', $3, $4, $5, $6)`,
      [deviceId, phone, success, reason, ip, ua]
    ).catch(() => {});

  try {
    if (!fpOk) {
      await event(false, 'malformed_fp');
      return res.status(401).json({ valid: false, reason: 'malformed_fp' });
    }

    // 1. Verify JWT signature + expiry.
    let decoded;
    try {
      decoded = jwt.verify(token, DEVICE_SIGNING_SECRET);
    } catch (e) {
      await event(false, 'bad_signature_or_expired');
      return res.status(401).json({ valid: false, reason: 'bad_signature_or_expired' });
    }

    if (decoded.type !== 'device' || !decoded.sub || !decoded.jti) {
      await event(false, 'malformed_token');
      return res.status(401).json({ valid: false, reason: 'malformed_token' });
    }

    // 2. Token must match the fp the client is claiming.
    if (decoded.sub !== fp) {
      await event(false, 'fp_token_mismatch', fp, decoded.phone);
      return res.status(401).json({ valid: false, reason: 'fp_token_mismatch' });
    }

    // 3. Device must exist and not be revoked.
    const row = await pool.query(
      `SELECT device_id, phone, token_jti, revoked_at, expires_at, activation_status, last_seen_at
       FROM devices WHERE device_id = $1`,
      [fp]
    );
    const dev = row.rows[0];
    if (!dev) {
      await event(false, 'unknown_device', fp, decoded.phone);
      return res.status(404).json({ valid: false, reason: 'unknown_device' });
    }
    if (dev.revoked_at) {
      await event(false, 'revoked', fp, dev.phone);
      return res.status(403).json({ valid: false, reason: 'revoked' });
    }
    if (dev.token_jti !== decoded.jti) {
      await event(false, 'token_superseded', fp, dev.phone);
      return res.status(403).json({ valid: false, reason: 'token_superseded' });
    }
    if (new Date(dev.expires_at) < new Date()) {
      await event(false, 'expired', fp, dev.phone);
      return res.status(403).json({ valid: false, reason: 'expired' });
    }
    // 4. Genuine device, but not (yet) paid for. Only reachable in 'paid' mode.
    if (dev.activation_status !== 'active') {
      await event(false, 'not_activated', fp, dev.phone);
      return res.status(403).json({ valid: false, reason: 'not_activated', device_genuine: true });
    }

    // All good. Successful checks are NOT logged (only failures are), and last_seen is
    // refreshed at most once a day and not awaited, so a normal boot is a single read.
    if (!dev.last_seen_at || Date.now() - new Date(dev.last_seen_at).getTime() > 24 * 3600 * 1000) {
      pool.query(
        `UPDATE devices SET last_seen_at = NOW(), last_ip = $2, last_ua = $3 WHERE device_id = $1`,
        [fp, ip, ua]
      ).catch(() => {});
    }

    return res.json({
      valid: true,
      phone: dev.phone,
      activation_status: dev.activation_status,
      activationCode: deriveActivationCode(dev.device_id),
      expires_at: dev.expires_at
    });
  } catch (e) {
    console.error('verify-device error:', e);
    await event(false, 'server_error');
    return res.status(500).json({ valid: false, reason: 'server_error' });
  }
});

// ====================== /revoke-device ======================
// Admin / support endpoint. Protect with ADMIN_SECRET.
// Support flow for "I lost my phone / data": revoke, then the user registers again.
app.post('/revoke-device', async (req, res) => {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { device_id, phone } = req.body || {};
  try {
    if (device_id) {
      await pool.query(
        `UPDATE devices SET revoked_at = NOW() WHERE device_id = $1`,
        [device_id]
      );
    } else if (phone) {
      const p = normalizeKenyanPhone(phone);
      await pool.query(
        `UPDATE devices SET revoked_at = NOW() WHERE phone = $1 AND revoked_at IS NULL`,
        [p]
      );
    } else {
      return res.status(400).json({ error: 'device_id or phone required' });
    }
    res.json({ ok: true });
  } catch (e) {
    console.error('revoke error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ====================== Legacy /store-fingerprint (deprecated) ======================
// Kept so any old clients don't 500. Refuses to accept anything useful.
app.post('/store-fingerprint', async (req, res) => {
  return res.status(410).json({
    error: 'This endpoint is deprecated. Use /register-device. Client-side fingerprint generation is no longer accepted.'
  });
});

// ====================== Legacy /lookup-fingerprint ======================
// Support tool: given a phone, return the activation code derived from the server-issued device_id.
app.post('/lookup-fingerprint', async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  const normalized = normalizeKenyanPhone(phone);
  if (!/^254(7|1)\d{8}$/.test(normalized)) {
    return res.status(400).json({ error: 'Invalid Kenyan phone number' });
  }
  const localForm = '0' + normalized.slice(3);
  const plusForm = '+' + normalized;
  const forms = [normalized, localForm, plusForm];

  try {
    // Source of truth: devices (active + paid/activated only)
    const devRes = await pool.query(
      `SELECT device_id, revoked_at, expires_at FROM devices
       WHERE phone = ANY($1::text[]) AND revoked_at IS NULL AND expires_at > NOW()
         AND activation_status = 'active'
       ORDER BY issued_at DESC LIMIT 1`,
      [forms]
    );
    if (devRes.rows[0]) {
      return res.json({
        phone: normalized,
        fingerprint: deriveActivationCode(devRes.rows[0].device_id),
        source: 'devices'
      });
    }

    // Fallback: legacy fingerprints
    const fpRes = await pool.query(
      `SELECT fp FROM fingerprints WHERE phone = ANY($1::text[]) LIMIT 1`,
      [forms]
    );
    if (fpRes.rows[0]?.fp) {
      const extracted = fpRes.rows[0].fp.substring(3, 11);
      return res.json({
        phone: normalized,
        fingerprint: `TRV-KE-${extracted}-5634`,
        source: 'fingerprints'
      });
    }

    return res.status(404).json({ error: 'No device found for that number' });
  } catch (e) {
    console.error('Lookup error:', e);
    return res.status(500).json({ error: 'Server error during lookup' });
  }
});

app.get('/my-queries', auth, async (req, res) => {
  try {
    const logsRes = await pool.query(
      `SELECT target_phone, formatted_fp AS "formattedFP", receipt, queried_at AS "queriedAt"
       FROM query_logs WHERE user_id = $1 ORDER BY queried_at DESC`,
      [req.user.id]
    );
    const logs = logsRes.rows.map(log => {
      const phone = log.target_phone || '';
      const maskedPhone = phone.length > 3 ? phone.slice(0, -3) + 'XXX' : phone + 'XXX';
      return {
        formattedFP: log.formattedFP || '',
        receipt: log.receipt || '-',
        queriedAt: log.queriedAt,
        maskedPhone
      };
    });
    res.json(logs);
  } catch (e) {
    console.error("My Queries Error:", e);
    res.status(500).json({ error: 'Failed to load queries' });
  }
});

app.get('/me', auth, async (req, res) => {
  try {
    const userRes = await pool.query(
      `SELECT full_name AS "fullName", phone, success_queries AS "successQueries", failure_queries AS "failureQueries"
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    res.json(userRes.rows[0] || {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ====================== Web Push ======================
app.get('/vapid-public-key', (req, res) => {
  res.json({ key: process.env.VAPID_PUBLIC_KEY });
});

app.post('/subscribe', async (req, res) => {
  const sub = req.body;
  if (!sub || !sub.endpoint || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }
  try {
    await pool.query(
      `INSERT INTO push_subscriptions (endpoint, p256dh, auth) VALUES ($1, $2, $3)
       ON CONFLICT (endpoint) DO UPDATE SET p256dh = $2, auth = $3`,
      [sub.endpoint, sub.keys.p256dh, sub.keys.auth]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error('Subscribe error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/cron/send-reminders', async (req, res) => {
  const secret = req.headers['x-cron-secret'];
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const titles = ['Hey, quick check-in','Your ledger is waiting',"Don't let today slip by",'One small habit, big difference','Travis reminder'];
  const bodies = [
    "Have you recorded today's transactions? Travis needs them to keep your advice accurate — it takes under a minute.",
    "A day without entries means Travis is working with yesterday's numbers. Tap to log what came in and went out today.",
    "Accurate records are what make Travis's advice useful. Take a moment to log today's transactions.",
    "Recording today's transactions keeps your financial picture sharp. It only takes a moment — tap to open Travis.",
    "Today's numbers aren't in yet. The more current your records, the more accurate your advice. Tap to update your ledger."
  ];
  const idx = new Date().getDate() % titles.length;
  const payload = JSON.stringify({ title: titles[idx], body: bodies[idx] });

  let sent = 0, removed = 0, failed = 0;
  try {
    const result = await pool.query('SELECT id, endpoint, p256dh, auth FROM push_subscriptions');
    for (const row of result.rows) {
      const subscription = { endpoint: row.endpoint, keys: { p256dh: row.p256dh, auth: row.auth } };
      try {
        await webpush.sendNotification(subscription, payload);
        sent++;
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await pool.query('DELETE FROM push_subscriptions WHERE id = $1', [row.id]);
          removed++;
        } else {
          failed++;
          console.error('Push send failed:', err.statusCode, err.message);
        }
      }
    }
    res.json({ ok: true, sent, removed, failed, total: result.rows.length });
  } catch (e) {
    console.error('Cron send error:', e);
    res.status(500).json({ error: 'Cron send failed' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'travis-api', time: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Exported for the future payment callback route (PesaFlux / Daraja).
module.exports = { grantActivation, deriveActivationCode };
