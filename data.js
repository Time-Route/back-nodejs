const express = require('express');
const mysql = require('mysql2');

const app=express();

//MySQL 연결 설정
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '1234',
   database: 'capstone'
});

//MySQL 연결
connection.connect((err)=>{
   if(err){
      console.error('MySQL 연결 오류: ', err);
      return;
   }
   console.log('MySQL에 성공적으로 연결됨.');
})

app.get('/', (req, res) => {
   res.send("Hello time_route web!");
});

// time_table 테이블 데이터를 루트 경로에 출력
app.get('/time-table', (req, res) => {
   connection.query('SELECT * FROM time_table', (err, results, fields) => {
     if (err) {
       console.error('쿼리 실행 오류: ', err);
       res.status(500).send('서버 내부 오류 발생');
       return;
     }
     res.json(results);
   });
 });

 //서버시작
 const PORT=3000;
 app.listen(PORT, ()=>{
   console.log('서버가 http://localhost:3000 에서 실행 중입니다.')
 })