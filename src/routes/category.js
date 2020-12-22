const express = require('express');
const { adminCheck, requireSignin } = require('../common-middleware/auth');
const { addCategory, getCategory } = require('../controller/category');
const router = express.Router();


router.post('/category/create',requireSignin,adminCheck,addCategory);
router.get('/category/display',getCategory);

module.exports = router;