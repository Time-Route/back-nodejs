const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// 회원가입 라우트 (나중에 get, post 나누기)
router.get('/register', async (req, res) => {
    const { name, userId, password } = req.query;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    console.log(name, userId, hashedPassword);

    try {
        // name, userid, password 모두 입력했는지 확인
        if (name && userId && password) {
            const existingUser = await User.findOne({ where: { userid: userId } });
            // 사용자 입력이 이미 테이블에 있는지 확인
            if (existingUser) {
                res.status(400).json({ error: "User already exists" });
                return;
            }
            const newUser = await User.create({ name, userid: userId, password: hashedPassword });
            res.json({ message: "User added successfully", user: newUser });

        }
        else {
            res.send('Please enter User Information!');
            res.end();
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 로그인 라우트 (나중에 get, post 나누기)
router.get('/login', async (req, res) => {
    const { userId, password } = req.query;

    if (req.session.userId != null) {
        return res.status(401).json('로그인된 상태입니다.');
    }

    try {
        const user = await User.findOne({ where: { userid: userId } });
        //id확인
        if (!user) {
            return res.status(401).json({ error: 'Invalid userid or password' });
        }

        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) {
            return res.status(401).json({ error: 'Invalid userid or password' });
        }

        req.session.userId = user.id; //세션에 사용자 id 저장

        res.json({ message: 'Login successful', user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 사용자 인증 미들웨어
const authenticateUser = (req, res, next) => {
    if (req.session.userId) {
        next(); // 다음 미들웨어로 진행
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// 보호된 라우트 - 로그인 후에만 이용가능 페이지
router.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.session.userId });
});

// 로그아웃 기능 나중에 get, post로 나누기
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'failed to logout' });
        }
        res.json({ message: 'Logout suceesful' });
    });
});

module.exports = router;