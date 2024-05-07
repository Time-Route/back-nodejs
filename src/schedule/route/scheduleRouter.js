const express = require('express');
const router = express.Router();

const scheduleController = require('src/schedule/controller/scheduleController');

router.get('/update', async (req, res) => {
    scheduleController.updateSchedule().then(() => {
        res.json("시간표 업데이트 성공");
    });
});

module.exports = router;