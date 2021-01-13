const shortid = require('shortid');
const { default: slugify } = require('slugify');
const Category = require('../models/category');
const product = require('../models/product');
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

exports.getProductBySlug = (req,res) =>{
    const { slug } = req.params;

    Category.findOne({slug: slug})
    .select('_id')
    .exec((error,category)=>{
        if(error){
            res.status(400).json('error')
        }
        if(category){
            Product.find({category: category._id})
            .exec((error,products)=>{
                if(error){
                    res.status(400).json('error')
                }
                if(products.length>0){
                    res.status(200).json({
                        products,
                        productsByPrice:{
                            under5k: products.filter(product=> product.price <=5000),
                            under10k: products.filter(product=> product.price >5000 && product.price<= 10000 ),
                            under15k: products.filter(product=> product.price >10000 && product.price<= 15000 ),
                            under20k: products.filter(product=> product.price >15000 && product.price<= 20000 ),
                            under25k: products.filter(product=> product.price >20000 && product.price<= 25000 ),
                        }
                    })
                }
            })
        }
    }
)
}