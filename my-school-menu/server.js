Add-Content server.js @"
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const menuData = {
    '2024-06-20': ['���� �����', '�̿� ���屹', '�ʹ�� ��ħ', '���� ��ġ'],
    '2024-06-21': ['��ġ������', '�����', '�������', '��α�'],
    // �߰� ������
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu/:date', (req, res) => {
    const date = req.params.date;
    const menu = menuData[date] || ['�޴� ������ �����ϴ�.'];
    res.json({ menu });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"@