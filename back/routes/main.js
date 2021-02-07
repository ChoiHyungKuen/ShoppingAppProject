const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/getProducts', async(req, res, next) => {
    try {
        const products = await Product.findAll()
        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json(products);
    } catch(error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;