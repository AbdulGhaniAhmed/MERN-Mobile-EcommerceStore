const express = require('express');
const { requireSignin } = require('../../common-middleware/auth');
const { signup, signin, signout} = require('../../controller/admin/auth');
const router = express.Router();
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');


router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/admin/signout',requireSignin,signout);



module.exports = router;
