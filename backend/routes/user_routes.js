const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const User = require('../models/user');


router.get('/test', (req, res) => {
    res.send('This is a dummy test route');
});

router.get('/profile', verifyToken, function(req, res){
    const userId = req.user_id;
    console.log('user_id:', userId);

    User.findByPk(userId).then((result) => {
        console.log('Result:', result);
        res.status(200).send(result);
    }).catch((err) => {
        console.error('Error:', err);
        res.status(500).send(err);
    });
});

module.exports = router;