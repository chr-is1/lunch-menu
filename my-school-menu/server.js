const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// 나이스 API 호출 함수
async function fetchMenuFromAPI(date) {
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?key=09688b9dfd7f46c1adce51e6ea9ea401&type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531379&MLSV_FROM_YMD=20240624&MLSV_TO_YMD=20240731`;
    const params = {
        schoolCode: '7531379',
        areaCode: 'J10',
        mealDate: date
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    if (!response.ok) {
        throw new Error('Failed to fetch menu data');
    }
    const data = await response.json();
    return data;
}

// API 엔드포인트
app.get('/api/menu/:date', async (req, res) => {
    const date = req.params.date;
    
    try {
        // 나이스 API를 통해 데이터 가져오기
        const apiData = await fetchMenuFromAPI(date);
        const menu = apiData.menu || []; // 실제 API 응답에서 메뉴 데이터 추출
        
        // 메뉴 데이터가 없을 경우 기본값 설정
        if (menu.length === 0) {
            menu.push('메뉴 정보가 없습니다.');
        }

        // 클라이언트에게 JSON 형식으로 응답 보내기
        res.json({ menu });
    } catch (error) {
        console.error('Error fetching menu:', error.message);
        res.status(500).json({ error: 'Failed to fetch menu data' });
    }
});

// 정적 파일 서빙
app.use(express.static('public'));

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
