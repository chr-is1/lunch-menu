Add-Content server.js @"
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const menuData = {
    '2024-06-20': ['Âý½Ò ºñºö¹ä', '¹Ì¿ª µÈÀå±¹', '²Ê¹è±â ¹«Ä§', 'µþ±â ±èÄ¡'],
    '2024-06-21': ['±èÄ¡ººÀ½¹ä', 'µÈÀåÂî°³', '°è¶õ¸»ÀÌ', '±ïµÎ±â'],
    // Ãß°¡ µ¥ÀÌÅÍ
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu/:date', (req, res) => {
    const date = req.params.date;
    const menu = menuData[date] || ['¸Þ´º Á¤º¸°¡ ¾ø½À´Ï´Ù.'];
    res.json({ menu });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"@