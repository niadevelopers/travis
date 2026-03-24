function showCustomAlert(message, callback = null) {
    const alertBox = document.getElementById('custom-alert');
    const messageEl = document.getElementById('custom-alert-message');
    const okBtn = document.getElementById('custom-alert-ok');

    messageEl.innerHTML = message;
    alertBox.style.display = 'flex';

    const newOkBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);

    newOkBtn.addEventListener('click', () => {
        alertBox.style.display = 'none';
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
        document.getElementById('install-status').innerText = 'Service worker failed – install may not work';
      });
  });
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-status').innerText = 'Ready to install – click below';
  document.getElementById('install-btn').disabled = false;
});

window.addEventListener('appinstalled', () => {
  document.getElementById('install-status').innerText = 'Installed! Reopen from home screen.';
});

async function triggerInstall() {
  await sendFingerprint(); 

  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;

    if (outcome === 'accepted') {
      document.getElementById('install-overlay').classList.add('hidden');
      showCustomAlert('Installed!<br><br> Close this tab → open from home screen to activate.');
    } else {
      showCustomAlert('Install cancelled.<br><br> You must install to continue.');
    }
  } else {
    document.getElementById('install-status').innerText = 'Install not available yet – check console / Lighthouse';
    showCustomAlert('App already installed');
  }
}


function generateFingerprint() {

    let saved = localStorage.getItem('fp');
    if (saved && saved.length === 32) {
        return saved;
    }

    const canvas = (function() {
        try {
            const c = document.createElement('canvas');
            c.width = 256; c.height = 60;
            const ctx = c.getContext('2d');
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("TravisGuardian • 2026", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("TravisGuardian • 2026", 4, 17);
            return c.toDataURL(); 
        } catch(e) { return 'canvas-fail'; }
    })();

    const signals = [
        navigator.userAgent || 'UA-unknown',
        navigator.language || 'xx-XX',
        navigator.hardwareConcurrency || '0',
        screen.width + '×' + screen.height + '×' + (screen.colorDepth || 0),
        screen.availWidth + '×' + screen.availHeight,
        new Date().getTimezoneOffset(),
        Intl.DateTimeFormat().resolvedOptions().timeZone || 'tz-unknown',
        canvas.substring(0, 200), 
    ].join('|||');


    let hash = 5381;
    for (let i = 0; i < signals.length; i++) {
        hash = ((hash << 5) + hash + signals.charCodeAt(i)) | 0;
    }

    let fp = '';
    while (fp.length < 32) {
        hash = (hash * 31 + 0x9E3779B9) | 0; 
        fp += (Math.abs(hash) % 36).toString(36).toUpperCase();
    }
    fp = fp.substring(0, 32);

    localStorage.setItem('fp', fp);

    return fp;
}

function encryptFingerprint(fp) {
    const key = "TRAVIS-GUARDIAN-SECURE-2026-x7k9";
    let encrypted = '';
    for (let i = 0; i < fp.length; i++) {
        encrypted += String.fromCharCode(fp.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    const base64 = btoa(encrypted);
    return base64;
}

async function sendFingerprint() {

    const fp = generateFingerprint();
    const encrypted = encryptFingerprint(fp);

    const payload = {
        data: encrypted,
        ts: Date.now(),
        buyerInfo: `${navigator.userAgent} | ${screen.width}x${screen.height}×${screen.colorDepth}`
    };


    try {
        const res = await fetch('/activate-fingerprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });


        if (!res.ok) {
            console.warn('Server rejected:', await res.text());
        } else {
        }
    } catch (err) {
        console.error(' Network / server error:', err);
    }

}

async function attemptActivation() {
    const entered = document.getElementById('act-code').value
        .trim()
        .toUpperCase()
        .replace(/[^0-9A-Z-]/g, '');

    const fp = localStorage.getItem('fp');

    if (!fp || fp.length !== 32) {
        showCustomAlert("No valid device fingerprint found.<br><br>Please restart installation process.");
        return;
    }


    const next8 = fp.slice(3, 11);
    const expected = `TRV-KE-${next8}-5634`;

    if (entered === expected) {
        let meta = await getData("meta", "config") || {};
        await saveData("meta", {
            ...meta,
            id: "config",
            activated: true,
            fingerprint: fp,
            activatedAt: Date.now()
        });

        document.getElementById('activation-overlay').classList.add('hidden');
        location.reload();
    } else {
        showCustomAlert("Invalid activation code.");
        document.getElementById('act-code').value = '';
        document.getElementById('act-code').focus();
    }
}

let db;
let backupDirHandle = null; 
let state = { user: null, transactions: [], obligations: [] };

const BACKUP_FILE = "travis-finance-backup.json";

// ====================== HELPERS ======================

async function getData(storeName, id) {
    if (!db) return null;
    try {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return new Promise((resolve) => {
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        return null;
    }
}

async function getAllData(storeName) {
    if (!db) return [];
    try {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return new Promise((resolve) => {
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve([]);
        });
    } catch (e) {
        return [];
    }
}

// ====================== UI ASSETS BACKUP ======================
async function backupUIAssets() {
    if (!backupDirHandle) return;

    const criticalFiles = [
        { name: "index.html" },
        { name: "tailwind-app.css" },
        { name: "script.js" },
        { name: "sw.js" },
        { name: "input-app.css" }
    ];

    for (const file of criticalFiles) {
        try {
            const response = await fetch(file.name);
            if (!response.ok) continue;

            const blob = await response.blob();
            const fileHandle = await backupDirHandle.getFileHandle(file.name, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();

            console.log(`✅ UI file backed up: ${file.name}`);
        } catch (e) {
            console.warn(`Failed to backup ${file.name}`, e);
        }
    }
    console.log("✅ All UI assets backed up to device folder");
}

// ====================== REBUILD UI FROM DEVICE (runs on every boot when possible) ======================
async function rebuildUIFromDevice() {
    if (!backupDirHandle) return false;

    try {
        const uiFiles = ["index.html", "tailwind-app.css", "script.js", "sw.js", "input-app.css"];
        const cache = await caches.open("travis-ui-cache-v1");

        for (const filename of uiFiles) {
            const fileHandle = await backupDirHandle.getFileHandle(filename);
            const file = await fileHandle.getFile();
            const buffer = await file.arrayBuffer();

            await cache.put(`/${filename}`, new Response(buffer, {
                headers: { 
                    "Content-Type": filename.endsWith(".css") ? "text/css" : 
                                   filename.endsWith(".js") ? "text/javascript" : "text/html" 
                }
            }));
        }
        console.log("✅ UI rebuilt from device folder on this boot");
        return true;
    } catch (e) {
        console.error("UI rebuild failed", e);
        return false;
    }
}

// ====================== SILENT BACKUP ======================
async function saveBackup() {
    if (!backupDirHandle || !db) return;

    try {
        const backupData = {};

        for (const storeName of ["meta", "tx"]) {
            const t = db.transaction(storeName, "readonly");
            const store = t.objectStore(storeName);
            backupData[storeName] = await new Promise(res => {
                const r = store.getAll();
                r.onsuccess = () => res(r.result);
                r.onerror = () => res([]);
            });
        }

        const json = JSON.stringify(backupData, null, 2);

        const fileHandle = await backupDirHandle.getFileHandle(BACKUP_FILE, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(json);
        await writable.close();

        console.log("✅ Silent backup saved");
    } catch (e) {
        console.error("Silent backup failed", e);
    }
}

// ====================== RESTORE HELPERS ======================
async function readBackupContent() {
    try {
        if (!window.tempBackupFileHandle) {
            console.warn("No backup file handle available");
            return { data: null, error: "No file handle" };
        }

        const file = await window.tempBackupFileHandle.getFile();
        const text = await file.text();
        const data = JSON.parse(text);

        return { data, error: null };
    } catch (e) {
        console.error("Failed to read/parse backup file:", e);
        return { data: null, error: e.message || String(e) };
    }
}

async function restoreFromBackup() {
    const { data: backup, error: readError } = await readBackupContent();
    if (readError) {
        console.error("Restore aborted - read error:", readError);
        return { success: false, error: `Could not read the backup file: ${readError}` };
    }
    if (!backup) {
        return { success: false, error: "Backup file was empty or invalid" };
    }

    try {
        for (const storeName of ["meta", "tx"]) {
            if (!backup[storeName] || !Array.isArray(backup[storeName])) continue;

            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            await new Promise((res, rej) => {
                const clearReq = store.clear();
                clearReq.onsuccess = res;
                clearReq.onerror = () => rej(clearReq.error);
            });

            for (const item of backup[storeName]) {
                await new Promise((res, rej) => {
                    const putReq = store.put(item);
                    putReq.onsuccess = res;
                    putReq.onerror = () => rej(putReq.error);
                });
            }

            await new Promise((res) => { tx.oncomplete = res; });
        }

        let fp = null;
        const config = await getData("meta", "config");
        if (config?.fingerprint) {
            fp = config.fingerprint;
        } else if (backup.meta) {
            const cfgItem = backup.meta.find(item => item && item.id === "config");
            fp = cfgItem?.fingerprint || null;
        }

        if (fp) {
            localStorage.setItem("fp", fp);
        }

        return { success: true, error: null };

    } catch (e) {
        console.error("Restore operation failed during write:", e);
        return { success: false, error: `Failed to write data to database: ${e.message || String(e)}` };
    }
}

// ====================== SETUP BACKUP FOLDER ======================
async function setupBackupFolder() {
    if ('showDirectoryPicker' in window) {
        try {
            backupDirHandle = await window.showDirectoryPicker({
                mode: "readwrite",
                startIn: "documents"
            });

            const tx = db.transaction("meta", "readwrite");
            await tx.objectStore("meta").put({ id: "backupHandle", value: backupDirHandle });
            await tx.done;

            console.log("✅ Desktop: Persistent folder backup enabled");
            await backupUIAssets();
            return true;
        } catch (err) {
            console.warn("User cancelled folder picker", err);
            return false;
        }
    }

    console.log("📱 Mobile: Full silent folder backup not supported.");
    return false;
}

// ====================== MANUAL RESTORE FLOW ======================
async function manualRestoreFlow() {
    try {
        let fileHandle;

        if ('showOpenFilePicker' in window) {
            const [handle] = await window.showOpenFilePicker({
                types: [{
                    description: "Travis Finance Backup",
                    accept: { "application/json": [".json"] }
                }],
                multiple: false
            });
            fileHandle = handle;
        } else {
            alert("Your browser does not support file selection.");
            return { success: false, error: "File picker not supported" };
        }

        window.tempBackupFileHandle = fileHandle;

        const result = await restoreFromBackup();

        delete window.tempBackupFileHandle;

        if (result.success) {
            await rebuildUIFromDevice();
            await backupUIAssets();
            return { success: true };
        }
        return { success: false, error: "Restore failed" };

    } catch (err) {
        console.error("Restore flow error:", err);
        return { success: false, error: "User cancelled or error occurred" };
    }
}

// ====================== RECOVERY ON START - FIXED & RELIABLE ======================
async function runRecoveryOnStart() {
    const overlay = document.getElementById("recovery-overlay");
    if (!overlay) return;

    overlay.classList.add("hidden");

    // Load saved handle (if it still exists)
    try {
        const result = await getData("meta", "backupHandle");
        if (result?.value) backupDirHandle = result.value;
    } catch (e) {}

    const hasConfig = !!(await getData("meta", "config"));
    const hasFp = !!localStorage.getItem("fp");

    // === NORMAL HEALTHY STARTUP ===
    if (hasConfig && hasFp) {
        console.log("✅ Normal healthy startup - no recovery needed");
        return;
    }

    // === TRY TO REBUILD UI FROM DEVICE FIRST (even on full wipe if handle somehow survived) ===
    if (backupDirHandle) {
        console.log("🔄 Rebuilding UI from device files before showing recovery...");
        await rebuildUIFromDevice();
    }

    // === SHOW RECOVERY OVERLAY FOR ANY DATA LOSS (this is what was broken before) ===
    console.log("⚠️ Data loss / missing config/fp detected - showing recovery overlay");

    overlay.classList.remove("hidden");

    overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:system-ui,sans-serif;">
            <div style="background:white;border-radius:16px;max-width:460px;width:92%;box-shadow:0 25px 70px rgba(0,0,0,0.3);overflow:hidden;">
                <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:28px 24px;text-align:center;">
                    <h2 style="margin:0 0 8px 0;font-size:1.5rem;">🔒 Travis Guardian</h2>
                    <p style="margin:0;opacity:0.95;">Your Personal Financial Advisor</p>
                </div>
                <div style="padding:32px 28px;text-align:center;">
                    <div style="width:70px;height:70px;background:#f0f9ff;color:#1e40af;font-size:36px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;border:5px solid #e0f2fe;">📁</div>
                    <h3 style="margin:0 0 16px 0;font-size:1.35rem;color:#1e3a8a;">Restore Everything?</h3>
                    <p style="color:#475569;line-height:1.6;margin-bottom:28px;font-size:1.02rem;">
                        Browser data was cleared.<br>
                        Select your backup file to restore <strong>financial data + UI</strong>.
                    </p>
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <button id="restore-btn" style="background:#1e40af;color:white;border:none;padding:16px 24px;font-size:1.05rem;font-weight:600;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">📂 Select Backup File & Restore All</button>
                        <button id="skip-btn" style="background:transparent;color:#64748b;border:2px solid #cbd5e1;padding:14px 24px;font-size:1rem;font-weight:500;border-radius:10px;cursor:pointer;">Continue as New User</button>
                    </div>
                    <p style="margin:0;font-size:0.82rem;color:#64748b;">First-time users: choose “Continue as New User”</p>
                </div>
            </div>
        </div>
    `;

    const restoreBtn = document.getElementById("restore-btn");
    const skipBtn = document.getElementById("skip-btn");

    restoreBtn.replaceWith(restoreBtn.cloneNode(true));
    skipBtn.replaceWith(skipBtn.cloneNode(true));

    document.getElementById("restore-btn").onclick = async () => {
        const btn = document.getElementById("restore-btn");
        btn.disabled = true;
        btn.textContent = "Restoring data + UI...";

        const result = await manualRestoreFlow();

        if (result.success) {
            await backupUIAssets();
            overlay.innerHTML = `<div style="padding:50px;text-align:center;background:white;border-radius:16px;max-width:400px;"><p style="color:green;font-size:19px;">✅ Everything restored!<br>Reloading nice UI...</p></div>`;
            setTimeout(() => location.reload(), 1200);
        } else {
            overlay.innerHTML = `<div style="padding:30px;text-align:center;color:red;background:white;border-radius:16px;"><p>❌ ${result.error || "Restore failed"}</p><button onclick="location.reload()" style="margin-top:15px;padding:12px 24px;">Try Again</button></div>`;
        }
    };

    document.getElementById("skip-btn").onclick = () => overlay.classList.add("hidden");
};

// ====================== FINGERPRINT PROBE ======================
async function startFingerprintBackgroundProbe() {
    const tryRestoreFP = async () => {
        if (localStorage.getItem("fp")) return true;

        const config = await getData("meta", "config");
        if (config?.fingerprint) {
            localStorage.setItem("fp", config.fingerprint);
            return true;
        }
        return false;
    };

    setTimeout(() => tryRestoreFP(), 80);

    let attempts = 0;
    const interval = setInterval(async () => {
        attempts++;
        if (await tryRestoreFP() || attempts > 12) clearInterval(interval);
    }, 5000);
}

// ====================== INIT ======================
async function initDB() {
    return new Promise((resolve) => {
        const req = indexedDB.open("TravisGuardian_v1.0", 1);

        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains("meta")) d.createObjectStore("meta", { keyPath: "id" });
            if (!d.objectStoreNames.contains("tx")) d.createObjectStore("tx", { keyPath: "id" });
        };

        req.onsuccess = async (e) => {
            db = e.target.result;

            startFingerprintBackgroundProbe();
            await runRecoveryOnStart();

            resolve();
        };

        req.onerror = () => resolve();
    });
}

let travisMemory = {
    conversationCount: 0,
    lastQuestion: "",
    lastPurpose: "",
    lastVerdict: ""
};

function isObligation(spendDesc) {
    if (!state.obligations || state.obligations.length === 0) return false;
    return state.obligations.some(o => 
        spendDesc.toLowerCase().includes(o.label.toLowerCase())
    );
}

function getStatusSummary() {
    const fin = getFin();
    const risk = calculateInsolvencyRisk();
    return {
        cash: Math.round(fin.safeCash),
        dailyCap: Math.floor(fin.daily),
        daysRem: fin.daysRem,
        riskLabel: risk.label,
        riskColor: risk.color,
        riskScore: risk.score
    };
}

function updateLiveHud() {
    const amount = parseFloat(document.getElementById('tx-amount').value) || 0;
    const credit = document.getElementById('tx-credit').value;
    const fin = getFin();
    
    const projectedSafe = isLiquid(credit) ? fin.safeCash - amount : fin.safeCash;
    const newCap = projectedSafe / fin.daysRem;
    
    document.getElementById('hud-cap').innerText = `KSh ${newCap.toFixed(0)}`;
    document.getElementById('hud-cover').innerText = `KSh ${fin.pending.toLocaleString()} Reserved`;
    
    const warn = document.getElementById('hud-warning');
    if (isLiquid(credit) && amount > fin.daily) {
        warn.classList.remove('hidden');
    } else {
        warn.classList.add('hidden');
    }
}

function getFin() {
    const now = new Date();
    const daysRem = Math.max(1, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate());
    let liquid = 0;
    const cashAccs = state.user.type === 'personal' ? ["Cash", "M-Pesa"] : ["Bank/M-Pesa", "Petty Cash"];
    cashAccs.forEach(a => liquid += getBalance(a));

    const obsStatus = state.obligations.map(o => {
        let paid = 0;
        state.transactions.forEach(t => {
            const tDate = new Date(t.id);
            if (tDate.getMonth() === now.getMonth() && (t.desc.toLowerCase().includes(o.label.toLowerCase()) || t.credit === o.label)) {
                paid += t.amount;
            }
        });
        return { ...o, paid, pending: Math.max(0, o.amount - paid), variance: paid - o.amount };
    });

    const pending = obsStatus.reduce((a, b) => a + b.pending, 0);
    const safeCash = liquid - pending;
    return { liquid, pending, safeCash, daysRem, obsStatus, daily: safeCash / daysRem };
}

function calculateInsolvencyRisk() {
    const fin = getFin();
    const velocity = (function(){
        const now = new Date();
        const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7);
        let ts = 0;
        state.transactions.forEach(t => { if (new Date(t.id) >= weekAgo && isLiquid(t.credit)) ts += t.amount; });
        return ts / 7;
    })();

    if (velocity <= fin.daily) return { score: 5, label: "LOW", color: "#4ade80" };
    if (velocity > fin.daily && velocity < (fin.daily * 1.5)) return { score: 45, label: "MODERATE", color: "#eab308" };
    if (velocity >= (fin.daily * 1.5)) return { score: 85, label: "CRITICAL", color: "#ef4444" };
    return { score: 0, label: "UNDETERMINED", color: "#94a3b8" };
}

function handleAsk() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    const rawQ = input.value.trim();
    if (!rawQ) return;

    travisMemory.conversationCount++;
    travisMemory.lastQuestion = rawQ;

    const q = rawQ.toLowerCase().trim();
    const fin = getFin();
    const status = getStatusSummary();

    let amount = 0;
    const numMatch = q.match(/(\d+)(?:\s*(k|thousand|ksh))?/i);
    if (numMatch) {
        amount = parseFloat(numMatch[1]);
        if (numMatch[2]) amount *= 1000;
    }

    let category = "general";
    let isBasic = false;
    let isObligationFlag = isObligation(rawQ);

    const basicKeywords = ["rent", "food", "porridge", "school", "fees", "fuel", "transport", "transport & fuel", "utilities", "salary"];
    const luxuryKeywords = ["beer", "party", "club", "turn up", "shopping", "clothes", "shoes", "mall", "drink", "outing"];

    if (basicKeywords.some(k => q.includes(k)) || isObligationFlag) {
        isBasic = true;
        category = isObligationFlag ? "monthly obligation" : "basic need";
    }
    if (luxuryKeywords.some(k => q.includes(k))) {
        category = "luxury / secondary";
    }

    const overDaily = amount > status.dailyCap;
    const newDailyAfter = fin.daysRem > 0 ? Math.floor((fin.safeCash - amount) / fin.daysRem) : 0;
    const fallbackAmount = Math.floor(status.dailyCap * 0.7);

    let msg = `<div class="text-5xl mb-2"></div>`;
    msg += `<div class="text-[#4ade80] text-2xl mb-4">You asked: "${rawQ}"</div>`;

    if (amount > 0) {
        msg += `<div class="text-xl">You're considering spending KSh ${amount.toLocaleString()} on <span class="text-yellow-400">${category}</span>.</div>`;
    } else if (q.includes("how is") || q.includes("business") || q.includes("doing") || q.includes("status") || q.includes("habit")) {
        msg += `<div class="text-xl">Let me give you a quick read on your situation today...</div>`;
    } else {
        msg += `<div class="text-xl">Got it — let's talk money.</div>`;
    }

    let riskColor = status.riskColor;
    msg += `<div class="mt-4">Current status: <span style="color:${riskColor}">${status.riskLabel} RISK</span> • Daily cap: KSh ${status.dailyCap}</div>`;

    if (amount > 0) {
        let consequenceColor = "#4ade80";
        let consequence = "";
        let verdict = "";

        if (isObligationFlag || isBasic) {
            if (overDaily) {
                consequenceColor = "#eab308";
                consequence = `This is important, but it's above your daily cap (KSh ${status.dailyCap}). After this, you'd only have KSh ${newDailyAfter} per day left.`;
                verdict = `If I were you, I'd cap it at KSh ${fallbackAmount} today so you still have decent room for the next ${status.daysRem - 1} days.`;
            } else {
                consequence = `This fits inside your daily cap — safe for a necessary spend.`;
                verdict = `Go ahead. This is within reach.`;
            }
        } else { 
            if (overDaily) {
                consequenceColor = "#ef4444";
                consequence = `This is a luxury spend and it's well above your daily cap. After this, you'd be left with only KSh ${newDailyAfter} per day — tight squeeze.`;
                verdict = `Strong advice: don't do the full amount. If you really want it, limit to KSh ${fallbackAmount} today. Better to keep buffer for emergencies.`;
            } else {
                consequence = `It's within daily cap but it's not essential.`;
                verdict = `You can do it, but think twice — is it worth the pattern? Log it so we can watch.`;
            }
        }

        msg += `<div style="color:${consequenceColor}; margin-top:12px; font-weight:bold;">${consequence}</div>`;
        msg += `<div class="mt-6 text-2xl font-bold">${verdict}</div>`;
    } else if (q.includes("how is") || q.includes("business") || q.includes("doing") || q.includes("status")) {
        if (status.riskLabel === "LOW") {
            msg += `<div class="mt-6 text-2xl font-bold text-[#4ade80]">Business is looking stable today. No red flags — keep the same discipline and the next few days should stay calm.</div>`;
        } else if (status.riskLabel === "MODERATE") {
            msg += `<div class="mt-6 text-2xl font-bold text-[#eab308]">Yellow zone — things are okay but watch spending. Next 3 days look manageable if we stay disciplined.</div>`;
        } else {
            msg += `<div class="mt-6 text-2xl font-bold text-[#ef4444]">Tight right now. Next few days could be stressful unless we cut back hard.</div>`;
        }
    } else if (q.includes("habit") || q.includes("spending habit")) {
        msg += `<div class="mt-6 text-2xl font-bold">Your recent spending looks moderate — mostly within cap. But we've had a few lifestyle questions lately... let's tighten up a bit to stay green.</div>`;
    } else {
        msg += `<div class="mt-6 text-2xl font-bold">Everything still looks stable. Anything specific you want to plan for?</div>`;
    }

    if (travisMemory.conversationCount > 5 && Math.random() > 0.6) {
        msg += `<div class="mt-6 text-xs italic text-yellow-300">Noticing a pattern of spending questions... want me to lock in a weekly cap so we stay safer?</div>`;
    }

    box.innerHTML += `<div class="text-right"><span class="user-msg text-sm inline-block">${rawQ}</span></div>`;
    box.innerHTML += `<div class="text-left flex gap-2"><div class="text-[#4ade80] font-black text-[10px] mt-1">TRV:</div><span class="travis-msg text-sm inline-block">${msg}</span></div>`;

    input.value = "";
    box.scrollTop = box.scrollHeight;
}

function nav(view) {
    const port = document.getElementById('view-port');
    const fin = getFin();
    updateHeader(fin);

    if(view === 'dash') {
        const risk = calculateInsolvencyRisk();
        const leaks = fin.obsStatus.filter(o => o.variance > 0);
        
        port.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-4">
                    <div class="glass p-6 border-l-4" style="border-color: ${risk.color}">
                        <p class="text-[10px] opacity-40 uppercase tracking-widest">Insolvency Risk Score</p>
                        <h1 class="text-4xl font-black mb-3" style="color: ${risk.color}">${risk.label}</h1>
                        <div class="risk-heatmap overflow-hidden"><div class="bg-white/20 h-full" style="width: ${100 - risk.score}%"></div></div>
                        <p class="text-[9px] mt-2 opacity-50 italic">Based on 7D Velocity vs. Projected Ceiling.</p>
                    </div>

                    <div class="glass p-6 border-l-4 border-red-500 bg-red-950/10">
                        <p class="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-4">Leak Finder</p>
                        <div class="space-y-1">
                            ${leaks.length > 0 ? leaks.map(l => `<div class="flex justify-between border-b border-red-900/30 py-2"><span class="text-xs uppercase">${l.label}</span><span class="leak-red font-bold">+KSh ${l.variance.toLocaleString()}</span></div>`).join('') : '<p class="text-[10px] opacity-30 italic">No budget variances detected.</p>'}
                        </div>
                    </div>

                    <div class="glass p-6 border-l-4 border-[#4ade80]">
                        <p class="text-[10px] opacity-40 uppercase tracking-widest">Disposable Buffer</p>
                        <h1 class="text-4xl font-black">KSh ${fin.safeCash.toLocaleString()}</h1>
                    </div>
                </div>
                <div class="lg:col-span-2 glass p-6 neon-border relative min-h-[350px]">
                    <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Performance Analytics</h3>
                    <div class="h-[300px]"><canvas id="analyticsChart"></canvas></div>
                </div>
            </div>`;
        setTimeout(() => renderChart(), 100);
    }
    
    if(view === 'obs') {
        let rows = fin.obsStatus.map(o => `
            <div class="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800">
                <div><p class="font-bold uppercase">${o.label}</p><p class="text-[10px] opacity-40 uppercase">Budget: ${o.amount.toLocaleString()} | Spent: ${o.paid.toLocaleString()}</p></div>
                <div class="text-right">
                    <p class="${o.pending <= 0 ? 'text-green-400' : 'text-yellow-500'} font-black text-sm uppercase">${o.pending <= 0 ? 'Settled' : 'KSh ' + o.pending.toLocaleString()}</p>
                    ${o.variance > 0 ? `<p class="text-[9px] text-red-500 font-bold uppercase tracking-tighter">+${o.variance.toLocaleString()} OVER</p>` : ''}
                </div>
            </div>`).join('');
        port.innerHTML = `<div class="glass p-6 neon-border">
            <div class="flex justify-between items-center mb-6"><h3 class="text-2xl font-black uppercase italic">Mandatory Reserve</h3><button onclick="document.getElementById('setup-overlay').classList.remove('hidden')" class="text-[10px] border border-slate-700 px-2 py-1">EDIT LIST</button></div>
            ${rows || '<p class="opacity-30">No obligations.</p>'}
            <button onclick="factoryReset()" class="mt-20 text-red-900 text-[10px] font-bold uppercase tracking-widest hover:text-red-500">Full System Wipe</button>
        </div>`;
    }

    if(view === 'ask') {
        port.innerHTML = `<div class="max-w-4xl glass p-6 mx-auto flex flex-col h-[550px] neon-border">
            <div id="chat-box" class="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 flex flex-col">
                <div class="travis-msg text-xs italic">Probability Engine and Leak Finder active. How can I protect your capital?</div>
            </div>
            <div class="flex gap-2 p-2 bg-slate-900 border-2 border-slate-800">
                <input id="chat-input" type="text" placeholder="Consult Travis..." class="flex-1 p-4 bg-transparent border-none">
                <button onclick="handleAsk()" class="bg-[#4ade80] text-black px-8 font-black rounded uppercase">Send</button>
            </div>
        </div>`;
        document.getElementById('chat-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') handleAsk(); });
    }

    if(view === 'book') {
        let rows = state.transactions.map(t => {
            const amountStr = t.amount.toLocaleString();
            return `
                <tr class="border-b border-slate-800 text-sm hover:bg-slate-900/50 transition-colors">
                    <td class="p-4 opacity-40 font-bold text-[10px]">
                        ${new Date(t.id).toLocaleDateString('en-KE')}
                    </td>
                    <td class="p-4">
                        <div class="font-black italic uppercase text-slate-200">${t.desc}</div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[9px] bg-green-900/30 text-green-400 px-1 rounded font-bold">${t.debit}</span>
                            <span class="text-[9px] opacity-30">←</span>
                            <span class="text-[9px] bg-red-900/30 text-red-400 px-1 rounded font-bold">${t.credit}</span>
                        </div>
                    </td>
                    <td class="p-4 text-right text-green-400 font-black tracking-tighter">
                        +${amountStr}
                    </td>
                    <td class="p-4 text-right text-red-400 font-black tracking-tighter">
                        -${amountStr}
                    </td>
                </tr>`;
        }).join('');

        port.innerHTML = `
            <div class="glass overflow-hidden rounded-xl border border-slate-800">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900/80 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <th class="p-4 border-b border-slate-800">Date</th>
                            <th class="p-4 border-b border-slate-800">Transaction Details</th>
                            <th class="p-4 border-b border-slate-800 text-right">Debit (+)</th>
                            <th class="p-4 border-b border-slate-800 text-right">Credit (-)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows || '<tr><td colspan="4" class="p-10 text-center opacity-30 italic font-bold uppercase tracking-widest">No entries found in the archives.</td></tr>'}
                    </tbody>
                </table>
            </div>`;
    }
}

function renderChart() {
    const ctx = document.getElementById('analyticsChart')?.getContext('2d');
    if (!ctx) return;
    const fin = getFin();
    const now = new Date();
    let labels = []; let spendData = []; let revData = []; let capData = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString('en-KE', { weekday: 'short' }));
        let ds = 0, dr = 0;
        state.transactions.forEach(t => {
            if (new Date(t.id).toDateString() === d.toDateString()) {
                if (isLiquid(t.credit)) ds += t.amount;
                if (isLiquid(t.debit)) dr += t.amount;
            }
        });
        spendData.push(ds); revData.push(dr); capData.push(fin.daily);
    }

    if (window.travisChart) window.travisChart.destroy();
    window.travisChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'CEILING', data: capData, borderColor: '#3b82f6', borderDash: [5, 5], pointRadius: 0, fill: false },
                { label: 'SPEND', data: spendData, borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.4 },
                { label: 'REVENUE', data: revData, borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)', fill: true, tension: 0.4 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } } }
    });
}

function updateHeader(fin) {
    const grid = document.getElementById('dashboard-grid');
    grid.innerHTML = `
        <div class="glass p-4 border-l-4 border-blue-500"><p class="text-[10px] opacity-40 uppercase">Total Liquid</p><p class="text-xl font-bold">KSh ${fin.liquid.toLocaleString()}</p></div>
        <div class="glass p-4 border-l-4 border-red-500"><p class="text-[10px] opacity-40 uppercase">Reserved Bills</p><p class="text-xl font-bold">KSh ${fin.pending.toLocaleString()}</p></div>
        <div class="glass p-4 border-l-4 border-[#4ade80]"><p class="text-[10px] opacity-40 uppercase">Survival Window</p><p class="text-xl font-bold">${fin.daysRem} Days</p></div>
        <div class="glass p-4 border-l-4 border-purple-500"><p class="text-[10px] opacity-40 uppercase">Daily Ceiling</p><p class="text-xl font-bold">KSh ${Math.max(0, fin.daily).toFixed(0)}</p></div>
    `;
    const v = document.getElementById('header-verdict');
    v.innerText = fin.safeCash < 0 ? "⚠️ INSOLVENT" : "🛡️ SYSTEM STABLE";
    v.className = fin.safeCash < 0 ? "px-4 py-2 border-2 border-red-500 text-red-500 rounded font-black animate-pulse" : "px-4 py-2 border-2 border-[#4ade80] text-[#4ade80] rounded font-black";
}

function isLiquid(acc) { return ["Cash", "M-Pesa", "Bank/M-Pesa", "Petty Cash"].includes(acc); }

function getBalance(acc) {
    let balance = 0;
    state.transactions.forEach(t => {
        if(t.debit === acc) balance += t.amount;
        if(t.credit === acc) balance -= t.amount;
    });
    const assetTypes = ["Cash", "M-Pesa", "Bank/M-Pesa", "Petty Cash", "Inventory", "Stock", "Tools"];
    return assetTypes.includes(acc) ? balance : -balance;
}



function showTxModal() {
    const d = document.getElementById('tx-debit');
    const c = document.getElementById('tx-credit');
    d.innerHTML = c.innerHTML = "";

    const isPersonal = state.user.type === 'personal';

    const createColoredOptgroup = (label, color, accounts) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = `● ${label}`; 
        optgroup.style.color = color;    

        accounts.forEach(account => {
            const option = new Option(account, account);
            optgroup.appendChild(option);
        });
        return optgroup;
    };

    if (isPersonal) {
        const personalSelect = (select) => {
            select.appendChild(createColoredOptgroup("ASSETS (Money you have)", "#22c55e", [
                "Cash", "M-Pesa", "Bank Account", "Savings Account"
            ]));

            select.appendChild(createColoredOptgroup("INCOME (Money coming in - GOOD!)", "#22c55e", [
                "Salary", "Freelance / Side Hustle", "Gifts / Allowance", 
                "Interest / Dividends", "Other Income"
            ]));

            select.appendChild(createColoredOptgroup("NECESSARY EXPENSES (Must pay)", "#d97706", [  
                "Food & Groceries", "Rent / Housing", "Bills / Utilities", 
                "Transport", "Health / Medical", "Education / School"
            ]));

            select.appendChild(createColoredOptgroup("AVOIDABLE EXPENSES (Can cut back)", "#ef4444", [  
                "Party / Entertainment", "Shopping / Clothes", "Travel (fun)", 
                "Other Fun Spending"
            ]));

            select.appendChild(createColoredOptgroup("LIABILITIES & TRANSFERS", "#3b82f6", [  
                "Loan Repayment", "Credit Card Payment"
            ]));
        };

        personalSelect(d);
        personalSelect(c);
    } 
    else {
        const businessSelect = (select) => {
            select.appendChild(createColoredOptgroup("ASSETS (What the business owns)", "#22c55e", [
                "Bank / M-Pesa", "Petty Cash", "Accounts Receivable", 
                "Inventory", "Fixed Assets"
            ]));

            select.appendChild(createColoredOptgroup("REVENUE (Money coming in - GOOD!)", "#22c55e", [
                "Sales Revenue", "Service Revenue", "Other Revenue"
            ]));

            select.appendChild(createColoredOptgroup("NECESSARY OPERATING EXPENSES", "#d97706", [
                "Rent", "Payroll", "Utilities", "Cost of Goods Sold", 
                "Tax", "Office Supplies"
            ]));

            select.appendChild(createColoredOptgroup("DISCRETIONARY / AVOIDABLE EXPENSES", "#ef4444", [
                "Marketing", "Travel & Entertainment", "Professional Fees (if not critical)"
            ]));

            select.appendChild(createColoredOptgroup("LIABILITIES & TRANSFERS", "#3b82f6", [
                "Accounts Payable", "Loans Payable"
            ]));
        };

        businessSelect(d);
        businessSelect(c);
    }

    document.getElementById('tx-modal').classList.remove('hidden');
    updateLiveHud();
}


async function commitTransaction() {
    const amt = parseFloat(document.getElementById('tx-amount').value);
    const debitAcc = document.getElementById('tx-debit').value;
    const creditAcc = document.getElementById('tx-credit').value;
    const description = document.getElementById('tx-desc').value || "Market Exchange";

    if(debitAcc === creditAcc || isNaN(amt) || amt <= 0) {
        return showCustomAlert("Strategy Error:<br><br> A transaction must move value between two different accounts.");
    }

    const tx = { 
        id: Date.now(), 
        debit: debitAcc, 
        credit: creditAcc, 
        amount: amt, 
        desc: description 
    };

    state.transactions.unshift(tx);
       await saveData("tx", tx);
    
    if (typeof saveBackup === "function") {
        await saveBackup();

        if (!backupDirHandle) {
            await setupBackupFolder();
        }
    }

    closeTxModal();
    nav('dash');
}

function addObligationRow(label = "", val = "") {
    const div = document.createElement('div');
    div.className = "flex gap-2";
    div.innerHTML = `<input type="text" placeholder="Rent" value="${label}" class="flex-1 p-2 text-sm"><input type="number" placeholder="KSh" value="${val}" class="w-24 p-2 text-sm"><button onclick="this.parentElement.remove()" class="text-red-500 font-bold">×</button>`;
    document.getElementById('obligation-list').appendChild(div);
}

function setUserType(t) {
    state.tempType = t;
    document.getElementById('btn-p').style.borderColor = t==='personal'?'#4ade80':'#334155';
    document.getElementById('btn-b').style.borderColor = t==='business'?'#4ade80':'#334155';
}

async function finalizeSetup() {
    const name = document.getElementById('user-name').value;
    const obs = Array.from(document.querySelectorAll('#obligation-list > div')).map(row => ({
        label: row.querySelectorAll('input')[0].value,
        amount: parseFloat(row.querySelectorAll('input')[1].value) || 0
    })).filter(o => o.label);
    if(!name || !state.tempType) return showCustomAlert("System requires ID.");
    state.user = { name, type: state.tempType };
    state.obligations = obs;
    await saveData("meta", { id: "config", user: state.user, obligations: state.obligations });
    
    if (typeof saveBackup === "function") {
        await saveBackup();
    }
    
    location.reload();
}

async function factoryReset() {
    if(confirm("Confirm system purge? All financial history will be deleted.")) {
        indexedDB.deleteDatabase("TravisGuardian_v5_8");
        location.reload();
    }
}

async function boot() {

    startFingerprintBackgroundProbe();

    await initDB();
    const meta = await getData("meta", "config");
    if(meta) {
        state.user = meta.user;
        state.obligations = meta.obligations;
        state.transactions = (await getAllData("tx")).sort((a,b) => b.id - a.id);
        document.getElementById('display-name').innerText = state.user.name;
        document.getElementById('display-mode').innerText = state.user.type + " STRATEGY ENGINE";
        nav('dash');
    } else {
        document.getElementById('setup-overlay').classList.remove('hidden');
    }
}

async function saveData(s, d) { const t = db.transaction(s, "readwrite"); t.objectStore(s).put(d); return new Promise(res => t.oncomplete = res); }
async function getData(s, k) { const t = db.transaction(s, "readonly"); const r = t.objectStore(s).get(k); return new Promise(res => r.onsuccess = () => res(r.result)); }
async function getAllData(s) { const t = db.transaction(s, "readonly"); const r = t.objectStore(s).getAll(); return new Promise(res => r.onsuccess = () => res(r.result)); }
function closeTxModal() { document.getElementById('tx-modal').classList.add('hidden'); document.getElementById('tx-amount').value = ""; }

window.onload = boot;


async function boot() {
  await initDB();
  let meta = await getData("meta", "config") || { activated: false };

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       navigator.standalone === true;

  await new Promise(r => setTimeout(r, 800));

  if (!meta.activated) {
    if (isStandalone) {
      document.getElementById('activation-overlay').classList.remove('hidden');
      document.getElementById('install-overlay').classList.add('hidden');
      document.getElementById('app').classList.add('hidden');
    } else {
      document.getElementById('install-overlay').classList.remove('hidden');
      document.getElementById('activation-overlay').classList.add('hidden');
      document.getElementById('app').classList.add('hidden');
    }
  } else if (!meta.user) {
    document.getElementById('setup-overlay').classList.remove('hidden');
    document.getElementById('install-overlay').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
  } else {
    state.user = meta.user;
    state.obligations = meta.obligations;
    state.transactions = (await getAllData("tx")).sort((a,b) => b.id - a.id);
    document.getElementById('display-name').innerText = state.user.name;
    document.getElementById('display-mode').innerText = state.user.type + " STRATEGY ENGINE";
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('install-overlay').classList.add('hidden');
    document.getElementById('setup-overlay').classList.add('hidden');
    nav('dash');
  }
}

document.getElementById('install-btn')?.addEventListener('click', triggerInstall);


window.onload = boot;
