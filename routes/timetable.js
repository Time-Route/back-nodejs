const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const TimeTable = require('../models/timetable');

router.get('/', async (req, res) => {
    try {
        const timetableData = await TimeTable.findAll();
        res.json(timetableData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching timetable data.');
    }
});

router.get('/filter', async (req, res) => {
    try {
        //검색 조건들 추후에 추가하기
        const { code, course, completion, credits, day, time } = req.query;

        //검색조건들 한번에 저장
        const searchCriteria = {};

        //검색 조건들에 맞게 조건문 추가하기 (int는 대입 / text는 ``사용)
        if (code) {
            searchCriteria.교과목코드 = code;
        }
        if (course) {
            searchCriteria.교과목명 = {
                [Op.like]: `%${course}%`
            };
        }
        if (completion) {
            searchCriteria.이수구분 = {
                [Op.like]: `%${completion}%`
            };
        }
        if (credits) {
            searchCriteria.학점 = credits;
        }
        if (day) {
            searchCriteria.주야 = {
                [Op.like]: `%${day}%`
            };
        }
        if (time) {
            searchCriteria.강의시간 = {
                [Op.like]: `%${time}%`
            };
        }

        const filter = await TimeTable.findAll({
            where: searchCriteria
        });

        res.json(filter);
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error executing query');
    }
});

module.exports = router;