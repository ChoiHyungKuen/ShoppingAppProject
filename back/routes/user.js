const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { User, Cart, Product } = require('../models');
const cart = require('../models/cart');


router.post('/logIn', async (req, res, next) => {
    // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
    try {
        
        const user = await User.findOne({
            where: { userID: req.body.userID },
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
        const cartList = await user.getProducts({ joinTableAttributes: ['qty'] });
        const converCart = [];

        cartList.map(cart => {
            converCart.push({ id: cart.id, name: cart.name, stock: cart.stock, price: cart.price, description: cart.description, mainImageSrc: cart.mainImageSrc, qty: cart.Cart.qty})        
        })

        const fullUserWithoutPassword = await User.findOne({
            where: {  id: user.id },
            exclude: ['password']
        });

        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json({ myInfo: fullUserWithoutPassword, cart: converCart});
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
        // const [cart, created] = await Cart.findOrCreate({
        //     where: { UserId: req.body.userId },
        //     defaults: { qty: req.body.qty }
        // });
        // if(cart)
        //     await Cart.create({
        // });
        //         qty: req.body.qty,
        //         UserId: req.body.userId,
        const user = await User.findOne({
            where: { id: req.body.userId}
        });
        const product = await Product.findOne({
            where: { id: req.body.productId }
        })

        await user.addProduct(product, { through: { qty: req.body.qty } });

        const result = await User.findAll({
            where: { id: req.body.userId},
            include: [{model: Product}],
            exclude: [{model: User}]
        })

        // const r = await user.findAll({
        //     include: {
        //       model: Product,
        //       through: {
        //         attributes: ['qty']
        //       }
        //     }
        //   });
        //   console.log(result)
          
        // const cartList = await user.getProducts({ joinTableAttributes: ['qty'] });
        const cartList = result[0].Products;

        console.log("@?",result)
        const converCart = [];

        cartList.map(cart => {
            converCart.push({ id: cart.id, name: cart.name, stock: cart.stock, price: cart.price, description: cart.description, mainImageSrc: cart.mainImageSrc, cartId: cart.Cart.id, qty: cart.Cart.qty})        
        })
        // let cart = await Cart.findAll({
        //     where: { UserId: req.body.userId },
        // });

        // await cart.addProducts(req.body.productId);

        // const convertCart = result.map(item => Object.assign({}, item.Cart, item.Product))
        // if(!cart) {
        //     res.status(500).send('서버 에러 발생!! 잠시 후 다시 시도해주세요.');
        //     return ;
        // }

        // let cartProducts =  await cart.getProducts();
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
        // console.log(converCart );
        res.status(200).json(converCart );
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;