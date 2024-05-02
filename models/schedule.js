const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Timetable = require('./timetable');

const Schedule = sequelize.define('schedules', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time_table_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Timetable,
            key: 'No'
        }
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Schedule;