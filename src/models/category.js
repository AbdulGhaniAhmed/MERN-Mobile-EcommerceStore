const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
<<<<<<< HEAD
    categoryImage:{
        type:String
    },
=======
>>>>>>> c530004806a729eb86b02ee72445654fab752745
    parentId: {
        type: String,
    }
},{timestamps:true});

module.exports = mongoose.model('Category',categorySchema);