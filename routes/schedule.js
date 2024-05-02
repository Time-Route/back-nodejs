const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const TimeTable = require('../models/timetable');
const Schedule = require('../models/schedule');

router.get('/update', async (req, res) => {
    try {
        const rows = await TimeTable.findAll();
        console.log('Fetched timetable data.', rows.length, 'rows found.')

        for (const row of rows) {
            if (row.강의시간 === null) continue;
            console.log('Parsing schedules for', row.강의시간)
            const schedules = parse(row.강의시간);
            for (const schedule of schedules) {
                console.log('Creating schedule:', schedule)
                await Schedule.create({
                    day: schedule.day,
                    start: schedule.start,
                    end: schedule.end,
                    time_table_id: row.No
                });
            }
        }
        console.log('Schedules updated.');
        res.send('Schedules updated.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching timetable data.');
    }
});

function parse(input) {
    let schedules = [];
    let regExp = /([월화수목금토일])\((\d+[AB]?(?: ~ \d+[AB]?)?(?:, \d+[AB]?(?: ~ \d+[AB]?))*)\)/g;

    let matches = input.matchAll(regExp);

    for (let match of matches) {
        let day = match[1];
        let scheduleStr = match[2];

        let innerRegExp = /(\d+[AB]?)(?: ~ (\d+[AB]?))?/g;
        let innerMatches = scheduleStr.matchAll(innerRegExp);

        for (let innerMatch of innerMatches) {
            let start = innerMatch[1];
            let end = innerMatch[2] ? innerMatch[2] : start;

            schedules.push({
                day: day,
                start: start,
                end: end
            });
        }
    }

    return schedules;
}
module.exports = router;