const express = require('express');
const router = express.Router();


router.get('/logIn', (req, res, next) => {
    console.log(req);

});
module.exports = router;