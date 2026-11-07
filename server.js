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

const deviceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

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
const DEVICE_SIGNING_SECRET = process.env.DEVICE_SIGNING_SECRET;
if (!DEVICE_SIGNING_SECRET || DEVICE_SIGNING_SECRET.length < 32) {
  console.error('❌ FATAL: DEVICE_SIGNING_SECRET missing or too short (need >=32 chars).');
  console.error('   Generate one:  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
  process.exit(1);
}

const DEVICE_TOKEN_TTL_DAYS = 365;

// ====================== Activation mode ======================
const ACTIVATION_MODE = (process.env.ACTIVATION_MODE || 'free').toLowerCase() === 'paid' ? 'paid' : 'free';
console.log(`ℹ️  Activation mode: ${ACTIVATION_MODE}`);

// ====================== WhatsApp ownership check ======================
const WA_NUMBER = (process.env.WHATSAPP_BUSINESS_NUMBER || '').replace(/\D/g, '');
const WA_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || '';
const WA_APP_SECRET = process.env.WHATSAPP_APP_SECRET || '';
const RECOVERY_TTL_MIN = parseInt(process.env.RECOVERY_TTL_MINUTES, 10) || (WA_APP_SECRET ? 10 : 60);
console.log(`ℹ️  WhatsApp verification: ${!WA_NUMBER ? 'NOT configured (set WHATSAPP_BUSINESS_NUMBER)' : WA_APP_SECRET ? 'automatic (webhook)' : 'manual approval only (no WHATSAPP_APP_SECRET)'}`);

// ====================== Premium ======================
const PRICE_PERSONAL = parseInt(process.env.PRICE_PERSONAL_KES, 10) || 250;
const PRICE_BUSINESS = parseInt(process.env.PRICE_BUSINESS_KES, 10) || 500;
const PREMIUM_PERIOD_DAYS = parseInt(process.env.PREMIUM_PERIOD_DAYS, 10) || 30;
const TRIAL_MINUTES = parseFloat(process.env.TRIAL_MINUTES) || 2;
const TRIAL_MAX_PER_IP_PER_DAY = parseInt(process.env.TRIAL_MAX_PER_IP_PER_DAY, 10) || 20;
const PESAFLUX_BASE_URL = (process.env.PESAFLUX_BASE_URL || 'https://api.pesaflux.co.ke').replace(/\/+$/, '');
const PAYMENT_PENDING_MAX_MS = 10 * 60 * 1000;

// ---- Affiliates ----
const AFFILIATE_FEE_KES = parseInt(process.env.AFFILIATE_FEE_KES, 10) || 50;
const COMMISSION_PERSONAL_KES = parseInt(process.env.COMMISSION_PERSONAL_KES, 10) || 49;
const COMMISSION_BUSINESS_KES = parseInt(process.env.COMMISSION_BUSINESS_KES, 10) || 80;
const APP_PUBLIC_URL = process.env.APP_PUBLIC_URL || 'https://travis-three.vercel.app/travis_core.html';
console.log(`ℹ️  Premium: personal KES ${PRICE_PERSONAL}, business KES ${PRICE_BUSINESS}, ${PREMIUM_PERIOD_DAYS} days per payment, trial ${TRIAL_MINUTES} min, PesaFlux ${process.env.PESAFLUX_API_KEY && process.env.PESAFLUX_EMAIL ? 'configured' : 'NOT configured (set PESAFLUX_API_KEY and PESAFLUX_EMAIL)'}`);
console.log(`ℹ️  Affiliate fee KES ${AFFILIATE_FEE_KES}, commissions KES ${COMMISSION_PERSONAL_KES}/${COMMISSION_BUSINESS_KES}`);

// ====================== Supabase Postgres Connection Pool ======================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS fingerprints (
        phone TEXT PRIMARY KEY,
        fp TEXT NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

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

    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activation_status TEXT NOT NULL DEFAULT 'active'`);
    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activated_at TIMESTAMPTZ`);
    await pool.query(`ALTER TABLE devices ADD COLUMN IF NOT EXISTS activation_ref TEXT`);

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

    // ---- Affiliate tables ----
    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_affiliates (
        id            BIGSERIAL PRIMARY KEY,
        user_id       TEXT UNIQUE NOT NULL,
        code          TEXT UNIQUE NOT NULL,
        status        TEXT NOT NULL DEFAULT 'active',
        payout_phone  TEXT,
        fee_payment_id TEXT,
        joined_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_aff_payments (
        id              TEXT PRIMARY KEY,
        user_id         TEXT NOT NULL,
        amount          INTEGER NOT NULL,
        msisdn          TEXT NOT NULL,
        status          TEXT NOT NULL DEFAULT 'pending',
        request_id      TEXT,
        receipt         TEXT UNIQUE,
        failure_reason  TEXT,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        paid_at         TIMESTAMPTZ,
        last_checked_at TIMESTAMPTZ,
        last_error      TEXT,
        ip              TEXT
      )`);
    await pool.query(`ALTER TABLE trv_aff_payments ADD COLUMN IF NOT EXISTS last_error TEXT`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_trv_aff_payments_user ON trv_aff_payments(user_id, created_at DESC)`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_referrals (
        phone        TEXT PRIMARY KEY,
        affiliate_id BIGINT NOT NULL,
        code         TEXT NOT NULL,
        source       TEXT NOT NULL,
        created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_trv_referrals_aff ON trv_referrals(affiliate_id, created_at DESC)`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_payouts (
        id           BIGSERIAL PRIMARY KEY,
        affiliate_id BIGINT NOT NULL,
        amount       INTEGER NOT NULL,
        cutoff       TIMESTAMPTZ NOT NULL,
        reference    TEXT,
        paid_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trv_commissions (
        id            BIGSERIAL PRIMARY KEY,
        payment_id    TEXT UNIQUE NOT NULL,
        affiliate_id  BIGINT NOT NULL,
        customer_phone TEXT NOT NULL,
        plan          TEXT NOT NULL,
        kind          TEXT NOT NULL,
        amount_paid   INTEGER NOT NULL,
        commission    INTEGER NOT NULL,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        payout_id     BIGINT
      )`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_trv_commissions_aff ON trv_commissions(affiliate_id, created_at DESC)`);

    console.log('✅ tables ready (push_subscriptions, fingerprints, devices, device_events, phone_challenges, entitlements, trv_payments, trv_affiliates, trv_aff_payments, trv_referrals, trv_payouts, trv_commissions)');
  } catch (err) {
    console.error('❌ table bootstrap error:', err.message);
  }

  try {
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_device_phone
      ON devices(phone) WHERE revoked_at IS NULL
    `);
  } catch (err) {
    console.error('⚠️ could not create uniq_active_device_phone (duplicate live devices for one phone exist?):', err.message);
  }
})();

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

const DEVICE_ID_RE = /^[A-F0-9]{32}$/;

function deriveActivationCode(deviceId) {
  return `TRV-KE-${String(deviceId).substring(3, 11).toUpperCase()}-5634`;
}

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

// ====================== Premium entitlement ======================
const planPrice = (type) => (type === 'business' ? PRICE_BUSINESS : PRICE_PERSONAL);
const cleanType = (t) => (t === 'business' ? 'business' : 'personal');

function computeEntitlement(row, accountType, now = new Date()) {
  const type = cleanType(accountType);
  const paidUntil = row && row.paid_until ? new Date(row.paid_until) : null;
  const trialEnd = row && row.trial_expires_at ? new Date(row.trial_expires_at) : null;
  const paidActive = !!paidUntil && paidUntil > now;
  const trialActive = !!trialEnd && trialEnd > now;
  const used = !!(row && (row.trial_started_at || row.paid_at));
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
    try { json = await res.json(); } catch (e) { }
    return { status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
}

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
    await recordCommission(client, row);
    await client.query('COMMIT');
    return row;
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    if (e.code === '23505') {
      console.error('payment receipt reused:', p.id);
      await markPayment(p.id, 'failed', 'receipt_reused');
      return await loadPayment(p.id);
    }
    throw e;
  } finally {
    client.release();
  }
}

async function reconcilePayment(p, force = false) {
  if (!p || p.status === 'paid' || !p.request_id) return p;
  if (p.status === 'failed' && !recoverableFail(p)) return p;
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
    await markPayment(p.id, 'expired', 'no_response');
    return await loadPayment(p.id);
  }
  return p;
}

async function refreshPendingPayment(phone) {
  const r = await pool.query(
    `SELECT * FROM trv_payments WHERE phone = $1 AND status IN ('pending','expired','failed') AND created_at > $2
      ORDER BY created_at DESC LIMIT 1`,
    [phone, new Date(Date.now() - 24 * 3600 * 1000)]
  );
  return r.rows[0] ? await reconcilePayment(r.rows[0]) : null;
}

// ====================== Guards ======================
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

// ====================== /register-device ======================
app.post('/register-device', deviceLimiter, async (req, res) => {
  const { phone } = req.body || {};
  const cleanPhone = sanitizePhone(phone);
  const ip = req.ip;
  const ua = (req.headers['user-agent'] || '').substring(0, 500);

  if (!cleanPhone || !isValidKenyanPhone(cleanPhone)) {
    return res.status(400).json({ error: 'Valid Kenyan phone number required' });
  }

  const phoneKey = normalizeKenyanPhone(cleanPhone);

  try {
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

    let refAffiliate = null;
    if (req.body && req.body.ref != null && String(req.body.ref).trim() !== '') {
      const rr = await resolveReferral(phoneKey, req.body.ref, 'install');
      if (!rr.ok) return res.status(400).json({ code: 'bad_referral', error: rr.error });
      if (!rr.existing) refAffiliate = rr.affiliate;
    }

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
      if (insErr.code === '23505') {
        return res.status(409).json({
          code: 'phone_registered',
          error: 'This phone number is already registered. Verify it on WhatsApp to restore your device.'
        });
      }
      throw insErr;
    }

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
    if (refAffiliate) await attachReferral(phoneKey, refAffiliate, 'install').catch((e) => console.error('referral attach failed:', e.message));

    const body = {
      device_id: deviceId,
      token,
      activation_status: activationStatus,
      expires_at: expiresAt.toISOString()
    };
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
app.post('/verify-device', verifyLimiter, async (req, res) => {
  const { fp, token } = req.body || {};
  const ip = req.ip;
  const ua = (req.headers['user-agent'] || '').substring(0, 500);

  if (!fp || !token) {
    return res.status(400).json({ valid: false, reason: 'missing_fields' });
  }

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

    if (decoded.sub !== fp) {
      await event(false, 'fp_token_mismatch', fp, decoded.phone);
      return res.status(401).json({ valid: false, reason: 'fp_token_mismatch' });
    }

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
    if (dev.activation_status !== 'active') {
      await event(false, 'not_activated', fp, dev.phone);
      return res.status(403).json({ valid: false, reason: 'not_activated', device_genuine: true });
    }

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

// ====================== Affiliate subsystem (rewritten from scratch) ======================
const AFF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const AFF_CODE_RE = /^TG[A-HJ-NP-Z2-9]{6}$/;
const normRefCode = (raw) => String(raw == null ? '' : raw).toUpperCase().replace(/[^A-Z0-9]/g, '');
const showRefCode = (code) => (code ? code.slice(0, 2) + '-' + code.slice(2) : '');
const BAD_REF_MSG = 'Referral code not recognised. Check it, or leave it blank.';

function genAffCode() {
  let c = 'TG';
  for (let i = 0; i < 6; i++) c += AFF_ALPHABET[crypto.randomInt(AFF_ALPHABET.length)];
  return c;
}

function commissionFor(p) {
  if (p.kind === 'upgrade') return Math.max(0, COMMISSION_BUSINESS_KES - COMMISSION_PERSONAL_KES);
  return p.plan === 'business' ? COMMISSION_BUSINESS_KES : COMMISSION_PERSONAL_KES;
}

function payoutWindow(now = new Date()) {
  const EAT = 3 * 3600 * 1000;
  const local = new Date(now.getTime() + EAT);
  const back = (local.getUTCDay() - 5 + 7) % 7;
  const lastCutoff = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() - back) - EAT);
  const nextCutoff = new Date(lastCutoff.getTime() + 7 * 86400 * 1000);
  return { lastCutoff, nextCutoff };
}

async function phoneHasPaid(phone) {
  const r = await pool.query(`SELECT 1 FROM trv_payments WHERE phone = $1 AND status = 'paid' LIMIT 1`, [phone]);
  return r.rowCount > 0;
}
async function referralOf(phone) {
  const r = await pool.query(`SELECT affiliate_id, code FROM trv_referrals WHERE phone = $1`, [phone]);
  return r.rows[0] || null;
}

async function resolveReferral(phoneKey, raw, source) {
  const code = normRefCode(raw);
  if (!AFF_CODE_RE.test(code)) return { ok: false, error: BAD_REF_MSG };
  const a = await pool.query(
    `SELECT a.id, a.code, a.payout_phone, u.phone AS user_phone
       FROM trv_affiliates a LEFT JOIN users u ON u.id::text = a.user_id
      WHERE a.code = $1 AND a.status = 'active'`, [code]);
  const aff = a.rows[0];
  if (!aff) return { ok: false, error: BAD_REF_MSG };
  const own = [aff.user_phone, aff.payout_phone].filter(Boolean).map((p) => {
    try { return normalizeKenyanPhone(sanitizePhone(p)); } catch (e) { return ''; }
  });
  if (own.includes(phoneKey)) return { ok: false, error: 'You cannot use your own referral code.' };
  if (await referralOf(phoneKey)) return { ok: true, existing: true, affiliate: aff };
  if (source === 'payment' && await phoneHasPaid(phoneKey)) {
    return { ok: false, error: 'A referral code can only be added before your first payment.' };
  }
  return { ok: true, affiliate: aff };
}
async function attachReferral(phoneKey, aff, source) {
  await pool.query(
    `INSERT INTO trv_referrals (phone, affiliate_id, code, source) VALUES ($1, $2, $3, $4) ON CONFLICT (phone) DO NOTHING`,
    [phoneKey, aff.id, aff.code, source]);
}

async function recordCommission(client, payment) {
  await client.query('SAVEPOINT commission');
  try {
    const r = await client.query(
      `SELECT r.affiliate_id FROM trv_referrals r JOIN trv_affiliates a ON a.id = r.affiliate_id
        WHERE r.phone = $1 AND a.status = 'active'`, [payment.phone]);
    if (r.rows[0]) {
      const amount = commissionFor(payment);
      if (amount > 0) {
        await client.query(
          `INSERT INTO trv_commissions (payment_id, affiliate_id, customer_phone, plan, kind, amount_paid, commission)
           VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (payment_id) DO NOTHING`,
          [payment.id, r.rows[0].affiliate_id, payment.phone, payment.plan, payment.kind, payment.amount, amount]);
      }
    }
    await client.query('RELEASE SAVEPOINT commission');
  } catch (e) {
    await client.query('ROLLBACK TO SAVEPOINT commission').catch(() => {});
    console.error('commission not recorded for payment', payment.id, e.message);
  }
}

// ---- Affiliate fee settlement ----
// Rules:
//  - Only "another affiliate fee used this receipt" blocks a settlement. A receipt from a
//    customer premium payment (trv_payments) must NEVER block affiliate activation.
//  - If the fee is already marked 'paid' we do not throw it away: we still make sure an
//    affiliate row exists (self-heal on every call).
//  - The whole thing is idempotent.
async function settleAffPayment(p, receipt) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Only clash with ANOTHER affiliate fee.
    if (receipt) {
      const clash = await client.query(
        `SELECT 1 FROM trv_aff_payments WHERE receipt = $1 AND id <> $2`,
        [receipt, p.id]
      );
      if (clash.rowCount) {
        await client.query('ROLLBACK');
        await pool.query(
          `UPDATE trv_aff_payments SET status='failed', failure_reason='receipt_reused', updated_at=NOW()
            WHERE id=$1 AND status <> 'paid'`, [p.id]);
        return null;
      }
    }

    const now = new Date();
    const upd = await client.query(
      `UPDATE trv_aff_payments
          SET status = 'paid', paid_at = COALESCE(paid_at, $2), updated_at = $2,
              receipt = COALESCE(NULLIF($3, ''), receipt), failure_reason = NULL, last_error = NULL
        WHERE id = $1
        RETURNING *`,
      [p.id, now, receipt || '']
    );
    if (!upd.rows[0]) { await client.query('ROLLBACK'); return null; }
    const row = upd.rows[0];

    // Ensure the affiliate row exists. Idempotent on user_id.
    let created = null;
    for (let i = 0; i < 6 && !created; i++) {
      try {
        await client.query('SAVEPOINT newcode');
        const ins = await client.query(
          `INSERT INTO trv_affiliates (user_id, code, fee_payment_id)
           VALUES ($1, $2, $3)
           ON CONFLICT (user_id) DO NOTHING
           RETURNING id, code`,
          [row.user_id, genAffCode(), row.id]
        );
        await client.query('RELEASE SAVEPOINT newcode');
        if (ins.rows[0]) created = ins.rows[0];
        else break; // already existed; nothing to do
      } catch (e) {
        await client.query('ROLLBACK TO SAVEPOINT newcode').catch(() => {});
        if (e.code !== '23505') throw e;
      }
    }

    await client.query('COMMIT');
    return row;
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    // We do NOT flip the payment to 'failed' on an internal error — the money is real.
    // We record the error and leave status alone so the next poll retries.
    await pool.query(
      `UPDATE trv_aff_payments SET last_error = $2, updated_at = NOW() WHERE id = $1`,
      [p.id, String(e.message || e).slice(0, 300)]
    ).catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

const HARD_FAIL_REASONS = ['amount_mismatch', 'receipt_reused', 'provider_unreachable', 'provider_rejected'];
const recoverableFail = (p) => p.status === 'failed' && !HARD_FAIL_REASONS.includes(p.failure_reason) && (Date.now() - new Date(p.updated_at).getTime()) < 2 * 3600 * 1000;

async function loadAffiliate(userId) {
  const r = await pool.query(`SELECT * FROM trv_affiliates WHERE user_id = $1`, [userId]);
  return r.rows[0] || null;
}

// Self-heal: if a PAID fee exists and the affiliate row is missing, create it now.
// Returns the affiliate row (or null if there is no paid fee and no existing affiliate).
async function ensureAffiliateFromPaidFee(uid) {
  let a = await loadAffiliate(uid);
  if (a) return a;

  const paidFee = (await pool.query(
    `SELECT * FROM trv_aff_payments WHERE user_id = $1 AND status = 'paid' ORDER BY paid_at DESC NULLS LAST, created_at DESC LIMIT 1`,
    [uid]
  )).rows[0];
  if (!paidFee) return null;

  for (let i = 0; i < 6 && !a; i++) {
    try {
      await pool.query(
        `INSERT INTO trv_affiliates (user_id, code, fee_payment_id)
         VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING`,
        [uid, genAffCode(), paidFee.id]
      );
    } catch (e) {
      if (e.code !== '23505') {
        console.error('ensureAffiliateFromPaidFee: insert failed for', uid, e.message);
        break;
      }
    }
    a = await loadAffiliate(uid);
  }
  return a;
}

// Ask PesaFlux what really happened and settle if completed. Returns the (possibly updated) payment row.
async function reconcileAffPayment(p, force = false) {
  if (!p) return p;

  // Already paid: don't ask PesaFlux again, but DO make sure the affiliate exists.
  if (p.status === 'paid') {
    await ensureAffiliateFromPaidFee(p.user_id).catch((e) => {
      console.error('ensureAffiliateFromPaidFee (paid path) failed for', p.user_id, e.message);
    });
    return p;
  }
  if (!p.request_id) return p;
  if (p.status === 'failed' && !recoverableFail(p)) return p;

  const ageMs = Date.now() - new Date(p.created_at).getTime();
  if (ageMs > 24 * 3600 * 1000) return p;
  if (!force && p.last_checked_at && Date.now() - new Date(p.last_checked_at).getTime() < 4000) return p;

  await pool.query(`UPDATE trv_aff_payments SET last_checked_at = NOW() WHERE id = $1`, [p.id]).catch(() => {});

  let r;
  try {
    r = await pesafluxCall('/v1/transactionstatus', { transaction_request_id: p.request_id });
  } catch (e) {
    console.error('pesaflux status error (affiliate):', e.message);
    return p;
  }
  const j = (r && r.json) || {};
  const st = String(j.TransactionStatus || '').trim().toLowerCase();
  const reload = async () => (await pool.query(`SELECT * FROM trv_aff_payments WHERE id = $1`, [p.id])).rows[0];

  if (/^(completed?|success(ful)?)$/.test(st)) {
    if (!(Number(j.TransactionAmount) >= p.amount)) {
      await pool.query(
        `UPDATE trv_aff_payments SET status='failed', failure_reason='amount_mismatch', updated_at=NOW()
          WHERE id=$1 AND status <> 'paid'`, [p.id]);
      return await reload();
    }
    const receipt = String(j.TransactionReceipt || j.TransactionID || p.request_id).trim();
    try { await settleAffPayment(p, receipt); }
    catch (e) { console.error('settleAffPayment threw for', p.id, '-', e.message); }
    return await reload();
  }

  if (/fail|cancel|reject|timeout|expire|insufficient|declin/.test(st)) {
    await pool.query(
      `UPDATE trv_aff_payments SET status='failed', failure_reason=$2, updated_at=NOW()
        WHERE id=$1 AND status <> 'paid'`, [p.id, st.slice(0, 60)]);
    return await reload();
  }

  if (p.status === 'pending' && ageMs > PAYMENT_PENDING_MAX_MS) {
    await pool.query(
      `UPDATE trv_aff_payments SET status='expired', failure_reason='no_response', updated_at=NOW()
        WHERE id=$1 AND status <> 'paid'`, [p.id]);
    return await reload();
  }
  return p;
}

// ====================== Premium routes ======================

app.post('/entitlement', verifyLimiter, deviceAuth, async (req, res) => {
  try {
    const phone = req.device.phone;
    let pending = await refreshPendingPayment(phone);
    const row = await loadEntitlement(phone);
    const ent = computeEntitlement(row, req.body && req.body.account_type);
    syncStoredStatus(row, ent.state);
    ent.phone_masked = maskPhone(phone);
    ent.pending_payment = pending && pending.status === 'pending' ? { id: pending.id, amount: pending.amount, kind: pending.kind } : null;
    ent.has_referral = !!(await referralOf(phone));
    return res.json(ent);
  } catch (e) {
    console.error('entitlement error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

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

app.post('/pay/checkout', payLimiter, deviceAuth, async (req, res) => {
  if (!process.env.PESAFLUX_API_KEY || !process.env.PESAFLUX_EMAIL) {
    return res.status(503).json({ code: 'PAYMENTS_NOT_CONFIGURED', error: 'Payments are not available right now. Please contact support.' });
  }
  try {
    const phone = req.device.phone;
    const type = cleanType(req.body && req.body.account_type);
    await refreshPendingPayment(phone);
    const row = await loadEntitlement(phone);
    const ent = computeEntitlement(row, type);
    if (ent.needs === 'ok' && ent.state === 'paid') {
      return res.status(409).json({ code: 'ALREADY_PAID', error: 'Your plan is already paid.', entitlement: ent });
    }
    const price = ent.price;
    const msisdnRaw = req.body && req.body.msisdn ? sanitizePhone(req.body.msisdn) : phone;
    if (!isValidKenyanPhone(msisdnRaw)) return res.status(400).json({ error: 'Enter a valid Safaricom M-Pesa number.' });
    const msisdn = normalizeKenyanPhone(msisdnRaw);

    if (req.body && req.body.ref != null && String(req.body.ref).trim() !== '') {
      const rr = await resolveReferral(phone, req.body.ref, 'payment');
      if (!rr.ok) return res.status(400).json({ code: 'bad_referral', error: rr.error });
      if (!rr.existing) await attachReferral(phone, rr.affiliate, 'payment');
    }

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

app.post('/pay/callback', callbackLimiter, async (req, res) => {
  res.status(200).json({ ok: true });
  try {
    const b = req.body || {};
    const ref = String(b.TransactionReference || b.reference || '').trim();
    if (/^TRVAFF[A-F0-9]{10}$/.test(ref)) {
      const ap = (await pool.query(`SELECT * FROM trv_aff_payments WHERE id = $1`, [ref])).rows[0];
      if (ap && ap.status !== 'paid') await reconcileAffPayment(ap, true);
      return;
    }
    if (!/^TRVPAY[A-F0-9]{10}$/.test(ref)) return;
    const p = await loadPayment(ref);
    if (p && p.status !== 'paid') await reconcilePayment(p, true);
  } catch (e) {
    console.error('pay/callback error:', e);
  }
});

// ====================== Affiliate routes ======================
const affLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false });

// Everything the dashboard shows, in one call.
app.get('/aff/me', affLimiter, auth, async (req, res) => {
  try {
    const uid = String(req.user.id);

    const u = (await pool.query(
      `SELECT id, full_name, phone FROM users WHERE id::text = $1 LIMIT 1`, [uid]
    )).rows[0];
    if (!u) return res.status(401).json({ error: 'Account not found' });

    // Reconcile any join payment that completed a moment ago (late webhook / lost callback).
    const pend = (await pool.query(
      `SELECT * FROM trv_aff_payments
        WHERE user_id = $1 AND status IN ('pending','expired','failed') AND created_at > $2
        ORDER BY created_at DESC LIMIT 1`,
      [uid, new Date(Date.now() - 24 * 3600 * 1000)]
    )).rows[0];
    const pendNow = pend ? await reconcileAffPayment(pend) : null;

    // Robust affiliate lookup:
    //   1) paid-fee self-heal (creates the row if the fee is paid but the row was never made)
    //   2) by user_id (the normal case)
    let a = await ensureAffiliateFromPaidFee(uid);
    if (!a) a = await loadAffiliate(uid);
    if (!a && u.phone) {
      const byPhone = await pool.query(
        `SELECT * FROM trv_affiliates
          WHERE payout_phone = $1 OR payout_phone = $2
          ORDER BY joined_at DESC LIMIT 1`,
        [normalizeKenyanPhone(u.phone), sanitizePhone(u.phone)]
      );
      a = byPhone.rows[0] || null;
    }

    const { lastCutoff, nextCutoff } = payoutWindow();
    const base = {
      profile: { fullName: u.full_name, phone: u.phone },
      fee: AFFILIATE_FEE_KES,
      rates: { personal: COMMISSION_PERSONAL_KES, business: COMMISSION_BUSINESS_KES },
      prices: { personal: PRICE_PERSONAL, business: PRICE_BUSINESS },
      app_url: APP_PUBLIC_URL,
      server_now: new Date().toISOString(),
      pending_payment: pendNow && pendNow.status === 'pending' ? { id: pendNow.id } : null
    };

    if (!a) {
      // Genuinely not an affiliate yet.
      return res.json({ ...base, affiliate: null });
    }

    const st = (await pool.query(
      `SELECT COALESCE(SUM(commission),0)::int AS total,
              COALESCE(SUM(commission) FILTER (WHERE payout_id IS NULL AND created_at <  $2),0)::int AS payable,
              COALESCE(SUM(commission) FILTER (WHERE payout_id IS NULL AND created_at >= $2),0)::int AS accruing,
              COALESCE(SUM(commission) FILTER (WHERE payout_id IS NOT NULL),0)::int AS paid_out,
              COUNT(*)::int AS payments, COUNT(DISTINCT customer_phone)::int AS customers
         FROM trv_commissions WHERE affiliate_id = $1`, [a.id, lastCutoff]
    )).rows[0];

    const signups = (await pool.query(
      `SELECT COUNT(*)::int AS n FROM trv_referrals WHERE affiliate_id = $1`, [a.id]
    )).rows[0].n;

    const comm = (await pool.query(
      `SELECT customer_phone, plan, kind, amount_paid, commission, created_at, payout_id
         FROM trv_commissions WHERE affiliate_id = $1
        ORDER BY created_at DESC LIMIT 50`, [a.id]
    )).rows;

    const refs = (await pool.query(
      `SELECT r.phone, r.created_at, r.source,
              EXISTS (SELECT 1 FROM trv_commissions c
                       WHERE c.affiliate_id = r.affiliate_id AND c.customer_phone = r.phone) AS paying
         FROM trv_referrals r WHERE r.affiliate_id = $1
        ORDER BY r.created_at DESC LIMIT 30`, [a.id]
    )).rows;

    const payouts = (await pool.query(
      `SELECT amount, reference, paid_at FROM trv_payouts
        WHERE affiliate_id = $1 ORDER BY paid_at DESC LIMIT 20`, [a.id]
    )).rows;

    return res.json({
      ...base,
      affiliate: {
        code: a.code,
        display_code: showRefCode(a.code),
        joined_at: a.joined_at,
        payout_phone: a.payout_phone || u.phone
      },
      stats: { ...st, signups, balance: st.payable + st.accruing },
      schedule: {
        timezone: 'EAT (UTC+3)',
        week_started: lastCutoff.toISOString(),
        next_cutoff: nextCutoff.toISOString(),
        rule: 'Earnings made before Friday 00:00 are paid that Friday. Friday and later go to the next Friday.'
      },
      commissions: comm.map((c) => ({
        customer: maskPhone(c.customer_phone),
        plan: c.plan,
        kind: c.kind,
        amount_paid: c.amount_paid,
        commission: c.commission,
        at: c.created_at,
        status: c.payout_id ? 'paid' : (new Date(c.created_at) < lastCutoff ? 'payable' : 'accruing')
      })),
      referrals: refs.map((r) => ({
        customer: maskPhone(r.phone),
        at: r.created_at,
        source: r.source,
        paying: r.paying
      })),
      payouts
    });
  } catch (e) {
    console.error('aff/me error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Pay the one-off fee. Idempotent and self-healing:
//  - already an affiliate → 409 ALREADY_AFFILIATE
//  - paid fee exists but row missing → self-heal and return status:'paid' (no new charge)
//  - otherwise → STK, return { payment_id, status:'pending' }
app.post('/aff/join', payLimiter, auth, async (req, res) => {
  if (!process.env.PESAFLUX_API_KEY || !process.env.PESAFLUX_EMAIL) {
    return res.status(503).json({ code: 'PAYMENTS_NOT_CONFIGURED', error: 'Payments are not available right now. Please contact support.' });
  }
  try {
    const uid = String(req.user.id);

    let a = await loadAffiliate(uid);
    if (a) return res.status(409).json({ code: 'ALREADY_AFFILIATE', error: 'You are already an affiliate.' });

    a = await ensureAffiliateFromPaidFee(uid);
    if (a) {
      const paidFee = (await pool.query(
        `SELECT id FROM trv_aff_payments WHERE user_id = $1 AND status = 'paid' ORDER BY paid_at DESC NULLS LAST, created_at DESC LIMIT 1`,
        [uid])).rows[0];
      return res.json({
        status: 'paid',
        payment_id: paidFee ? paidFee.id : null,
        affiliate: { code: a.code, display_code: showRefCode(a.code) }
      });
    }

    const u = (await pool.query(`SELECT phone FROM users WHERE id::text = $1`, [uid])).rows[0];
    if (!u) return res.status(401).json({ error: 'Account not found' });

    const raw = req.body && req.body.msisdn ? sanitizePhone(req.body.msisdn) : sanitizePhone(u.phone);
    if (!isValidKenyanPhone(raw)) return res.status(400).json({ error: 'Enter a valid Safaricom M-Pesa number.' });
    const msisdn = normalizeKenyanPhone(raw);

    const open = (await pool.query(
      `SELECT * FROM trv_aff_payments WHERE user_id = $1 AND status = 'pending' AND created_at > $2
        ORDER BY created_at DESC LIMIT 1`,
      [uid, new Date(Date.now() - 3 * 60 * 1000)]
    )).rows[0];
    if (open) return res.json({ payment_id: open.id, status: 'pending', amount: open.amount, reused: true });

    const id = 'TRVAFF' + crypto.randomBytes(5).toString('hex').toUpperCase();
    await pool.query(
      `INSERT INTO trv_aff_payments (id, user_id, amount, msisdn, ip) VALUES ($1, $2, $3, $4, $5)`,
      [id, uid, AFFILIATE_FEE_KES, msisdn, req.ip]
    );

    let r;
    try {
      r = await pesafluxCall('/v1/initiatestk', { amount: AFFILIATE_FEE_KES, msisdn, reference: id });
    } catch (e) {
      console.error('pesaflux initiate error (affiliate):', e.message);
      await pool.query(
        `UPDATE trv_aff_payments SET status='failed', failure_reason='provider_unreachable', updated_at=NOW() WHERE id=$1`, [id]);
      return res.status(502).json({ code: 'PAYMENT_PROVIDER_ERROR', error: 'Could not reach M-Pesa. Please try again.' });
    }
    const j = (r && r.json) || {};
    if (String(j.success) !== '200' || !j.transaction_request_id) {
      console.error('pesaflux initiate rejected (affiliate):', r && r.status, JSON.stringify(j).slice(0, 200));
      await pool.query(
        `UPDATE trv_aff_payments SET status='failed', failure_reason='provider_rejected', updated_at=NOW() WHERE id=$1`, [id]);
      return res.status(502).json({ code: 'PAYMENT_PROVIDER_ERROR', error: 'Could not start the M-Pesa prompt. Check the number and try again.' });
    }
    await pool.query(`UPDATE trv_aff_payments SET request_id = $2, updated_at = NOW() WHERE id = $1`, [id, String(j.transaction_request_id)]);
    return res.json({ payment_id: id, status: 'pending', amount: AFFILIATE_FEE_KES });
  } catch (e) {
    console.error('aff/join error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// The dashboard polls this. MUST eventually return status:'paid' for every paid fee.
app.post('/aff/join/status', affLimiter, auth, async (req, res) => {
  try {
    const uid = String(req.user.id);
    const id = String((req.body && req.body.payment_id) || '');

    let p = (await pool.query(`SELECT * FROM trv_aff_payments WHERE id = $1`, [id])).rows[0];
    if (!p || p.user_id !== uid) return res.status(404).json({ status: 'unknown' });

    p = await reconcileAffPayment(p);

    // Self-heal every time, even after reconcile short-circuits on already-paid.
    let a = await ensureAffiliateFromPaidFee(uid);
    if (!a) a = await loadAffiliate(uid);

    const fresh = (await pool.query(
      `SELECT status, failure_reason, last_error FROM trv_aff_payments WHERE id = $1`, [id]
    )).rows[0] || p;

    const status = a ? 'paid' : fresh.status;
    return res.json({
      status,
      reference: id,
      failure_reason: status === 'failed' ? fresh.failure_reason : null,
      problem: !a && fresh.status === 'paid' && !!fresh.last_error,
      affiliate: a ? { code: a.code, display_code: showRefCode(a.code) } : null
    });
  } catch (e) {
    console.error('aff/join/status error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/aff/payout-phone', affLimiter, auth, async (req, res) => {
  try {
    const a = await loadAffiliate(String(req.user.id));
    if (!a) return res.status(403).json({ error: 'Become an affiliate first.' });
    const raw = sanitizePhone(req.body && req.body.phone);
    if (!isValidKenyanPhone(raw)) return res.status(400).json({ error: 'Enter a valid Safaricom M-Pesa number.' });
    await pool.query(`UPDATE trv_affiliates SET payout_phone = $2 WHERE id = $1`, [a.id, normalizeKenyanPhone(raw)]);
    return res.json({ ok: true, payout_phone: normalizeKenyanPhone(raw) });
  } catch (e) {
    console.error('aff/payout-phone error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ---- Admin: who is due, and mark them paid ----
function adminOnly(req, res) {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) { res.status(401).json({ error: 'Unauthorized' }); return false; }
  return true;
}

app.post('/admin/aff/recheck', adminLimiter, async (req, res) => {
  if (!adminOnly(req, res)) return;
  try {
    const b = req.body || {};
    let p;
    const id = String(b.payment_id || '').trim();
    const phoneRaw = b.phone ? sanitizePhone(b.phone) : '';
    if (id) p = (await pool.query(`SELECT * FROM trv_aff_payments WHERE id = $1`, [id])).rows[0];
    else if (phoneRaw) {
      const key = isValidKenyanPhone(phoneRaw) ? normalizeKenyanPhone(phoneRaw) : phoneRaw;
      p = (await pool.query(
        `SELECT p.* FROM trv_aff_payments p LEFT JOIN users u ON u.id::text = p.user_id
          WHERE u.phone = $1 OR u.phone = $2 OR p.msisdn = $1 ORDER BY p.created_at DESC LIMIT 1`, [key, phoneRaw])).rows[0];
    }
    if (!p) return res.status(404).json({ error: 'No affiliate payment found for that number.' });
    const before = { status: p.status, failure_reason: p.failure_reason, last_error: p.last_error };
    let raw = null, err = null;
    const errText = (e) => e.message + (e.detail ? ' (' + e.detail + ')' : '');
    if (b.mark_paid) {
      const receipt = String(b.receipt || '').trim().toUpperCase();
      if (!/^[A-Z0-9]{8,12}$/.test(receipt)) return res.status(400).json({ error: 'Enter the M-Pesa confirmation code from the payment message (8-12 letters/digits).' });
      try { await settleAffPayment(p, receipt); } catch (e) { err = 'activate: ' + errText(e); }
    } else {
      try { const r = await pesafluxCall('/v1/transactionstatus', { transaction_request_id: p.request_id }); raw = r && r.json; } catch (e) { err = 'PesaFlux: ' + errText(e); }
      try {
        await reconcileAffPayment({ ...p, last_checked_at: null, status: p.status === 'failed' ? 'pending' : p.status }, true);
      } catch (e) { err = (err ? err + '; ' : '') + 'activate: ' + errText(e); }
    }
    // Always self-heal and report.
    let a = await ensureAffiliateFromPaidFee(p.user_id);
    if (!a) a = await loadAffiliate(p.user_id);
    const after = (await pool.query(`SELECT status, failure_reason, last_error FROM trv_aff_payments WHERE id = $1`, [p.id])).rows[0];
    return res.json({ payment_id: p.id, amount: p.amount, before, after, pesaflux: raw, affiliate_active: !!a, code: a ? showRefCode(a.code) : null, error: err });
  } catch (e) {
    console.error('admin/aff/recheck error:', e);
    return res.status(500).json({ error: 'Server error: ' + e.message });
  }
});

app.post('/admin/aff/due', adminLimiter, async (req, res) => {
  if (!adminOnly(req, res)) return;
  try {
    const { lastCutoff } = payoutWindow();
    const r = await pool.query(
      `SELECT a.id, a.code, COALESCE(a.payout_phone, u.phone) AS pay_to, u.full_name,
              SUM(c.commission)::int AS payable, COUNT(*)::int AS payments
         FROM trv_commissions c JOIN trv_affiliates a ON a.id = c.affiliate_id
         LEFT JOIN users u ON u.id::text = a.user_id
        WHERE c.payout_id IS NULL AND c.created_at < $1
        GROUP BY a.id, a.code, a.payout_phone, u.phone, u.full_name ORDER BY payable DESC`, [lastCutoff]);
    return res.json({ cutoff: lastCutoff.toISOString(), due: r.rows });
  } catch (e) {
    console.error('admin/aff/due error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/admin/aff/pay', adminLimiter, async (req, res) => {
  if (!adminOnly(req, res)) return;
  const affiliateId = parseInt(req.body && req.body.affiliate_id, 10);
  const reference = String((req.body && req.body.reference) || '').trim().slice(0, 60);
  if (!affiliateId || !reference) return res.status(400).json({ error: 'affiliate_id and the M-Pesa reference you paid with are required' });
  const client = await pool.connect();
  try {
    const { lastCutoff } = payoutWindow();
    await client.query('BEGIN');
    const rows = (await client.query(
      `SELECT id, commission FROM trv_commissions WHERE affiliate_id = $1 AND payout_id IS NULL AND created_at < $2 FOR UPDATE`,
      [affiliateId, lastCutoff])).rows;
    if (!rows.length) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Nothing payable for that affiliate (already paid, or earned after this Friday\'s cutoff).' }); }
    const total = rows.reduce((n, r) => n + r.commission, 0);
    const p = (await client.query(
      `INSERT INTO trv_payouts (affiliate_id, amount, cutoff, reference) VALUES ($1, $2, $3, $4) RETURNING id`,
      [affiliateId, total, lastCutoff, reference])).rows[0];
    await client.query(`UPDATE trv_commissions SET payout_id = $1 WHERE id = ANY($2::bigint[])`, [p.id, rows.map((r) => r.id)]);
    await client.query('COMMIT');
    return res.json({ ok: true, paid: total, payments: rows.length, payout_id: p.id });
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('admin/aff/pay error:', e);
    return res.status(500).json({ error: 'Server error' });
  } finally { client.release(); }
});

// ====================== WhatsApp ownership check ======================
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
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

app.get('/whatsapp/webhook', (req, res) => {
  if (WA_VERIFY_TOKEN && req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === WA_VERIFY_TOKEN) {
    return res.status(200).send(String(req.query['hub.challenge'] || ''));
  }
  return res.sendStatus(403);
});

app.post('/whatsapp/webhook', async (req, res) => {
  if (!WA_APP_SECRET) return res.sendStatus(503);
  const sig = String(req.headers['x-hub-signature-256'] || '');
  const expected = 'sha256=' + crypto.createHmac('sha256', WA_APP_SECRET).update(req.rawBody || Buffer.alloc(0)).digest('hex');
  const ok = sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return res.sendStatus(401);
  res.sendStatus(200);

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

// ====================== Admin HTML (unchanged) ======================
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
<div class="c"><h2>4. Affiliate payouts due</h2>
<p class="n">Shows what each affiliate earned before the last Friday 00:00 (Nairobi). Send the M-Pesa yourself, then type the affiliate ID and your M-Pesa reference to record it.</p>
<button id="due">Load payouts due</button>
<input id="p-id" placeholder="Affiliate ID" inputmode="numeric">
<input id="p-ref" placeholder="Your M-Pesa reference for the payout">
<button id="paid">Mark paid</button></div>
<div class="c"><h2>5. Affiliate paid but not activated?</h2>
<p class="n">Type the affiliate's phone number. "Re-check" asks PesaFlux again and shows exactly what it said and what went wrong. If you can see the M-Pesa confirmation message yourself, type its code and press "Confirm paid" to activate them.</p>
<input id="a-phone" placeholder="Affiliate phone number" inputmode="tel">
<button id="recheck">Re-check</button>
<input id="a-receipt" placeholder="M-Pesa confirmation code (only for Confirm paid)">
<button id="confirmpaid">Confirm paid</button></div>
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
$('due').onclick=async function(){
  var r=await call('/admin/aff/due',{});if(!r)return;
  if(r.s!==200){show(false,r.j.error||('Failed ('+r.s+')'));return}
  if(!r.j.due.length){show(true,'Nothing payable right now.');return}
  show(true,r.j.due.map(function(d){return 'ID '+d.id+'  '+(d.full_name||'')+'  '+d.code+'\nPay '+d.pay_to+'  KES '+d.payable+'  ('+d.payments+' payments)'}).join('\n\n'));
};
$('paid').onclick=async function(){
  var id=$('p-id').value.trim(),ref=$('p-ref').value.trim();
  if(!id||!ref){show(false,'Enter the affiliate ID and your M-Pesa reference.');return}
  if(!confirm('Record payout for affiliate '+id+' with reference '+ref+'?'))return;
  var r=await call('/admin/aff/pay',{affiliate_id:id,reference:ref});if(!r)return;
  show(r.s===200,r.s===200?('Recorded: KES '+r.j.paid+' ('+r.j.payments+' payments).'):(r.j.error||('Failed ('+r.s+')')));
};
async function affRecheck(manual){
  var phone=$('a-phone').value.trim();if(!phone){show(false,'Enter the affiliate phone number.');return}
  var body={phone:phone};
  if(manual){var rc=$('a-receipt').value.trim();if(!rc){show(false,'Enter the M-Pesa confirmation code.');return}
    if(!confirm('Activate this affiliate using M-Pesa code '+rc+'? Only do this if you have seen the payment.'))return;body.mark_paid=true;body.receipt=rc}
  var r=await call('/admin/aff/recheck',body);if(!r)return;
  if(r.s!==200){show(false,r.j.error||('Failed ('+r.s+')'));return}
  var d=r.j;
  show(d.affiliate_active,(d.affiliate_active?'ACTIVE. Code '+d.code+'\n':'NOT ACTIVE yet\n')+'Payment '+d.payment_id+' (KES '+d.amount+')\nBefore: '+d.before.status+(d.before.failure_reason?' ['+d.before.failure_reason+']':'')+(d.before.last_error?'\nEarlier error: '+d.before.last_error:'')+'\nNow: '+d.after.status+(d.after.failure_reason?' ['+d.after.failure_reason+']':'')+(d.error?'\nError: '+d.error:'')+(d.pesaflux?'\nPesaFlux said: '+JSON.stringify(d.pesaflux):''));
}
$('recheck').onclick=function(){affRecheck(false)};
$('confirmpaid').onclick=function(){affRecheck(true)};
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
app.post('/store-fingerprint', async (req, res) => {
  return res.status(410).json({
    error: 'This endpoint is deprecated. Use /register-device. Client-side fingerprint generation is no longer accepted.'
  });
});

// ====================== Legacy /lookup-fingerprint ======================
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

module.exports = { grantActivation, deriveActivationCode };
