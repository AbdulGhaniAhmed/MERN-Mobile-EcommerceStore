const shortid = require('shortid');
const { default: slugify } = require('slugify');
const Product = require('../models/product');

exports.createProduct = (req,res)=>{
    
    const{
        name,
        price,
        description,
        quantity,
        category,
        createdBy
    }=req.body;

 //As profile picture is an array
    let productPic = [];
    if(req.files.length>0){
        productPic = req.files.map(file=>{
            return { img: file.filename}
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPic,
        category,
        createdBy: req.user._id
    });

    product.save((errors,prod)=>{
        if(errors){
            return res.status(400).json({errors})
        }
        if(prod){
            return res.status(201).json({prod})
        }
    })
}