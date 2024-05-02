const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
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

module.exports = User;