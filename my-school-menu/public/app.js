// ���� ��¥�� YYYY-MM-DD �������� ��ȯ�ϴ� �Լ�
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ��¥ ������ ���ϴ� �������� ��ȯ�ϴ� �Լ�
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${month}�� ${day}��`;
}

// �������� �޴� �����͸� �������� �Լ�
function fetchMenu(date) {
    fetch(`/api/menu/${date}`)
        .then(response => response.json())
        .then(data => {
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = ''; // ���� �޴��� �����

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

// ���� ��¥�� �����ϴ� �Լ�
function getPrevDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

// ���� ��¥�� �����ϴ� �Լ�
function getNextDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

// �ʱ�ȭ �Լ�
function init() {
    let currentDate = getCurrentDate();
    fetchMenu(currentDate);

    document.getElementById('prev-day').addEventListener('click', () => {
        currentDate = getPrevDay(currentDate);
        fetchMenu(currentDate);
    });

    document.getElementById('next-day').addEventListener('click', () => {
        currentDate = getNextDay(currentDate);
        fetchMenu(currentDate);
    });
}

// DOMContentLoaded �̺�Ʈ�� �߻��ϸ� init �Լ� ����
document.addEventListener('DOMContentLoaded', init);