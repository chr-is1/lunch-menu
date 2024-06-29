Add-Content server.js @"
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const menuData = {
    '2024-07-01': ['여기에', '그 날', '급식 메뉴', '적어두기'],
    '2024-07-02': ['김치볶음밥', '된장찌개', '계란말이', '깍두기'],
    // 추가 데이터
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu/:date', (req, res) => {
    const date = req.params.date;
    const menu = menuData[date] || ['메뉴 정보가 없습니다.'];
    res.json({ menu });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"@
