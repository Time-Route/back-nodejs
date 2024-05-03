const express = require('express');
const router = express.Router();

const scheduleController = require('src/schedule/controller/scheduleController');

router.get('/update', async (req, res) => {
    scheduleController.updateSchedule().then(result => {
        res.json(result);
    });
});

module.exports = router;