require('dotenv').config();

const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize('timeroute', 'root', process.env.DB_PASSWORD, {
   host: 'localhost',
   dialect: 'mysql'
});

const User=sequelize.define('users', {
   id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true 
   },
   name: {
      type: DataTypes.TEXT
   },
   userid: {
      type: DataTypes.TEXT
   },
   password: {
      type: DataTypes.TEXT
   }
}, {
   timestamps: false
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, cookie: {secure: false, masAge:60000} })); //쿠키 설정

app.get('/', (req, res) => {
   res.send("Hello time_route login!");
});

// users squelize 인스턴스 보기
app.get('/users', async (req, res) => {
   try {
      // TimeTable 모델을 사용하여 time_table 데이터를 조회합니다.
      const usersData = await User.findAll();
      // 데이터를 JSON 형식으로 응답합니다.
      res.json(usersData);
   } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching timetable data.');
   }
});

// 회원가입 라우트 (나중에 get, post 나누기)
app.get('/register', async (req, res) => {
	const {name, userid, password} = req.query;
   const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
	
   console.log(name, userid, hashedPassword);

   try {
      // name, userid, password 모두 입력했는지 확인
      if(name&&userid&&password){
         const existingUser = await User.findOne({ where: { userid }});
         // 사용자 입력이 이미 테이블에 있는지 확인
         if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
         }
         const newUser = await User.create({name, userid, password: hashedPassword});
         res.json({ message: "User added successfully", user: newUser});
         
      } 
      else {
         res.send('Please enter User Information!');
         res.end();
      }
   }
   catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// 로그인 라우트 (나중에 get, post 나누기)
app.get('/login', async(req, res) => {
   const {userid, password} = req.query;

   try {
      const user = await User.findOne({where: {userid}});
      //id확인
      if(!user) {
         return res.status(401).json({ error: 'Invalid userid or password' });
      }

      const passwordmatch = await bcrypt.compare(password, user.password);
      if(!passwordmatch) {
         return res.status(401).json({ error: 'Invalid userid or password' });
      }

      req.session.userId = user.id; //세션에 사용자 id 저장
      
      //클라이언트에 쿠키 설정; isLoggedIn (로그인 상태 확인 쿠키) ***만들어진거 확인 우째함???
      res.cookie('isLoggedIn', true, {maxAge: 60000, httpOnly: true}); 

      res.json({message: 'Login successful', user});
   }
   catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// 사용자 인증 미들웨어
const authenticateUser = (req, res, next) => {
   if (req.session.userId) {
     next(); // 다음 미들웨어로 진행
   } else {
     res.status(401).json({ error: 'Unauthorized' });
   }
 };
 
 // 보호된 라우트 - 로그인 후에만 이용가능 페이지
 app.get('/protected', authenticateUser, (req, res) => {
   res.json({ message: 'This is a protected route', userId: req.session.userId });
 });

 // 로그아웃 기능 나중에 get, post로 나누기
app.get('/logout', (req, res)=>{
   req.session.destroy((err)=>{
      if(err){
         return res.status(500).json({error: 'failed to logout'});
      }
      res.json({message: 'Logout suceesful'});
   });
});

//서버시작
const PORT = 3000;
app.listen(PORT, () => {
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
})