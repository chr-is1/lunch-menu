const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = '09688b9dfd7f46c1adce51e6ea9ea401';
const AREA_CODE = 'J10'; 
const SCHOOL_CODE = '7531379';

// 현재 날짜를 YYYYMMDD 형식으로 반환하는 함수
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 날짜 포맷을 원하는 형식으로 변환하는 함수
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${year}${month}${day}`;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu/:date', async (req, res) => {
    const date = formatDate(req.params.date);

    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${AREA_CODE}&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=${date}`;
    
    try {
        const response = await axios.get(url);
        const menuData = response.data.mealServiceDietInfo[1].row.map(item => item.DDISH_NM);
        res.json({ menu: menuData });
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ menu: ['메뉴 정보를 가져오는 중 오류가 발생했습니다.'] });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
