const TimeTable = require('src/timetable/domain/timetable');
const Schedule = require('src/schedule/domain/schedule');

module.exports.updateSchedule = async () => {
    try {
        await Schedule.destroy({
            where: {},
            truncate: true
        });

        const rows = await TimeTable.findAll();

        for (const row of rows) {
            if (row.강의시간 === null) continue;
            const schedules = parse(row.강의시간);
            for (const schedule of schedules) {
                await Schedule.create({
                    day: schedule.day,
                    start: schedule.start,
                    end: schedule.end,
                    time_table_id: row.No
                });
            }
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

module.exports.parse = (input) => {
    let schedules = [];
    let regExp = /([월화수목금토일])\((\d+[AB]?(?: ~ \d+[AB]?)?(?:, \d+[AB]?(?: ~ \d+[AB]?)?)*)\)/g;

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
