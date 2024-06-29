// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 날짜 포맷을 원하는 형식으로 변환하는 함수
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${month}월 ${day}일`;
}

// 서버에서 메뉴 데이터를 가져오는 함수
function fetchMenu(date) {
    fetch(`/api/menu/${date}`)
        .then(response => response.json())
        .then(data => {
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = ''; // 기존 메뉴를 지우고

            data.menu.forEach(item => {
                const menuItem = document.createElement('p');
                menuItem.className = 'text-main';
                menuItem.textContent = item;
                menuList.appendChild(menuItem);
            });

            document.getElementById('current-date').textContent = formatDate(date);
        })
        .catch(error => console.error('Error fetching menu:', error));
}

// 이전 날짜를 선택하는 함수
function getPrevDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

// 다음 날짜를 선택하는 함수
function getNextDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

// 서버에서 현재 날짜를 가져오는 함수
function fetchCurrentDate() {
    return fetch('/api/current-date')
        .then(response => response.json())
        .then(data => data.currentDate);
}

// 초기화 함수
function init() {
    fetchCurrentDate().then(currentDate => {
        fetchMenu(currentDate);

        document.getElementById('prev-day').addEventListener('click', () => {
            currentDate = getPrevDay(currentDate);
            fetchMenu(currentDate);
        });

        document.getElementById('next-day').addEventListener('click', () => {
            currentDate = getNextDay(currentDate);
            fetchMenu(currentDate);
        });
    });
}

// DOMContentLoaded 이벤트가 발생하면 init 함수 실행
document.addEventListener('DOMContentLoaded', init);
