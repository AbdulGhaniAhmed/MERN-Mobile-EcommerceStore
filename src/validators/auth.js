const { check, validationResult} =require('express-validator');
 
//for signup validation
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First name is required'),

    check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),

    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),

    check('password')
    .isLength({min:6})
    .withMessage('Password must be of atleast 6 characters')
]

//for signin validation

exports.validateSigninRequest = [
    
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),

    check('password')
    .isLength({min:6})
    .withMessage('Password must be of atleast 6 characters')
]
//for signin and signup both
exports.isRequestValidated = (req,res,next)=>{
    const errors =  validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next();
}

