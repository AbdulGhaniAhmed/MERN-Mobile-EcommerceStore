const express = require('express');
const { signup, signin} = require('../controller/auth');
const router = express.Router();
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');



router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);


module.exports = router;
