const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let validKeys = new Set();

// Tạo key mới dạng: Giachuot_xxxxx
app.get('/generate-key', (req, res) => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    const newKey = "Giachuot_" + randomNum;
    validKeys.add(newKey);
    res.json({ key: newKey });
});

// Kiểm tra key
app.get('/check-key', (req, res) => {
    const userKey = req.query.key;
    if (validKeys.has(userKey)) {
        validKeys.delete(userKey); // Xóa ngay sau khi dùng
        res.send("true");
    } else {
        res.send("false");
    }
});

//app.listen(PORT, () => console.log('Server is running!'));
       module.exports = app;               
