const TimeTable = require('src/timetable/domain/timetable');
const Schedule = require('src/schedule/domain/schedule');

module.exports = {
    findAll: async (timetableCriteria, scheduleCriteria) => {
        const result = await TimeTable.findAll({
            where: timetableCriteria,
            include: [{
                model: Schedule,
                where: scheduleCriteria
            }]
        });
        return result;
    },
}