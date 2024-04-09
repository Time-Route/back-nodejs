const express = require('express');
const {Sequelize, DataTypes}=require('sequelize');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize('capstone', 'root', '1234', {
   host: 'localhost',
   dialect: 'mysql'
});

const TimeTable = sequelize.define('capstone.time_table',{
   No: {
      type: DataTypes.INTEGER
   },
   비고: {
      type: DataTypes.TEXT
   },
   교과목코드: {
      type: DataTypes.INTEGER
   },
   교과목명: {
      type: DataTypes.TEXT
   },
   강좌번호: {
      type: DataTypes.INTEGER
   },
   이수구분: {
      type: DataTypes.TEXT
   },
   학점: {
      type: DataTypes.INTEGER
   },
   주야: {
      type: DataTypes.TEXT
   },
   강의시간: {
      type: DataTypes.TEXT
   },
   제한인원: {
      type: DataTypes.INTEGER
   },
   신청인원: {
      type: DataTypes.INTEGER
   },
   외국인신청인원: {
      type: DataTypes.INTEGER
   },
   국내교류학생: {
      type: DataTypes.INTEGER
   },
   개설상위: {
      type: DataTypes.TEXT
   },
   개설학과: {
      type: DataTypes.TEXT
   },
   관리학과: {
      type: DataTypes.TEXT
   },
   교수직급: {
      type: DataTypes.TEXT
   },
   교수명: {
      type: DataTypes.TEXT
   },
   대표교수: {
      type: DataTypes.INTEGER
   },
   대표교수명: {
      type: DataTypes.TEXT
   },
   강의실: {
      type: DataTypes.TEXT
   },
   특수교과목: {
      type: DataTypes.TEXT
   },
   과목영역: {
      type: DataTypes.TEXT
   },
   사이버강좌구분: {
      type: DataTypes.TEXT
   },
   강의언어: {
      type: DataTypes.TEXT
   },
   타과제한여부: {
      type: DataTypes.TEXT
   },
   주야교차가능여부: {
      type: DataTypes.TEXT
   },
   분반: {
      type: DataTypes.TEXT
   },
   타교생제한여부: {
      type: DataTypes.TEXT
   },
   구분: {
      type: DataTypes.TEXT
   },
   이론: {
      type: DataTypes.INTEGER
   },
   실습: {
      type: DataTypes.INTEGER
   }
});

TimeTable.findAll()
   .then(rows=>{
      rows.forEach(row=>{
         console.log(row.toJSON());
      });
   })
   .catch(err=>{
      console.error('데이터 조회 중 오류 발생:', err);
   });

const app=express();

app.get('/', (req, res) => {
   res.send("Hello time_route web!");
});

// TimeTable squelize 인스턴스 보기
app.get('/timetable', async (req, res) => {
   try {
     // TimeTable 모델을 사용하여 time_table 데이터를 조회합니다.
     const timetableData = await time_table.findAll();
     // 데이터를 JSON 형식으로 응답합니다.
     res.json(timetableData);
   } catch (error) {
     console.error('Error:', error);
     res.status(500).send('An error occurred while fetching timetable data.');
   }
 });

app.get('/timetable/filter', (req,res)=>{
   res.send("filter function page");
});

 //서버시작
 const PORT=3000;
 app.listen(PORT, ()=>{
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
 })