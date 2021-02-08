const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { User } = require('../models');


router.post('/logIn', async (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    try {
        
        const user = await User.findOne({
            where: { userID: req.body.userID}
        });
    
        if(!user) {
    
            return res.status(403).send('존재하지 않는 ID입니다. 다시 확인해주세요.');
        }
    
        if(user.password !== req.body.password) {
    
            return res.status(403).send('비밀번호가 틀렸습니다.');
        }

        const fullUserWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ['password']
            },
            // include: [{
            //     model: Post
            // }, {
            //     model: User,
            //     as: 'Followings'
            // }, {
            //     model: User,
            //     as: 'Followers'
            // }]
            
        });
        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        console.log(fullUserWithoutPassword)
        res.status(200).json(fullUserWithoutPassword);
    } catch(error) {
        console.log(error);
        next(error);
    }
    
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