const { DataTypes } = require('sequelize');
const sequelize = require('src/global/config/database');
const TimeTable = require('src/timetable/domain/timetable');

const Schedule = sequelize.define('schedules', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time_table_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TimeTable,
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
}, {
    timestamps: false
});

module.exports = Schedule;