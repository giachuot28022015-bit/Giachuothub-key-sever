const express = require('express');
const app = express();

const validKeys = new Map();

// API tạo key: Key có thời hạn 3 ngày (259200 giây)
app.get('/api/generate-key', (req, res) => {
    const key = "Giachuot_" + Math.floor(Math.random() * 90000 + 10000);
    const expiryTime = Date.now() + (259200 * 1000); 
    validKeys.set(key, expiryTime);
    res.json({ key: key });
});

// API kiểm tra key: Kiểm tra xem key còn hạn và tồn tại không
app.get('/api/check-key', (req, res) => {
    const key = req.query.key;
    const now = Date.now();

    if (validKeys.has(key)) {
        const expiry = validKeys.get(key);
        if (now < expiry) {
            // Sau khi kiểm tra đúng, xóa key để người khác không dùng lại
            validKeys.delete(key); 
            res.send("true");
        } else {
            // Key hết hạn
            validKeys.delete(key);
            res.send("false");
        }
    } else {
        // Key không tồn tại
        res.send("false");
    }
});

module.exports = app;
        
