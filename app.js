require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors(
   origin = '*'
));

app.use('/timetable', require('./routes/timetable'));

const PORT = 3000;
app.listen(PORT, () => {
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
})