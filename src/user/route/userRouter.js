const express = require('express');
const router = express.Router();

const User = require('src/user/domain/user');

router.get('/', async (req, res) => {
    try {
        const usersData = await User.findAll();
        res.json(usersData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching timetable data.');
    }
});

module.exports = router;