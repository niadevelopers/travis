const express = require('express');
const path = require('path');
const fs = require('fs'); 
const cors = require('cors');

const app = express();
const PORT = 3000;  

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function decryptFingerprint(encryptedBase64) {
    const key = "TRAVIS-GUARDIAN-SECURE-2026-x7k9";
    let decoded;
    try {
        decoded = Buffer.from(encryptedBase64, 'base64').toString('binary');
    } catch {
        return null;
    }

    let fp = '';
    for (let i = 0; i < decoded.length; i++) {
        fp += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return fp;
}

function randomHex(len = 8) {
    const bytes = new Uint8Array(len / 2);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2,'0')).join('').toUpperCase();
}

app.post('/activate-fingerprint', (req, res) => {
    const { data, ts, buyerInfo } = req.body || {};

    if (!data) return res.status(400).json({ error: 'Missing data' });

    const fp = decryptFingerprint(data);
    if (!fp) return res.status(400).json({ error: 'Invalid data' });

    const nonce = randomHex(8);

    const logLine = [
        new Date().toISOString(),
        `FP: ${fp}`,
        `NONCE: ${nonce}`,
        `UA: ${buyerInfo || 'unknown'}`,
        `Client-TS: ${ts ? new Date(ts).toISOString() : 'none'}`
    ].join(' | ');

    console.log(logLine);

    fs.appendFile('fingerprints.log', logLine + '\n', err => {
        if (err) console.error('Log write failed', err);
    });

    res.json({
        status: 'received',
        nonce: nonce,
        message: 'Request logged — wait for admin code'
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
