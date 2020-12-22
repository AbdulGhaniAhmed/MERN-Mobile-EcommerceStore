const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//Signup logic plus authentication
exports.signup = (req,res)=>{

    // const errors = validationResult(req);
    // return res.status(400).json({
    //     errors: errors.array()
    // })

    User.findOne({email: req.body.email})
    .exec((error, user)=>{
        if(user) return res.status(400).json({
            message: 'user already exist'
        })
    });

    const{
        firstName,
        lastName,
        password,
        email
    } = req.body;
    const _user = new User({
        firstName,
        lastName,
        username:Math.random().toString(),
        password,
        email
    });
    _user.save((error,data)=>{
        if(error) {
            return res.status(404).json({
            message:"Some error occur"
        });
    }
    if(data){
        return res.status(201).json({
            message:"User Created succesfuly"
        });
    }
    });
}

//SignIn logic plus authentication
exports.signin = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id},process.env.JWT_SECRET_KEY,{expiresIn: '1h'});
                const{
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user;
                res.status(200).json({
                    token,
                    user:{
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                });
            }else{
                return res.status(400).json("Password not matched")
            };
        }else{
            res.status(400).json({
                message:"User not exist"
            });
        }
    })
}
