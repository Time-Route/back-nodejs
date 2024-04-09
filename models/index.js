const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize; 
db.Sequelize = Sequelize;

// 모듈로 꺼낸다.
module.exports = db;