const express = require('express');
const app = express();

// Bộ nhớ tạm để lưu Key
const validKeys = new Set();

// API tạo key
app.get('/api/generate-key', (req, res) => {
    const key = "Giachuot_" + Math.floor(Math.random() * 90000 + 10000);
    validKeys.add(key);
    res.json({ key: key });
});

// API kiểm tra key
app.get('/api/check-key', (req, res) => {
    const key = req.query.key;
    if (validKeys.has(key)) {
        validKeys.delete(key);
        res.send("true");
    } else {
        res.send("false");
    }
});

module.exports = app;
