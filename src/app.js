// 데이터베이스 연결
const sequelize = require('src/global/config/database');

// 모델 불러오기
const User = require('src/user/domain/user');
const TimeTable = require('src/timetable/domain/timetable');
const Schedule = require('src/schedule/domain/schedule');

// 데이터베이스 동기화
sequelize.sync({ force: false })
   .then(() => {
      // 모델 관계 설정
      TimeTable.hasMany(Schedule, { foreignKey: 'time_table_id' });
      Schedule.belongsTo(TimeTable, { foreignKey: 'time_table_id' });
      console.log('데이터베이스 연결 성공.');
   })
   .catch((err) => {
      console.error('데이터베이스 연결 에러.', err);
   });

// 서버 설정
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors(
   origin = '*'
));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: false
}));

// 라우터 설정
app.use('/api/timetable', require('src/timetable/route/timetableRouter'));
app.use('/api/auth', require('src/auth/route/authRouter'));
app.use('/api/users', require('src/user/route/userRouter'));
app.use('/api/schedule', require('src/schedule/route/scheduleRouter'));

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
   if (err instanceof BusinessError) {
      return res.status(err.code).send(err.message);
   }
   console.error(err);
   res.status(500).send('내부 서버 오류');
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
});