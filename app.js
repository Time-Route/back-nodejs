require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const sequelize = require('./config/database');

// TODO : 모델 직접 추가
const User = require('./models/user');
const TimeTable = require('./models/timetable');
const Schedule = require('./models/schedule');

sequelize.sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공.');
   })
   .catch((err) => {
      console.error('데이터베이스 연결 에러.', err);
   });

const app = express();

app.use(cors(
   origin = '*'
));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: false
}));

app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/schedule', require('./routes/schedule'));

const PORT = 3000;
app.listen(PORT, () => {
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
})