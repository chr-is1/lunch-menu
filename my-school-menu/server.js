const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const menuData = {
    '2024-06-20': ['찹쌀 비빔밥', '미역 된장국', '꽈배기 무침', '딸기 김치'],
    '2024-06-21': ['김치볶음밥', '된장찌개', '계란말이', '깍두기']
    // 추가 데이터
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu/:date', (req, res) => {
    const date = req.params.date;
    const menu = menuData[date] || ['메뉴 정보가 없습니다.'];
    res.json({ menu });
});

// 현재 날짜를 반환하는 엔드포인트
app.get('/api/current-date', (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    res.json({ currentDate });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
