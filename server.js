const express = require('express');
const path = require('path');
const fs = require('fs'); // for logging fingerprints to file

const app = express();
const PORT = 3000;   // ← change this if you want

// Middleware to parse JSON bodies (needed for POST requests)
app.use(express.json());

// Serve all static files from the current directory (where server.js lives)
app.use(express.static(__dirname));

// Optional: make sure / or /index.html always serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route → also serves index.html (good for single-page apps or testing)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ================== DECRYPT FUNCTION (mirror of client-side encrypt) ==================
function decryptFingerprint(encryptedBase64) {
    const key = "TRAVIS-GUARDIAN-SECURE-2026-x7k9";   // ← MUST MATCH THE CLIENT-SIDE KEY exactly
    let encrypted;
    try {
        encrypted = atob(encryptedBase64);
    } catch (e) {
        console.error('Invalid base64 in encrypted data');
        return null;
    }

    let fp = '';
    for (let i = 0; i < encrypted.length; i++) {
        fp += String.fromCharCode(
            encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return fp;
}

// ================== ACTIVATION ENDPOINT (NOW DECRYPTS) ==================
app.post('/activate-fingerprint', (req, res) => {
    const { data, ts, buyerInfo } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'No encrypted data provided' });
    }

    // Decrypt the fingerprint
    const fingerprint = decryptFingerprint(data);

    if (!fingerprint) {
        console.warn(`[${new Date().toISOString()}] Decryption failed for payload`);
        return res.status(400).json({ error: 'Invalid encrypted data' });
    }

    // Log to console (you see this in terminal)
    console.log(`[${new Date().toISOString()}] New fingerprint received`);
    console.log(`Fingerprint: ${fingerprint}`);
    if (buyerInfo) console.log(`Buyer info: ${buyerInfo}`);
    if (ts) console.log(`Client timestamp: ${new Date(ts).toISOString()}`);

    // Log to file (persistent record)
    const logEntry = `${new Date().toISOString()} | FP: ${fingerprint} | Buyer: ${buyerInfo || 'unknown'} | TS: ${ts || 'none'}\n`;
    fs.appendFile('fingerprints.log', logEntry, (err) => {
        if (err) console.error('Failed to write log:', err);
    });

    // Send back success response (app will show activation field)
    res.json({ 
        status: 'received', 
        message: 'Fingerprint logged. Seller will send activation code soon.',
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Open your browser and go to: http://localhost:3000');
  console.log('Fingerprints will be logged to fingerprints.log in this folder');
});