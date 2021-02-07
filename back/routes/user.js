const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { User } = require('../models');


router.post('/logIn', (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    res.status(200).json({
        id: 1,
        email: req.body.email,
        name: 'TEST',
        HKPoint: 1500,
        couponCount: 4,
        rank: 'Silver'
    });
});


router.post('/register', async (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    try {

        const user = await User.create({
            userID: req.body.userID,
            password: req.body.encPassword,
            name: req.body.name,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        });
        if(!user) {
            res.status(500).send('서버 에러 발생!! 잠시 후 다시 시도해주세요.');
            return ;
        }
        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json({ registerSuccess: true });
    } catch(error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;