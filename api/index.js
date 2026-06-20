const express = require('express');
const app = express();

// Route chính để tạo key
app.get('/api/generate-key', (req, res) => {
    // Tạo key ngẫu nhiên
    const key = "Giachuot_" + Math.floor(Math.random() * 90000 + 10000);
    
    // Trả về dữ liệu dạng JSON cho trình duyệt
    res.json({ key: key });
});

// Chỉ xuất app ra là xong, không cần app.listen hay cấu hình phức tạp
module.exports = app;
    
