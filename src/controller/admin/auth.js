const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

//Signup logic plus authentication
exports.signup = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec(async (error, user)=>{
        if(user) return res.status(400).json({
            message: 'Admin already exist'
        });


    const{
        firstName,
        lastName,
        email,
        password
    } = req.body;
    const hash_password = await bcrypt.hash(password,10)

    const _user = new User({
        firstName,
        lastName,
        username:Math.random().toString(),
        hash_password,
        email,
        role: 'admin'
    });
    _user.save((error,data)=>{
        if(error) {
            return res.status(400).json({
            message:"Some error occur"
        });
    }
    if(data){
        return res.status(201).json({
            message:"Admin Created succesfuly"
        });
    }
});
});
};

//SignIn logic plus authentication
exports.signin = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn: '1h'});
                res.cookie('token',token,{expiresIn:'1h'});
                const{
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user;
                res.status(201).json({
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
                message:"Admin not exist"
            });
        }
    })
}

exports.signout = (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({
        message:'signout successfuly'
    })

}