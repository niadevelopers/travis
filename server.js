const express = require('express');
const path = require('path');
const fs = require('fs'); // ← NEW: for logging fingerprints to file

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

// ================== NEW: ACTIVATION ENDPOINT ==================
app.post('/activate-fingerprint', (req, res) => {
    const { fingerprint, buyerInfo } = req.body;

    if (!fingerprint) {
        return res.status(400).json({ error: 'No fingerprint provided' });
    }

    // Log to console (you see this in terminal)
    console.log(`[${new Date().toISOString()}] New fingerprint received`);
    console.log(`Fingerprint: ${fingerprint}`);
    if (buyerInfo) console.log(`Buyer info: ${buyerInfo}`);

    // Log to file (persistent record)
    const logEntry = `${new Date().toISOString()} | FP: ${fingerprint} | Buyer: ${buyerInfo || 'unknown'}\n`;
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
