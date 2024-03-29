const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { User, Cart, Product } = require('../models');


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
        const cartList = [];
        const userInfo = {};

        const result = await User.findAll({
            where: { userID: req.body.userID},
            include: [{model: Product}],
            attributes: { exclude: ['password'] }
        })
        result[0].Products.map(cart => {
            cartList.push({ id: cart.id, name: cart.name, stock: cart.stock, price: cart.price, description: cart.description, mainImageSrc: cart.mainImageSrc, cartId: cart.Cart.id, qty: cart.Cart.qty})        
        });

        userInfo.id = result[0].id;
        userInfo.userID = result[0].userID;
        userInfo.email = result[0].email;
        userInfo.name = result[0].name;
        userInfo.address = result[0].address;

        // const fullUserWithoutPassword = await User.findOne({
        //     where: {  id: user.id },
        //     exclude: ['password']
        // });

        // console.log(CryptoJS.AES.decrypt(req.body.encPassword, 'test').toString(CryptoJS.enc.Utf8));
        res.status(200).json({ myInfo: userInfo, cart: cartList});
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

router.post('/removeCart', async (req, res, next) => {
    try {
        console.log(req.body)
        const cart = await Cart.destroy({
            where: { id: req.body.cartId }
        });

        console.log(cart);
        // await user.removeProduct({ through: { id: req.body.cartId } });

        res.json({ cartId: req.body.cartId });
    } catch(error) {
        next(error);
    }

});



router.post('/changeCartQty', async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await Cart.update(
            { qty: req.body.qty },
            { where: { id: req.body.cartId } }
        );
        
        if(!result) {
            res.status(500).send('서버 에러 발생!! 잠시 후 다시 시도해주세요.');
            return ;
        }
        // await user.removeProduct({ through: { id: req.body.cartId } });

        res.json(req.body);
    } catch(error) {
        next(error);
    }

});
router.post('/removeSelectedCartItem', async (req, res, next) => {
    try {
        console.log(req.body)
        const cart = await Cart.destroy({
            where: { id: req.body.checkedCart }
        });

        console.log(cart);
        // await user.removeProduct({ through: { id: req.body.cartId } });

        res.json({ checkedCart: req.body.checkedCart  });
    } catch(error) {
        next(error);
    }

});

module.exports = router;