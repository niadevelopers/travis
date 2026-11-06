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

app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: false }));
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

const trialLimiter = rateLimit({ windowMs: 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const payLimiter = rateLimit({ windowMs: 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const callbackLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false });

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const recoveryLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
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
  console.error(' FATAL: DEVICE_SIGNING_SECRET missing or too short (need >=32 chars).');
  console.error(' Generate one:  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
  process.exit(1);
}

const DEVICE_TOKEN_TTL_DAYS = 365; // how long a device stays registered

// ====================== Activation mode (scaling provision) ======================
// 'free' : every registered device is active immediately (CURRENT BEHAVIOUR).
// 'paid' : new devices start as 'pending' and get no activation code until
//          grantActivation() is called (from the PesaFlux/Daraja callback, ResultCode 0).
const ACTIVATION_MODE = (process.env.ACTIVATION_MODE || 'free').toLowerCase() === 'paid' ? 'paid' : 'free';
console.log(` Activation mode: ${ACTIVATION_MODE}`);

// ====================== WhatsApp ownership check (free, inbound-only) ======================
// The user sends a short code TO our WhatsApp business number; Meta's webhook tells us which
// number it came from. We never send a WhatsApp message, so there is nothing to pay for.
//   WHATSAPP_BUSINESS_NUMBER  digits only, e.g. 254140438390
//   WHATSAPP_VERIFY_TOKEN     any string you choose; paste the same one into Meta's webhook setup
//   WHATSAPP_APP_SECRET       the app secret from your Meta app (used to check webhook signatures)
const WA_NUMBER = (process.env.WHATSAPP_BUSINESS_NUMBER || '').replace(/\D/g, '');
const WA_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || '';
const WA_APP_SECRET = process.env.WHATSAPP_APP_SECRET || '';
// How long a verification request stays valid. A person approving by hand needs longer than
// an automatic check, so the default is 60 min in manual mode and 10 min when automatic.
const RECOVERY_TTL_MIN = parseInt(process.env.RECOVERY_TTL_MINUTES, 10) || (WA_APP_SECRET ? 10 : 60);
console.log(` WhatsApp verification: ${!WA_NUMBER ? 'NOT configured (set WHATSAPP_BUSINESS_NUMBER)' : WA_APP_SECRET ? 'automatic (webhook)' : 'manual approval only (no WHATSAPP_APP_SECRET)'}`);

// ====================== Premium: pricing, trial, payments (PesaFlux) ======================
// PESAFLUX_API_KEY and PESAFLUX_EMAIL are read from the environment under exactly these names.
const PRICE_PERSONAL = parseInt(process.env.PRICE_PERSONAL_KES, 10) || 250;     // KES
const PRICE_BUSINESS = parseInt(process.env.PRICE_BUSINESS_KES, 10) || 500;     // KES
const PREMIUM_PERIOD_DAYS = parseInt(process.env.PREMIUM_PERIOD_DAYS, 10) || 30; // how long one payment lasts
const TRIAL_MINUTES = parseFloat(process.env.TRIAL_MINUTES) || 30;                // free mode length. TESTING = 2. PRODUCTION: change 2 to 30 (or set the TRIAL_MINUTES env var)
const TRIAL_MAX_PER_IP_PER_DAY = parseInt(process.env.TRIAL_MAX_PER_IP_PER_DAY, 10) || 20;
const PESAFLUX_BASE_URL = (process.env.PESAFLUX_BASE_URL || 'https://api.pesaflux.co.ke').replace(/\/+$/, '');
const PAYMENT_PENDING_MAX_MS = 10 * 60 * 1000;   // an unanswered M-Pesa prompt is treated as expired after this
console.log(`  Premium: personal KES ${PRICE_PERSONAL}, business KES ${PRICE_BUSINESS}, ${PREMIUM_PERIOD_DAYS} days per payment, trial ${TRIAL_MINUTES} min, PesaFlux ${process.env.PESAFLUX_API_KEY && process.env.PESAFLUX_EMAIL ? 'configured' : 'NOT configured (set PESAFLUX_API_KEY and PESAFLUX_EMAIL)'}`);

// ====================== Supabase Postgres Connection Pool ======================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000
});

pool.query('SELECT NOW()')
  .then(() => console.log(' Supabase Postgres connected successfully'))
  .catch(err => console.error(' Supabase connection error:', err.message));

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

    // Pending / completed WhatsApp ownership checks
    await pool.query(`
      CREATE TABLE IF NOT EXISTS phone_challenges (
        id           TEXT PRIMARY KEY,
        code         TEXT NOT NULL,
        phone        TEXT NOT NULL,
        created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at   TIMESTAMPTZ NOT NULL,
        verified_at  TIMESTAMPTZ,
        consumed_at  TIMESTAMPTZ,
        ip           TEXT
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_phone_challenges_code ON phone_challenges(code)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_phone_challenges_phone ON phone_challenges(phone, created_at DESC)`);

    // Premium. Keyed by PHONE (not device) so reinstalling or re-registering never resets a trial
    // and a payment follows the account.
    await pool.query(`
      CREATE TABLE IF NOT EXISTS entitlements (
        phone               TEXT PRIMARY KEY,
        trial_started_at    TIMESTAMPTZ,
        trial_expires_at    TIMESTAMPTZ,
        paid_at             TIMESTAMPTZ,
        paid_until          TIMESTAMPTZ,
        plan                TEXT,
        subscription_status TEXT NOT NULL DEFAULT 'none',
        trial_device_id     CHAR(32),
        trial_ip            TEXT,
        updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_entitlements_trial_ip ON entitlements(trial_ip, trial_started_at)`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_payments (
        id              TEXT PRIMARY KEY,
        phone           TEXT NOT NULL,
        device_id       CHAR(32),
        plan            TEXT NOT NULL,
        kind            TEXT NOT NULL,
        amount          INTEGER NOT NULL,
        msisdn          TEXT NOT NULL,
        status          TEXT NOT NULL DEFAULT 'pending',
        request_id      TEXT,
        receipt         TEXT UNIQUE,
        failure_reason  TEXT,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        paid_at         TIMESTAMPTZ,
        applied_at      TIMESTAMPTZ,
        last_checked_at TIMESTAMPTZ,
        ip              TEXT
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_trv_payments_phone ON trv_payments(phone, created_at DESC)`);

    console.log('tables ready (push_subscriptions, fingerprints, devices, device_events, phone_challenges, entitlements, trv_payments)');
  } catch (err) {
    console.error(' table bootstrap error:', err.message);
  }

  // One live device per phone, enforced by the database (closes the register race).
  // Separate try so a pre-existing duplicate can't break the rest of the bootstrap.
  try {
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_device_phone
      ON devices(phone) WHERE revoked_at IS NULL
    `);
  } catch (err) {
    console.error(' could not create uniq_active_device_phone (duplicate live devices for one phone exist?):', err.message);
  }
})();


// Audit rows older than 30 days are deleted daily so the table can't grow without bound.
async function pruneDeviceEvents() {
  try {
    await pool.query(`DELETE FROM device_events WHERE created_at < NOW() - INTERVAL '30 days'`);
    await pool.query(`DELETE FROM phone_challenges WHERE created_at < NOW() - INTERVAL '1 day'`);
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

// Keep the SAME device_id for a phone but issue a fresh token (old token stops working).
// Used when ownership is proven (backup fingerprint, or WhatsApp check).
async function rotateDeviceToken(deviceId, phoneKey, ip, ua) {
  const jti = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + DEVICE_TOKEN_TTL_DAYS * 86400 * 1000);
  const upd = await pool.query(
    `UPDATE devices
        SET token_jti = $2, expires_at = $3, last_seen_at = NOW(), last_ip = $4, last_ua = $5
      WHERE device_id = $1 AND phone = $6 AND revoked_at IS NULL
      RETURNING activation_status`,
    [deviceId, jti, expiresAt, ip, ua, phoneKey]
  );
  if (!upd.rows[0]) return null;
  const token = jwt.sign(
    { sub: deviceId, phone: phoneKey, jti, type: 'device' },
    DEVICE_SIGNING_SECRET,
    { expiresIn: `${DEVICE_TOKEN_TTL_DAYS}d` }
  );
  const status = upd.rows[0].activation_status;
  const body = {
    device_id: deviceId,
    token,
    activation_status: status,
    recovered: true,
    expires_at: expiresAt.toISOString()
  };
  if (status === 'active') body.activationCode = deriveActivationCode(deviceId);
  return body;
}

// ====================== Premium: entitlement logic ======================
const planPrice = (type) => (type === 'business' ? PRICE_BUSINESS : PRICE_PERSONAL);
const cleanType = (t) => (t === 'business' ? 'business' : 'personal');

// The single source of truth for "may this phone use premium right now?". Uses SERVER time only.
function computeEntitlement(row, accountType, now = new Date()) {
  const type = cleanType(accountType);
  const paidUntil = row && row.paid_until ? new Date(row.paid_until) : null;
  const trialEnd = row && row.trial_expires_at ? new Date(row.trial_expires_at) : null;
  const paidActive = !!paidUntil && paidUntil > now;
  const trialActive = !!trialEnd && trialEnd > now;
  const used = !!(row && (row.trial_started_at || row.paid_at));   // has chosen trial or paid before
  const out = {
    state: 'none', plan: null, needs: 'pay', account_type: type, currency: 'KES',
    server_now: now.toISOString(),
    trial_expires_at: trialEnd ? trialEnd.toISOString() : null,
    paid_until: paidUntil ? paidUntil.toISOString() : null,
    remaining_ms: 0,
    trial_minutes: TRIAL_MINUTES, period_days: PREMIUM_PERIOD_DAYS,
    price: { amount: planPrice(type), kind: 'full', credit: 0 }
  };
  if (paidActive) {
    out.state = 'paid';
    out.plan = row.plan;
    out.remaining_ms = paidUntil - now;
    if (row.plan === 'business' || type === 'personal') {
      out.needs = 'ok';
      out.price = null;
    } else {
      // Paid for Personal, now running as Business: charge only the difference for the SAME period.
      out.needs = 'upgrade';
      out.price = { amount: Math.max(0, PRICE_BUSINESS - PRICE_PERSONAL), kind: 'upgrade', credit: PRICE_PERSONAL };
    }
  } else if (trialActive) {
    out.state = 'trial';
    out.needs = 'ok';
    out.remaining_ms = trialEnd - now;
  } else if (used) {
    out.state = 'expired';
  }
  return out;
}

const STATUS_FOR_STATE = { none: 'none', trial: 'trialing', paid: 'active', expired: 'expired' };

async function loadEntitlement(phone) {
  const r = await pool.query(`SELECT * FROM entitlements WHERE phone = $1`, [phone]);
  return r.rows[0] || null;
}

// Cheap tidy-up so the stored subscription_status follows the real state (reporting only; never trusted).
function syncStoredStatus(row, state) {
  if (row && row.subscription_status !== STATUS_FOR_STATE[state]) {
    pool.query(`UPDATE entitlements SET subscription_status = $2 WHERE phone = $1`, [row.phone, STATUS_FOR_STATE[state]]).catch(() => {});
  }
}

const maskPhone = (p) => (p && p.length >= 12 ? '0' + p.slice(3, 6) + ' ••• ' + p.slice(-3) : '');

async function loadPayment(id) {
  const r = await pool.query(`SELECT * FROM trv_payments WHERE id = $1`, [id]);
  return r.rows[0] || null;
}

async function markPayment(id, status, reason) {
  await pool.query(
    `UPDATE trv_payments SET status = $2, failure_reason = $3, updated_at = NOW() WHERE id = $1 AND status <> 'paid'`,
    [id, status, reason || null]
  );
}

async function pesafluxCall(path, body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(PESAFLUX_BASE_URL + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: process.env.PESAFLUX_API_KEY, email: process.env.PESAFLUX_EMAIL, ...body }),
      signal: ctrl.signal
    });
    let json = null;
    try { json = await res.json(); } catch (e) { /* non-JSON body */ }
    return { status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
}

// Grant access for a verified payment. One transaction, safe to run twice: the UPDATE ... WHERE
// status <> 'paid' lets exactly one caller through, so a replayed callback can never extend access twice.
async function settlePayment(p, receipt) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const now = new Date();
    const upd = await client.query(
      `UPDATE trv_payments SET status = 'paid', paid_at = $2, applied_at = $2, updated_at = $2, receipt = $3, failure_reason = NULL
        WHERE id = $1 AND status <> 'paid' RETURNING *`,
      [p.id, now, receipt]
    );
    if (!upd.rows[0]) { await client.query('ROLLBACK'); return await loadPayment(p.id); }
    const row = upd.rows[0];

    // Affiliate activation is a separate product. It must never create premium access.
    if (row.kind === 'affiliate_signup') {
      await activateAffiliateForPayment(client, row);
    } else {
      const until = new Date(now.getTime() + PREMIUM_PERIOD_DAYS * 86400 * 1000);
      if (row.kind === 'upgrade') {
        const u = await client.query(
          `UPDATE entitlements
              SET plan = 'business', paid_at = $2, subscription_status = 'active', updated_at = $2,
                  paid_until = CASE WHEN paid_until > $2 THEN paid_until ELSE $3 END
            WHERE phone = $1`,
          [row.phone, now, until]
        );
        if (u.rowCount === 0) {
          await client.query(
            `INSERT INTO entitlements (phone, plan, paid_at, paid_until, subscription_status, updated_at)
             VALUES ($1, 'business', $2, $3, 'active', $2)`,
            [row.phone, now, until]
          );
        }
      } else {
        await client.query(
          `INSERT INTO entitlements (phone, plan, paid_at, paid_until, subscription_status, updated_at)
           VALUES ($1, $2, $3, $4, 'active', $3)
           ON CONFLICT (phone) DO UPDATE SET
             plan = EXCLUDED.plan, paid_at = EXCLUDED.paid_at, subscription_status = 'active', updated_at = EXCLUDED.updated_at,
             paid_until = CASE WHEN entitlements.paid_until > EXCLUDED.paid_at THEN entitlements.paid_until ELSE EXCLUDED.paid_until END`,
          [row.phone, row.plan, now, until]
        );
      }
      // The ledger is updated in the same transaction and is idempotent by payment_id.
      await affiliateOnVerifiedPayment(client, row);
    }
    await client.query('COMMIT');
    return row;
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    if (e.code === '23505') {   // this M-Pesa receipt was already used for another payment
      console.error('payment receipt reused:', p.id);
      await markPayment(p.id, 'failed', 'receipt_reused');
      return await loadPayment(p.id);
    }
    throw e;
  } finally {
    client.release();
  }
}

// Ask PesaFlux (server to server, with our API key) what really happened. Callbacks are NOT
// signed, so nothing in a callback is ever trusted: it only tells us to go and check.
// Fail-closed: access is granted only on a clearly completed payment of at least the right amount.
async function reconcilePayment(p, force = false) {
  if (!p || p.status === 'paid' || !p.request_id) return p;
  const ageMs = Date.now() - new Date(p.created_at).getTime();
  if (ageMs > 24 * 3600 * 1000) return p;
  if (!force && p.last_checked_at && Date.now() - new Date(p.last_checked_at).getTime() < 4000) return p;
  await pool.query(`UPDATE trv_payments SET last_checked_at = NOW() WHERE id = $1`, [p.id]);

  let r;
  try {
    r = await pesafluxCall('/v1/transactionstatus', { transaction_request_id: p.request_id });
  } catch (e) {
    console.error('pesaflux status error:', e.message);
    return p;
  }
  const j = (r && r.json) || {};
  const st = String(j.TransactionStatus || '').trim().toLowerCase();

  // Safe diagnostic logging: never log API keys, passwords, or full phone numbers.
  console.log('PesaFlux payment status:', {
    payment_id: p.id,
    kind: p.kind,
    request_id: p.request_id,
    provider_http_status: r && r.status,
    provider_status: j.TransactionStatus || null,
    provider_code: j.ResultCode || j.ResponseCode || j.response_code || null,
    provider_message: j.ResponseDescription || j.ResponseMessage || j.message || null
  });

  if (/^(completed?|success(ful)?)$/.test(st)) {
    const amount = Number(j.TransactionAmount);
    if (!(amount >= p.amount)) {
      console.error('payment amount mismatch:', p.id, 'expected', p.amount, 'got', j.TransactionAmount);
      await markPayment(p.id, 'failed', 'amount_mismatch');
      return await loadPayment(p.id);
    }
    const receipt = String(j.TransactionReceipt || j.TransactionID || p.request_id).trim();
    return (await settlePayment(p, receipt)) || p;
  }
  if (/fail|cancel|reject|timeout|expire|insufficient|declin/.test(st)) {
    await markPayment(p.id, 'failed', st.slice(0, 60));
    return await loadPayment(p.id);
  }
  if (p.status === 'pending' && ageMs > PAYMENT_PENDING_MAX_MS) {
    await markPayment(p.id, 'expired', 'no_response');   // can still be settled later if the money did arrive
    return await loadPayment(p.id);
  }
  return p;
}

// Latest unsettled payment for a phone (checked against PesaFlux, so a delayed callback never matters).
async function refreshPendingPayment(phone) {
  const r = await pool.query(
    `SELECT * FROM trv_payments WHERE phone = $1 AND status IN ('pending','expired') AND created_at > $2
      ORDER BY created_at DESC LIMIT 1`,
    [phone, new Date(Date.now() - 24 * 3600 * 1000)]
  );
  return r.rows[0] ? await reconcilePayment(r.rows[0]) : null;
}

// ---- Guards ----
// deviceAuth: who is calling? The app sends its device id + server-signed token as headers
// (added in one place by the frontend's fetch wrapper). Same checks as /verify-device.
async function deviceAuth(req, res, next) {
  const fp = String(req.headers['x-trv-fp'] || '');
  const token = String(req.headers['x-trv-token'] || '');
  const fail = (reason) => res.status(401).json({ code: 'DEVICE_UNVERIFIED', reason });
  try {
    if (!DEVICE_ID_RE.test(fp) || !token) return fail('missing');
    let decoded;
    try { decoded = jwt.verify(token, DEVICE_SIGNING_SECRET); } catch (e) { return fail('bad_token'); }
    if (decoded.type !== 'device' || decoded.sub !== fp || !decoded.jti) return fail('bad_token');
    const r = await pool.query(
      `SELECT device_id, phone, token_jti, revoked_at, expires_at FROM devices WHERE device_id = $1`, [fp]);
    const dev = r.rows[0];
    if (!dev || dev.revoked_at || dev.token_jti !== decoded.jti || new Date(dev.expires_at) < new Date()) return fail('not_live');
    req.device = { device_id: String(dev.device_id), phone: dev.phone };
    return next();
  } catch (e) {
    console.error('deviceAuth error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}

// requireEntitlement: put AFTER deviceAuth on any privileged route.
//   app.post('/something', deviceAuth, requireEntitlement, handler)
// Rejects with HTTP 402 and code PAYWALL_REQUIRED unless the phone is in a live trial or paid period.
async function requireEntitlement(req, res, next) {
  try {
    const row = await loadEntitlement(req.device.phone);
    const ent = computeEntitlement(row, null);
    if (ent.state === 'trial' || ent.state === 'paid') { req.entitlement = ent; return next(); }
    return res.status(402).json({
      code: 'PAYWALL_REQUIRED', state: ent.state, needs: ent.needs,
      error: ent.state === 'none' ? 'Choose Pay Now or Free Mode to continue.' : 'Your free time has ended. Payment is required to continue.'
    });
  } catch (e) {
    console.error('requireEntitlement error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
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

// ====================== Affiliate functions and routes ======================
const AFFILIATE_SIGNUP_FEE = 50;
const AFFILIATE_COMMISSION = Object.freeze({ personal: 49, business: 80 });
const AFFILIATE_CODE_RE = /^[A-Z0-9]{8}$/;
const AFFILIATE_PAYMENT_RE = /^TRVAF[A-F0-9]{10}$/;

function affiliateCode() {
  return crypto.randomBytes(5).toString('hex').toUpperCase().slice(0, 8);
}

function kenyaDate(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Nairobi', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(d);
}

function nextFridayOnOrAfter(date) {
  const d = new Date(date);
  const day = d.getUTCDay(); // Sunday = 0; Friday = 5
  d.setUTCDate(d.getUTCDate() + ((5 - day + 7) % 7));
  return d.toISOString().slice(0, 10);
}

async function bootstrapAffiliateTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS affiliates (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT UNIQUE,
      phone TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending',
      activation_payment_id TEXT UNIQUE,
      activation_receipt TEXT UNIQUE,
      mpesa_msisdn TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      activated_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CHECK (status IN ('pending','active','suspended'))
    )
  `);
  // Migrate installations that previously created this column as BIGINT.
  await pool.query(`ALTER TABLE affiliates ALTER COLUMN user_id TYPE TEXT USING user_id::text`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS affiliate_referrals (
      phone TEXT PRIMARY KEY,
      affiliate_id BIGINT NOT NULL,
      affiliate_code TEXT NOT NULL,
      device_id CHAR(32),
      captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_affiliate ON affiliate_referrals(affiliate_id)`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS affiliate_commissions (
      id BIGSERIAL PRIMARY KEY,
      affiliate_id BIGINT NOT NULL,
      payment_id TEXT NOT NULL UNIQUE,
      referred_phone TEXT NOT NULL,
      plan TEXT NOT NULL,
      customer_amount INTEGER NOT NULL,
      commission_amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'accrued',
      payable_on DATE NOT NULL,
      payout_batch_id BIGINT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      paid_at TIMESTAMPTZ,
      CHECK (status IN ('accrued','payable','paid','void'))
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_affiliate_commissions_affiliate ON affiliate_commissions(affiliate_id, created_at DESC)`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS affiliate_payout_batches (
      id BIGSERIAL PRIMARY KEY,
      week_ending DATE NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'open',
      total_amount INTEGER NOT NULL DEFAULT 0,
      marked_by TEXT,
      marked_at TIMESTAMPTZ,
      notes TEXT,
      CHECK (status IN ('open','paid','cancelled'))
    )
  `);
}

async function uniqueAffiliateCode(clientOrPool) {
  for (let i = 0; i < 8; i++) {
    const code = affiliateCode();
    const r = await clientOrPool.query('SELECT 1 FROM affiliates WHERE code = $1', [code]);
    if (!r.rows[0]) return code;
  }
  throw new Error('Could not allocate affiliate code');
}

async function captureAffiliateReferral(phone, rawCode, deviceId) {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!AFFILIATE_CODE_RE.test(code)) return { captured: false, reason: 'invalid_code' };
  const r = await pool.query('SELECT id, phone, status FROM affiliates WHERE code = $1', [code]);
  const a = r.rows[0];
  if (!a || a.status !== 'active' || a.phone === phone) return { captured: false, reason: 'unknown_or_ineligible_code' };
  await pool.query(`
    INSERT INTO affiliate_referrals (phone, affiliate_id, affiliate_code, device_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (phone) DO NOTHING
  `, [phone, a.id, code, deviceId || null]);
  return { captured: true, code };
}

async function affiliateOnVerifiedPayment(client, paymentRow) {
  if (!paymentRow || paymentRow.kind === 'affiliate_signup') return;
  if (!['personal', 'business'].includes(String(paymentRow.plan))) return;
  const commission = AFFILIATE_COMMISSION[paymentRow.plan];
  if (!commission) return;
  const ref = await client.query(`
    SELECT ar.affiliate_id, ar.affiliate_code
    FROM affiliate_referrals ar
    JOIN affiliates a ON a.id = ar.affiliate_id AND a.status = 'active'
    WHERE ar.phone = $1
  `, [paymentRow.phone]);
  if (!ref.rows[0]) return;
  const payableOn = nextFridayOnOrAfter(paymentRow.paid_at || new Date());
  await client.query(`
    INSERT INTO affiliate_commissions
      (affiliate_id, payment_id, referred_phone, plan, customer_amount, commission_amount, payable_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (payment_id) DO NOTHING
  `, [ref.rows[0].affiliate_id, paymentRow.id, paymentRow.phone, paymentRow.plan,
      paymentRow.amount, commission, payableOn]);
}

async function activateAffiliateForPayment(client, paymentRow) {
  const a = await client.query(`
    UPDATE affiliates
    SET status = 'active', activation_receipt = $2, activated_at = COALESCE(activated_at, NOW()), updated_at = NOW()
    WHERE activation_payment_id = $1 AND status = 'pending'
    RETURNING id, code, phone
  `, [paymentRow.id, paymentRow.receipt]);
  return a.rows[0] || null;
}

/* Patch the existing settlePayment():
 *
 * After `const row = upd.rows[0];` add:
 *   if (row.kind === 'affiliate_signup') {
 *     await activateAffiliateForPayment(client, row);
 *   } else {
 *     await affiliateOnVerifiedPayment(client, row);
 *   }
 *
 * Then wrap the existing entitlement block in `if (row.kind !== 'affiliate_signup') { ... }`.
 * This prevents the KES 50 affiliate payment from creating a premium entitlement.
 * Call affiliateOnVerifiedPayment only after the payment UPDATE succeeded; its unique
 * payment_id constraint makes callbacks and status retries idempotent.
 */


bootstrapAffiliateTables().catch(e => console.error('affiliate bootstrap error:', e.message));

app.post('/affiliate/activate', authLimiter, auth, async (req, res) => {
  try {
    const phone = sanitizePhone(req.user.phone);
    const msisdnRaw = sanitizePhone(req.body && req.body.msisdn) || phone;
    if (!isValidKenyanPhone(msisdnRaw)) return res.status(400).json({ error: 'Enter a valid Kenyan M-Pesa number.' });
    const msisdn = normalizeKenyanPhone(msisdnRaw);
    const existing = await pool.query('SELECT * FROM affiliates WHERE phone = $1', [phone]);
    if (existing.rows[0] && existing.rows[0].status === 'active') return res.status(409).json({ code: 'ALREADY_AFFILIATE', affiliate: existing.rows[0] });
    if (existing.rows[0] && existing.rows[0].activation_payment_id) {
      return res.json({ payment_id: existing.rows[0].activation_payment_id, status: 'pending' });
    }
    const user = await pool.query('SELECT id FROM users WHERE phone = $1', [phone]);
    if (!user.rows[0]) return res.status(401).json({ error: 'Account not found.' });
    const id = 'TRVAF' + crypto.randomBytes(5).toString('hex').toUpperCase();
    const code = await uniqueAffiliateCode(pool);
    await pool.query(`
      INSERT INTO affiliates (user_id, phone, code, status, activation_payment_id, mpesa_msisdn)
      VALUES ($1, $2, $3, 'pending', $4, $5)
      ON CONFLICT (phone) DO UPDATE SET activation_payment_id = EXCLUDED.activation_payment_id,
        mpesa_msisdn = EXCLUDED.mpesa_msisdn, updated_at = NOW()
    `, [String(user.rows[0].id), phone, code, id, msisdn]);
    await pool.query(`
      INSERT INTO trv_payments (id, phone, plan, kind, amount, msisdn, ip)
      VALUES ($1, $2, 'affiliate', 'affiliate_signup', $3, $4, $5)
    `, [id, phone, AFFILIATE_SIGNUP_FEE, msisdn, req.ip]);
    let r;
    try { r = await pesafluxCall('/v1/initiatestk', { amount: AFFILIATE_SIGNUP_FEE, msisdn, reference: id }); }
    catch (_) { await pool.query(`UPDATE trv_payments SET status='failed', failure_reason='provider_unreachable' WHERE id=$1`, [id]); return res.status(502).json({ error: 'Could not reach M-Pesa.' }); }
    const j = (r && r.json) || {};
    if (String(j.success) !== '200' || !j.transaction_request_id) {
      await pool.query(`UPDATE trv_payments SET status='failed', failure_reason='provider_rejected' WHERE id=$1`, [id]);
      return res.status(502).json({ error: 'Could not start the KES 50 M-Pesa prompt.' });
    }
    await pool.query(`UPDATE trv_payments SET request_id=$2, updated_at=NOW() WHERE id=$1`, [id, String(j.transaction_request_id)]);
    return res.json({ payment_id: id, status: 'pending', amount: AFFILIATE_SIGNUP_FEE });
  } catch (e) { console.error('affiliate/activate error:', e); return res.status(500).json({ error: 'Server error' }); }
});

app.post('/affiliate/activate/status', verifyLimiter, auth, async (req, res) => {
  try {
    const p = await loadPayment(String(req.body && req.body.payment_id || ''));
    if (!p || p.phone !== sanitizePhone(req.user.phone) || p.kind !== 'affiliate_signup') return res.status(404).json({ status: 'unknown' });
    const checked = await reconcilePayment(p);
    const a = await pool.query('SELECT code, status, activated_at FROM affiliates WHERE phone = $1', [p.phone]);
    return res.json({ status: checked.status, affiliate: a.rows[0] || null, failure_reason: checked.failure_reason || null });
  } catch (e) { console.error('affiliate/activate/status error:', e); return res.status(500).json({ error: 'Server error' }); }
});

app.get('/affiliate/me', verifyLimiter, auth, async (req, res) => {
  try {
    const phone = sanitizePhone(req.user.phone);
    await pool.query(`UPDATE affiliate_commissions SET status='payable' WHERE status='accrued' AND payable_on <= CURRENT_DATE`);
    const a = await pool.query(`SELECT id, phone, code, status, created_at, activated_at FROM affiliates WHERE phone=$1`, [phone]);
    if (!a.rows[0]) return res.status(404).json({ code: 'NOT_AFFILIATE' });
    const summary = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status IN ('accrued','payable'))::int AS successful_payments,
        COALESCE(SUM(commission_amount) FILTER (WHERE status IN ('accrued','payable')),0)::int AS accrued_amount,
        COALESCE(SUM(commission_amount) FILTER (WHERE status='payable'),0)::int AS payable_amount,
        COALESCE(SUM(commission_amount) FILTER (WHERE status='paid'),0)::int AS paid_amount
      FROM affiliate_commissions WHERE affiliate_id=$1
    `, [a.rows[0].id]);
    const rows = await pool.query(`
      SELECT payment_id, plan, customer_amount, commission_amount, status, payable_on, created_at, paid_at
      FROM affiliate_commissions WHERE affiliate_id=$1 ORDER BY created_at DESC LIMIT 100
    `, [a.rows[0].id]);
    return res.json({ affiliate: a.rows[0], summary: summary.rows[0], commissions: rows.rows,
      share_url: `${String(process.env.APP_URL || '').replace(/\/$/, '') || `${req.protocol}://${req.get('host')}`}/?ref=${encodeURIComponent(a.rows[0].code)}` });
  } catch (e) { console.error('affiliate/me error:', e); return res.status(500).json({ error: 'Server error' }); }
});

// Manual Friday payout workflow. Protect these with the same admin secret used by existing admin routes.
function affiliateAdmin(req, res, next) {
  const supplied = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (!process.env.ADMIN_KEY || supplied !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
app.post('/affiliate/admin/payout-batches/prepare', affiliateAdmin, async (req, res) => {
  const weekEnding = String(req.body && req.body.week_ending || nextFridayOnOrAfter(new Date()));
  await pool.query(`UPDATE affiliate_commissions SET status='payable' WHERE status='accrued' AND payable_on <= $1`, [weekEnding]);
  const r = await pool.query(`
    INSERT INTO affiliate_payout_batches (week_ending, total_amount)
    SELECT $1, COALESCE(SUM(commission_amount),0) FROM affiliate_commissions WHERE status='payable'
    ON CONFLICT (week_ending) DO UPDATE SET total_amount=EXCLUDED.total_amount
    RETURNING *
  `, [weekEnding]);
  res.json(r.rows[0]);
});
app.post('/affiliate/admin/payout-batches/:id/mark-paid', affiliateAdmin, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const b = await client.query(`UPDATE affiliate_payout_batches SET status='paid', marked_by=$2, marked_at=NOW(), notes=$3 WHERE id=$1 AND status='open' RETURNING *`, [req.params.id, String(req.headers['x-admin-user'] || 'admin'), String(req.body && req.body.notes || '')]);
    if (!b.rows[0]) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Open payout batch not found.' }); }
    await client.query(`UPDATE affiliate_commissions SET status='paid', payout_batch_id=$1, paid_at=NOW() WHERE status='payable' AND payable_on <= $2`, [b.rows[0].id, b.rows[0].week_ending]);
    await client.query('COMMIT');
    res.json(b.rows[0]);
  } catch (e) { await client.query('ROLLBACK'); res.status(500).json({ error: 'Server error' }); } finally { client.release(); }
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
    // A backup carries the device_id it was issued. If that device is still live and belongs
    // to a DIFFERENT phone, refuse straight away: a backup can only be restored under the
    // number it was registered with (this also stops one backup being used to mint devices
    // for other people's numbers). Nothing about the real number is revealed.
    const claimedFp = typeof req.body.fp === 'string' ? req.body.fp.trim().toUpperCase() : '';
    if (DEVICE_ID_RE.test(claimedFp)) {
      const own = await pool.query(
        `SELECT phone FROM devices WHERE device_id = $1 AND revoked_at IS NULL AND expires_at > NOW()`,
        [claimedFp]
      );
      if (own.rows[0] && own.rows[0].phone !== phoneKey) {
        await pool.query(
          `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
           VALUES ($1, $2, 'register', FALSE, 'phone_mismatch', $3, $4)`,
          [claimedFp, phoneKey, ip, ua]
        ).catch(() => {});
        return res.status(409).json({
          code: 'phone_mismatch',
          error: 'This backup belongs to a different phone number. Enter the number you originally registered with.'
        });
      }
    }

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
      // ---- Recovery: same phone + the device_id this phone was issued ----------------
      // The device_id is a 128-bit random secret that only this install (and its backup)
      // holds, so presenting it proves ownership. We then keep the SAME device_id (so the
      // activation code and restored data still match) and issue a fresh token, which
      // supersedes any older copy of the token. A phone number alone is NOT enough.
      const claimed = typeof req.body.fp === 'string' ? req.body.fp.trim().toUpperCase() : '';
      const stored = String(existing.rows[0].device_id);
      const proofOk = DEVICE_ID_RE.test(claimed) && claimed.length === stored.length &&
        crypto.timingSafeEqual(Buffer.from(claimed), Buffer.from(stored));

      if (proofOk) {
        const rec = await rotateDeviceToken(stored, phoneKey, ip, ua);
        if (rec) {
          await pool.query(
            `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
             VALUES ($1, $2, 'recover', TRUE, 'backup_fp', $3, $4)`,
            [stored, phoneKey, ip, ua]
          ).catch(() => {});
          return res.json(rec);
        }
        // The device was revoked between the two queries: fall through to the refusal below.
      }

      await pool.query(
        `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
         VALUES ($1, $2, 'register', FALSE, $3, $4, $5)`,
        [stored, phoneKey, proofOk ? 'recover_raced' : 'phone_already_linked', ip, ua]
      ).catch(() => {});
      return res.status(409).json({
        code: 'phone_registered',
        error: 'This phone number is already registered. Verify it on WhatsApp to restore your device.'
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
          code: 'phone_registered',
          error: 'This phone number is already registered. Verify it on WhatsApp to restore your device.'
        });
      }
      throw insErr;
    }

    // Capture an optional referral only on first registration. The helper never overwrites
    // an existing phone attribution, so recovery/reinstall cannot change the owner.
    try {
      await captureAffiliateReferral(phoneKey, req.body && req.body.referral_code, deviceId);
    } catch (affiliateErr) {
      console.error('affiliate referral capture failed (non-fatal):', affiliateErr.message);
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

// ====================== Premium routes ======================

// Where does this phone stand? Called by the app after boot, on resume, and when a trial ends.
app.post('/entitlement', verifyLimiter, deviceAuth, async (req, res) => {
  try {
    const phone = req.device.phone;
    let pending = await refreshPendingPayment(phone);
    const row = await loadEntitlement(phone);
    const ent = computeEntitlement(row, req.body && req.body.account_type);
    syncStoredStatus(row, ent.state);
    ent.phone_masked = maskPhone(phone);
    ent.pending_payment = pending && pending.status === 'pending' ? { id: pending.id, amount: pending.amount, kind: pending.kind } : null;
    return res.json(ent);
  } catch (e) {
    console.error('entitlement error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the one free trial for this phone. Idempotent: calling again (reinstall, cleared storage,
// a different phone model) returns the SAME trial; it can never be restarted or extended.
app.post('/trial/start', trialLimiter, deviceAuth, async (req, res) => {
  try {
    const phone = req.device.phone;
    const existing = await loadEntitlement(phone);
    if (!existing) {
      const since = new Date(Date.now() - 24 * 3600 * 1000);
      const c = await pool.query(
        `SELECT COUNT(*)::int AS n FROM entitlements WHERE trial_ip = $1 AND trial_started_at > $2`, [req.ip, since]);
      if (c.rows[0].n >= TRIAL_MAX_PER_IP_PER_DAY) {
        return res.status(429).json({ code: 'TRIAL_LIMIT', error: 'Free mode is not available from this connection right now. You can pay to continue.' });
      }
      const now = new Date();
      const end = new Date(now.getTime() + TRIAL_MINUTES * 60 * 1000);
      await pool.query(
        `INSERT INTO entitlements (phone, trial_started_at, trial_expires_at, subscription_status, trial_device_id, trial_ip, updated_at)
         VALUES ($1, $2, $3, 'trialing', $4, $5, $2)
         ON CONFLICT (phone) DO NOTHING`,
        [phone, now, end, req.device.device_id, req.ip]
      );
      await pool.query(
        `INSERT INTO device_events (device_id, phone, event_type, success, ip, ua) VALUES ($1, $2, 'trial', TRUE, $3, $4)`,
        [req.device.device_id, phone, req.ip, (req.headers['user-agent'] || '').substring(0, 500)]
      ).catch(() => {});
    }
    const row = await loadEntitlement(phone);
    const ent = computeEntitlement(row, req.body && req.body.account_type);
    ent.phone_masked = maskPhone(phone);
    return res.json(ent);
  } catch (e) {
    console.error('trial/start error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Send the M-Pesa prompt (STK push) through PesaFlux. The server decides the price; the app's claim
// is only which account type it is running as.
app.post('/pay/checkout', payLimiter, deviceAuth, async (req, res) => {
  if (!process.env.PESAFLUX_API_KEY || !process.env.PESAFLUX_EMAIL) {
    return res.status(503).json({ code: 'PAYMENTS_NOT_CONFIGURED', error: 'Payments are not available right now. Please contact support.' });
  }
  try {
    const phone = req.device.phone;
    const type = cleanType(req.body && req.body.account_type);
    await refreshPendingPayment(phone);   // a payment that completed a moment ago must count first
    const row = await loadEntitlement(phone);
    const ent = computeEntitlement(row, type);
    if (ent.needs === 'ok' && ent.state === 'paid') {
      return res.status(409).json({ code: 'ALREADY_PAID', error: 'Your plan is already paid.', entitlement: ent });
    }
    const price = ent.price;                                   // 'full' or 'upgrade'
    const msisdnRaw = req.body && req.body.msisdn ? sanitizePhone(req.body.msisdn) : phone;
    if (!isValidKenyanPhone(msisdnRaw)) return res.status(400).json({ error: 'Enter a valid Safaricom M-Pesa number.' });
    const msisdn = normalizeKenyanPhone(msisdnRaw);

    // Don't fire a second prompt while one is still open for the same thing.
    const open = await pool.query(
      `SELECT * FROM trv_payments WHERE phone = $1 AND status = 'pending' AND plan = $2 AND kind = $3 AND amount = $4 AND created_at > $5
        ORDER BY created_at DESC LIMIT 1`,
      [phone, type, price.kind, price.amount, new Date(Date.now() - 3 * 60 * 1000)]
    );
    if (open.rows[0]) {
      return res.json({ payment_id: open.rows[0].id, status: 'pending', amount: price.amount, kind: price.kind, plan: type, reused: true });
    }

    const id = 'TRVPAY' + crypto.randomBytes(5).toString('hex').toUpperCase();
    await pool.query(
      `INSERT INTO trv_payments (id, phone, device_id, plan, kind, amount, msisdn, ip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, phone, req.device.device_id, type, price.kind, price.amount, msisdn, req.ip]
    );
    let r;
    try {
      r = await pesafluxCall('/v1/initiatestk', { amount: price.amount, msisdn, reference: id });
    } catch (e) {
      console.error('pesaflux initiate error:', e.message);
      await markPayment(id, 'failed', 'provider_unreachable');
      return res.status(502).json({ code: 'PAYMENT_PROVIDER_ERROR', error: 'Could not reach M-Pesa. Please try again.' });
    }
    const j = (r && r.json) || {};
    if (String(j.success) !== '200' || !j.transaction_request_id) {
      console.error('pesaflux initiate rejected:', r && r.status, JSON.stringify(j).slice(0, 200));
      await markPayment(id, 'failed', 'provider_rejected');
      return res.status(502).json({ code: 'PAYMENT_PROVIDER_ERROR', error: 'Could not start the M-Pesa prompt. Check the number and try again.' });
    }
    await pool.query(`UPDATE trv_payments SET request_id = $2, updated_at = NOW() WHERE id = $1`, [id, String(j.transaction_request_id)]);
    return res.json({ payment_id: id, status: 'pending', amount: price.amount, kind: price.kind, plan: type });
  } catch (e) {
    console.error('pay/checkout error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// The app asks "did it go through?". Works with or without the callback arriving.
app.post('/pay/status', verifyLimiter, deviceAuth, async (req, res) => {
  try {
    const id = String((req.body && req.body.payment_id) || '');
    let p = await loadPayment(id);
    if (!p || p.phone !== req.device.phone) return res.status(404).json({ status: 'unknown' });
    p = await reconcilePayment(p);
    const row = await loadEntitlement(req.device.phone);
    const ent = computeEntitlement(row, req.body && req.body.account_type);
    ent.phone_masked = maskPhone(req.device.phone);
    return res.json({ status: p.status, failure_reason: p.status === 'failed' ? p.failure_reason : null, entitlement: ent });
  } catch (e) {
    console.error('pay/status error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PesaFlux webhook. Unsigned, so we only use it as a nudge: find OUR payment by the reference we
// sent, then verify with PesaFlux directly. Unknown references are ignored without any outbound call.
app.post('/pay/callback', callbackLimiter, async (req, res) => {
  res.status(200).json({ ok: true });
  try {
    const b = req.body || {};
    const ref = String(b.TransactionReference || b.reference || '').trim();
    if (!/^(TRVPAY|TRVAF)[A-F0-9]{10}$/.test(ref)) return;
    const p = await loadPayment(ref);
    if (p && p.status !== 'paid') await reconcilePayment(p, true);
  } catch (e) {
    console.error('pay/callback error:', e);
  }
});

// ====================== WhatsApp ownership check ======================
// 1) /recovery/start    app asks for a code for a phone that is already registered
// 2) user sends that code to our WhatsApp number (wa.me link prefilled by the app)
// 3) /whatsapp/webhook  Meta tells us the sender; if it matches the phone, the check passes
// 4) /recovery/complete app polls until passed, then receives the SAME device_id + a fresh token
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1
function newVerifyCode() {
  let c = '';
  for (let i = 0; i < 6; i++) c += CODE_ALPHABET[crypto.randomInt(CODE_ALPHABET.length)];
  return 'TRV-' + c;
}

app.post('/recovery/start', recoveryLimiter, async (req, res) => {
  if (!WA_NUMBER) {
    return res.status(503).json({ error: 'WhatsApp verification is not available right now. Please contact support.' });
  }
  const { phone } = req.body || {};
  const cleanPhone = sanitizePhone(phone);
  if (!cleanPhone || !isValidKenyanPhone(cleanPhone)) {
    return res.status(400).json({ error: 'Valid Kenyan phone number required' });
  }
  const phoneKey = normalizeKenyanPhone(cleanPhone);
  try {
    const dev = await pool.query(
      `SELECT device_id FROM devices WHERE phone = $1 AND revoked_at IS NULL AND expires_at > NOW() LIMIT 1`,
      [phoneKey]
    );
    if (!dev.rows[0]) return res.status(404).json({ error: 'no_device' });

    const recent = await pool.query(
      `SELECT COUNT(*)::int AS n FROM phone_challenges WHERE phone = $1 AND created_at > NOW() - INTERVAL '1 hour'`,
      [phoneKey]
    );
    if (recent.rows[0].n >= 5) {
      return res.status(429).json({ error: 'Too many verification attempts for this number. Try again in an hour.' });
    }

    const id = crypto.randomBytes(12).toString('hex');
    const code = newVerifyCode();
    const expiresAt = new Date(Date.now() + RECOVERY_TTL_MIN * 60 * 1000);
    await pool.query(
      `INSERT INTO phone_challenges (id, code, phone, expires_at, ip) VALUES ($1, $2, $3, $4, $5)`,
      [id, code, phoneKey, expiresAt, req.ip]
    );
    const token = jwt.sign({ sub: id, phone: phoneKey, type: 'recovery' }, DEVICE_SIGNING_SECRET, { expiresIn: `${RECOVERY_TTL_MIN + 5}m` });
    const text = `Verify my Travis device: ${code}`;
    return res.json({
      token,
      code,
      wa_link: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      expires_in: RECOVERY_TTL_MIN * 60
    });
  } catch (e) {
    console.error('recovery/start error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/recovery/complete', verifyLimiter, async (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ status: 'invalid' });
  let decoded;
  try {
    decoded = jwt.verify(token, DEVICE_SIGNING_SECRET);
  } catch (e) {
    return res.status(401).json({ status: 'invalid' });
  }
  if (decoded.type !== 'recovery' || !decoded.sub || !decoded.phone) {
    return res.status(401).json({ status: 'invalid' });
  }
  const ip = req.ip;
  const ua = (req.headers['user-agent'] || '').substring(0, 500);
  try {
    const r = await pool.query(
      `SELECT expires_at, verified_at, consumed_at FROM phone_challenges WHERE id = $1 AND phone = $2`,
      [decoded.sub, decoded.phone]
    );
    const ch = r.rows[0];
    if (!ch) return res.status(404).json({ status: 'invalid' });
    if (ch.consumed_at) return res.status(409).json({ status: 'used' });
    if (new Date(ch.expires_at) < new Date()) return res.status(410).json({ status: 'expired' });
    if (!ch.verified_at) return res.status(202).json({ status: 'pending' });

    // Single use: only one caller can consume a verified check.
    const taken = await pool.query(
      `UPDATE phone_challenges SET consumed_at = NOW() WHERE id = $1 AND consumed_at IS NULL RETURNING id`,
      [decoded.sub]
    );
    if (!taken.rows[0]) return res.status(409).json({ status: 'used' });

    const dev = await pool.query(
      `SELECT device_id FROM devices
       WHERE phone = $1 AND revoked_at IS NULL AND expires_at > NOW()
       ORDER BY issued_at DESC LIMIT 1`,
      [decoded.phone]
    );
    if (!dev.rows[0]) return res.status(404).json({ status: 'no_device' });

    const rec = await rotateDeviceToken(String(dev.rows[0].device_id), decoded.phone, ip, ua);
    if (!rec) return res.status(404).json({ status: 'no_device' });

    await pool.query(
      `INSERT INTO device_events (device_id, phone, event_type, success, reason, ip, ua)
       VALUES ($1, $2, 'recover', TRUE, 'whatsapp', $3, $4)`,
      [rec.device_id, decoded.phone, ip, ua]
    ).catch(() => {});
    return res.json({ status: 'verified', ...rec });
  } catch (e) {
    console.error('recovery/complete error:', e);
    return res.status(500).json({ status: 'error' });
  }
});

// Meta webhook handshake (one-time, when you set the webhook up in the Meta dashboard).
app.get('/whatsapp/webhook', (req, res) => {
  if (WA_VERIFY_TOKEN && req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === WA_VERIFY_TOKEN) {
    return res.status(200).send(String(req.query['hub.challenge'] || ''));
  }
  return res.sendStatus(403);
});

// Incoming WhatsApp messages. Every request must carry Meta's HMAC signature; without
// the app secret configured we refuse everything, so nobody can fake a "verified" sender.
app.post('/whatsapp/webhook', async (req, res) => {
  if (!WA_APP_SECRET) return res.sendStatus(503);
  const sig = String(req.headers['x-hub-signature-256'] || '');
  const expected = 'sha256=' + crypto.createHmac('sha256', WA_APP_SECRET).update(req.rawBody || Buffer.alloc(0)).digest('hex');
  const ok = sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return res.sendStatus(401);
  res.sendStatus(200);   // acknowledge fast; Meta retries slow responses

  try {
    const entries = (req.body && req.body.entry) || [];
    for (const entry of entries) {
      for (const change of (entry.changes || [])) {
        for (const msg of ((change.value && change.value.messages) || [])) {
          const body = msg.text && msg.text.body;
          if (!msg.from || !body) continue;
          const m = String(body).toUpperCase().match(/\bTRV-([A-HJ-NP-Z2-9]{6})\b/);
          if (!m) continue;
          const sender = normalizeKenyanPhone(String(msg.from));
          await pool.query(
            `UPDATE phone_challenges SET verified_at = NOW()
              WHERE code = $1 AND phone = $2 AND verified_at IS NULL AND consumed_at IS NULL AND expires_at > NOW()`,
            ['TRV-' + m[1], sender]
          );
        }
      }
    }
  } catch (e) {
    console.error('whatsapp webhook error:', e);
  }
});

// Manual approval (works with the normal WhatsApp Business app, no Meta developer account):
// the user sends the prefilled message to your WhatsApp number; you see their number on the
// message, then approve with the code AND the number you saw. Both must match the request.
app.post('/recovery/approve', adminLimiter, async (req, res) => {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const code = String((req.body && req.body.code) || '').toUpperCase().trim();
  const phoneKey = normalizeKenyanPhone(sanitizePhone(req.body && req.body.phone));
  if (!/^TRV-[A-HJ-NP-Z2-9]{6}$/.test(code) || !/^254[17]\d{8}$/.test(phoneKey)) {
    return res.status(400).json({ error: 'code (TRV-XXXXXX) and the sender phone number are required' });
  }
  try {
    const r = await pool.query(
      `UPDATE phone_challenges SET verified_at = NOW()
        WHERE code = $1 AND phone = $2 AND verified_at IS NULL AND consumed_at IS NULL AND expires_at > NOW()
        RETURNING id`,
      [code, phoneKey]
    );
    if (!r.rows[0]) return res.status(404).json({ error: 'No pending request matches that code and number (expired, wrong code, or wrong number).' });
    return res.json({ ok: true });
  } catch (e) {
    console.error('recovery/approve error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

const ADMIN_HTML = String.raw`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Travis Admin</title>
<style>
body{font-family:system-ui,sans-serif;background:#f4f5f7;color:#222;margin:0;padding:16px}
.w{max-width:520px;margin:0 auto}
h1{font-size:18px;margin:0 0 12px}
.c{background:#fff;border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.c h2{font-size:14px;margin:0 0 6px}
.n{font-size:12px;color:#666;line-height:1.5;margin:0 0 8px}
input{width:100%;box-sizing:border-box;padding:10px;margin:4px 0;border:1px solid #ccc;border-radius:8px;font-size:14px}
button{padding:10px 14px;border:0;border-radius:8px;background:#0078D4;color:#fff;font-size:14px;cursor:pointer;margin-top:4px}
button.d{background:#C42B1C}
#out{white-space:pre-wrap;font-size:13px;padding:10px;border-radius:8px;margin-top:6px;display:none}
#out.ok{display:block;background:#e6f4ea;color:#14532d}
#out.bad{display:block;background:#fde8e8;color:#7f1d1d}
</style></head><body><div class="w">
<h1>Travis Admin</h1>
<div class="c"><h2>Admin secret</h2>
<p class="n">Typed here, sent only with each action, never saved by this page.</p>
<input id="secret" type="password" placeholder="ADMIN_SECRET" autocomplete="off"></div>
<div id="out"></div>
<div class="c"><h2>1. Approve a WhatsApp verification</h2>
<p class="n">Open the WhatsApp message "Verify my Travis device: TRV-XXXXXX". Enter that code and the number shown at the top of that WhatsApp chat. Never use a number the person tells you.</p>
<input id="a-code" placeholder="Code, e.g. TRV-78AZ6J" autocapitalize="characters">
<input id="a-phone" placeholder="Number shown in the WhatsApp chat" inputmode="tel">
<button id="approve">Approve</button></div>
<div class="c"><h2>2. Look up a number</h2>
<input id="l-phone" placeholder="Phone number" inputmode="tel">
<button id="lookup">Look up</button></div>
<div class="c"><h2>3. Revoke a number's device</h2>
<p class="n">Frees the number. The person must register again. Their data on their own phone is untouched.</p>
<input id="r-phone" placeholder="Phone number" inputmode="tel">
<button id="revoke" class="d">Revoke</button></div>
<script>
var $=function(i){return document.getElementById(i)};
function show(ok,m){var o=$('out');o.className=ok?'ok':'bad';o.textContent=m}
async function call(path,body){
  var secret=$('secret').value.trim();
  if(!secret){show(false,'Enter the admin secret first.');return null}
  try{
    var r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json','x-admin-secret':secret},body:JSON.stringify(body)});
    var j={};try{j=await r.json()}catch(e){}
    if(r.status===401){show(false,'Wrong admin secret.');return null}
    if(r.status===429){show(false,'Too many attempts. Wait a minute.');return null}
    return {s:r.status,j:j}
  }catch(e){show(false,'Could not reach the server.');return null}
}
$('approve').onclick=async function(){
  var code=$('a-code').value.trim(),phone=$('a-phone').value.trim();
  if(!code||!phone){show(false,'Enter the code and the number shown in the WhatsApp chat.');return}
  var r=await call('/recovery/approve',{code:code,phone:phone});if(!r)return;
  show(r.s===200,r.s===200?'Approved. The person\'s app continues within a few seconds.':(r.j.error||('Failed ('+r.s+')')));
};
$('lookup').onclick=async function(){
  var phone=$('l-phone').value.trim();if(!phone){show(false,'Enter a phone number.');return}
  var r=await call('/admin/lookup',{phone:phone});if(!r)return;
  if(r.s!==200){show(false,r.j.error||('Failed ('+r.s+')'));return}
  var d=r.j;
  if(!d.registered){show(true,'No device has ever been registered for this number.');return}
  show(true,'Status: '+d.state+'\nActivation: '+d.activation_status+'\nRegistered: '+d.issued_at+'\nLast seen: '+(d.last_seen_at||'never')+'\nExpires: '+d.expires_at+(d.revoked_at?'\nRevoked: '+d.revoked_at:'')+'\nPending verification requests: '+d.pending_requests);
};
$('revoke').onclick=async function(){
  var phone=$('r-phone').value.trim();if(!phone){show(false,'Enter a phone number.');return}
  if(!confirm('Revoke the device for '+phone+'? They will have to register again.'))return;
  var r=await call('/revoke-device',{phone:phone});if(!r)return;
  show(r.s===200,r.s===200?(r.j.revoked?'Revoked '+r.j.revoked+' device(s).':'Nothing to revoke: no active device for that number.'):(r.j.error||('Failed ('+r.s+')')));
};
</script></div></body></html>`;

app.get('/admin', (req, res) => {
  res.set('Cache-Control', 'no-store').type('html').send(ADMIN_HTML);
});

// Status of a phone number (no device id or token is ever returned).
app.post('/admin/lookup', adminLimiter, async (req, res) => {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const phoneKey = normalizeKenyanPhone(sanitizePhone(req.body && req.body.phone));
  if (!/^254[17]\d{8}$/.test(phoneKey)) return res.status(400).json({ error: 'Invalid Kenyan phone number' });
  try {
    const d = await pool.query(
      `SELECT activation_status, issued_at, last_seen_at, expires_at, revoked_at
         FROM devices WHERE phone = $1 ORDER BY issued_at DESC LIMIT 1`,
      [phoneKey]
    );
    if (!d.rows[0]) return res.json({ registered: false });
    const p = await pool.query(
      `SELECT COUNT(*)::int AS n FROM phone_challenges
        WHERE phone = $1 AND verified_at IS NULL AND consumed_at IS NULL AND expires_at > NOW()`,
      [phoneKey]
    );
    const row = d.rows[0];
    const live = !row.revoked_at && new Date(row.expires_at) > new Date();
    return res.json({
      registered: true,
      state: row.revoked_at ? 'revoked' : (live ? 'active' : 'expired'),
      activation_status: row.activation_status,
      issued_at: row.issued_at,
      last_seen_at: row.last_seen_at,
      expires_at: row.expires_at,
      revoked_at: row.revoked_at,
      pending_requests: p.rows[0].n
    });
  } catch (e) {
    console.error('admin/lookup error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ====================== /revoke-device ======================
// Admin / support endpoint. Protect with ADMIN_SECRET.
// Support flow for "I lost my phone / data": revoke, then the user registers again.
app.post('/revoke-device', adminLimiter, async (req, res) => {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { device_id, phone } = req.body || {};
  try {
    let r;
    if (device_id) {
      r = await pool.query(
        `UPDATE devices SET revoked_at = NOW() WHERE device_id = $1 AND revoked_at IS NULL`,
        [device_id]
      );
    } else if (phone) {
      const p = normalizeKenyanPhone(phone);
      r = await pool.query(
        `UPDATE devices SET revoked_at = NOW() WHERE phone = $1 AND revoked_at IS NULL`,
        [p]
      );
    } else {
      return res.status(400).json({ error: 'device_id or phone required' });
    }
    res.json({ ok: true, revoked: r.rowCount || 0 });
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

// Reminders are open to every app user (paid, trial or expired) exactly as before premium: they are retention, not a premium feature.
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
