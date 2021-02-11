const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { User, Cart } = require('../models');
const Product = require('../models/Product');


router.post('/logIn', async (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    try {
        
        const user = await User.findOne({
            where: { userID: req.body.userID },
            include: {
                model: Cart

            }
        });
    
        if(!user) {
            return res.status(403).send('존재하지 않는 ID입니다. 다시 확인해주세요.');
        }
        let serverPassword = CryptoJS.AES.decrypt(user.password, 'test').toString(CryptoJS.enc.Utf8);
        let clientPassword = CryptoJS.AES.decrypt(req.body.password, 'test').toString(CryptoJS.enc.Utf8)
    
        console.log(serverPassword + ' , ' + clientPassword);
        if(serverPassword!== clientPassword) {
            return res.status(403).send('비밀번호가 틀렸습니다.');
        }
        console.log(user)
        let cartProducts = [];
        if(user.Cart) {
            const cart = await Cart.findOne({
                where: { id: user.Cart.id }
            });
        
            cartProducts = await cart.getProducts();
        }

        const fullUserWithoutPassword = await User.findOne({
            where: {  id: user.id },
            exclude: ['password']
        });

        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json({ myInfo: fullUserWithoutPassword, cart: []});
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




router.post('/addCart', async (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    try {
        const [cart, created] = await Cart.findOrCreate({
            where: { UserId: req.body.userId },
            defaults: { qty: req.body.qty }
        });
        // if(cart)
        //     await Cart.create({
        //         qty: req.body.qty,
        //         UserId: req.body.userId,
        // });

        
        await cart.addProducts(req.body.productId);

        // if(!cart) {
        //     res.status(500).send('서버 에러 발생!! 잠시 후 다시 시도해주세요.');
        //     return ;
        // }

        let findCart = await Cart.findOne({
            where: { UserId: req.body.userId }
        });
        let cartProducts =  await findCart.getProducts();
        // const fullCartInfo = await Product.findOne({
        //     where: { cartId: cart.id },
        //     attributes: {
        //         exclude: ['password']
        //     },
        //     include: [{
        //         model: Post
        //     }, {
        //         model: User,
        //         as: 'Followings'
        //     }, {
        //         model: User,
        //         as: 'Followers'
        //     }]
            
        // });
        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        console.log(cartProducts);
        res.status(200).json(cartProducts.data);
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;