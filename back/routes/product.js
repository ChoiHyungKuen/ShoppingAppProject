const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;


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

router.post('/search', async(req, res, next) => {
    console.log(req.body.searchText)
    try {
        const products = await Product.findAll({
            where: { 
                name: { 
                    [Op.like]: '%' + req.body.searchText + '%'
                }
            }
        });
        res.status(200).json(products);
    } catch(error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;