const jwt = require('jsonwebtoken')

// To handle user sessions through jwt-token
exports.requireSignin = (req,res,next) =>{
    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user =  jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = user;
    }else{
        return res.status(400).json({msg: "Authorization required"})
    }
    next();
}

exports.adminCheck = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({msg: "Access denied"})
    }
    next();
}

exports.userCheck = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).json({msg: "Access denied"})
    }
    next();
}