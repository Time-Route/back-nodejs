const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TimeTable = sequelize.define('timetables', {
    No: {
        type: DataTypes.INTEGER,
        primaryKey: true
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
}, {
    timestamps: false
});

module.exports = TimeTable;