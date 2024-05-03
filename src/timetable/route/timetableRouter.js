const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const TimeTable = require('src/timetable/domain/timetable');
const Schedule = require('src/schedule/domain/schedule');

const timeTableController = require('src/timetable/controller/timeTableController');
const scheduleController = require('src/schedule/controller/scheduleController');

router.get('/', async (req, res) => {
    const { code, course, completion, credits, daynight, weekday, start, end } = req.query;

    const searchCriteria = {};
    const scheduleCriteria = {};

    if (code) searchCriteria.교과목코드 = code;
    if (credits) searchCriteria.학점 = credits;

    if (course) searchCriteria.교과목명 = { [Op.like]: `%${course}%` };
    if (completion) searchCriteria.이수구분 = { [Op.like]: `%${completion}%` };
    if (daynight) searchCriteria.주야 = { [Op.like]: `%${daynight}%` };

    // scheduleCriteria
    if (start) scheduleCriteria.start = start;
    if (end) scheduleCriteria.end = end;
    if (weekday) scheduleCriteria.day = weekday;

    timeTableController.findAll(searchCriteria, scheduleCriteria).then(result => {
        res.json(result);
    }).catch(error => {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching timetable data.');
    });
});



module.exports = router;