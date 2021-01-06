const express = require('express');
const { userCheck,requireSignin } = require('../common-middleware/auth');
const { addTocart } = require('../controller/cart');
const router = express.Router();


router.post('/user/cart/addtocart',requireSignin,userCheck,addTocart);
// router.get('/category/display',getCategory);

module.exports = router;