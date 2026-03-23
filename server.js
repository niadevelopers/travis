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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function decryptFingerprint(encryptedBase64) {
    const key = "TRAVIS-GUARDIAN-SECURE-2026-x7k9";   
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

app.post('/activate-fingerprint', (req, res) => {
    const { data, ts, buyerInfo } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'No encrypted data provided' });
    }

    const fingerprint = decryptFingerprint(data);

    if (!fingerprint) {
        console.warn(`[${new Date().toISOString()}] Decryption failed for payload`);
        return res.status(400).json({ error: 'Invalid encrypted data' });
    }

    console.log(`[${new Date().toISOString()}] New fingerprint received`);
    console.log(`Fingerprint: ${fingerprint}`);
    if (buyerInfo) console.log(`Buyer info: ${buyerInfo}`);
    if (ts) console.log(`Client timestamp: ${new Date(ts).toISOString()}`);

    const logEntry = `${new Date().toISOString()} | FP: ${fingerprint} | Buyer: ${buyerInfo || 'unknown'} | TS: ${ts || 'none'}\n`;
    fs.appendFile('fingerprints.log', logEntry, (err) => {
        if (err) console.error('Failed to write log:', err);
    });

    res.json({ 
        status: 'received', 
        message: 'Fingerprint logged. Seller will send activation code soon.',
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Open your browser and go to: http://localhost:3000');
});
