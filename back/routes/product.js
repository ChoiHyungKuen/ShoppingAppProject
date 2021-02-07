const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/:productId', async(req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.productId}
        });
        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json(product);
    } catch(error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;