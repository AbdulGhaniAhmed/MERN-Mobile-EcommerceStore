const express = require('express');
const { signup, signin} = require('../../controller/admin/auth');
const router = express.Router();
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');


router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);



module.exports = router;
