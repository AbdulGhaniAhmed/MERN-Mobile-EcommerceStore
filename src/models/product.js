const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    productPic:[
        {img:{type:String}}
    ],
    reviews:[{
        // To give review user must be logged in So here we are using 'linking' in sql this is also known as 'foreign key'
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        review:String
    }
    ],
    createdBy:{
        // To check who created the product we are using 'linking' in sql this is also known as 'foreign key'
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        updatedAt: Date,
        required:true
    },
    category:{
        // To check category the product we are using 'linking' in sql this is also known as 'foreign key'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Products',productSchema);