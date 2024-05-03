require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('timeroute', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;
