const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let activeKeys = new Set();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GiaChuot Hub Key Generator</title>
            <style>
                body { background: #121212; color: #fff; font-family: sans-serif; text-align: center; padding-top: 100px; }
                button { padding: 12px 24px; font-weight: bold; background: #ffaa00; border: none; cursor: pointer; border-radius: 5px; font-size: 16px; }
                button:hover { background: #e09600; }
                h2 { margin-top: 25px; color: #ffaa00; letter-spacing: 1px; font-family: monospace; }
            </style>
        </head>
        <body>
            <h1>🐹 GIACHUOT HUB KEY SYSTEM 🐹</h1>
            <p>Bấm nút bên dưới để nhận mã xác thực ngẫu nhiên từ hệ thống:</p>
            <button onclick="getKey()">⚡ TẠO KEY NGẪU NHIÊN</button>
            <h2 id="key-display">---</h2>
            <script>
                function getKey() {
                    fetch('/generate-key')
                        .then(res => res.json())
                        .then(data => {
                            document.getElementById('key-display').innerText = data.key;
                        });
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/generate-key', (req, res) => {
    let randomKey = "GC_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    activeKeys.add(randomKey); 
    res.json({ key: randomKey });
});

app.get('/check-key', (req, res) => {
    let userKey = req.query.key;
    if (activeKeys.has(userKey)) {
        res.send("true"); 
    } else {
        res.send("false"); 
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
