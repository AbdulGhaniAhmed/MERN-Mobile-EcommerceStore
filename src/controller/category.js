const Category = require('../models/category');
const slugify = require('slugify');

//to show categories + sub categories within categories
function createCategory(categories,parentId=null){
    const categoryList = [];
    let category;
    if(parentId==null){
        category=categories.filter(cat=>cat.parentId == undefined);
    }else{
        category=categories.filter(cat=>cat.parentId == parentId);
    }
    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategory(categories, cat._id)
        });
    }
    return categoryList;
};

//to add/create category
exports.addCategory = (req,res)=>{
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.file){
        categoryObj.categoryImage = process.env.API_URL + '/public/' + req.file.filename;
    }

    if(req.body.parentId){
      categoryObj.parentId=req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error,category)=>{
        if(error) {return res.status(400).json({error})}
        if(category) {return res.status(200).json({category})}
    });
}

//t display category
exports.getCategory=(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error) {return res.status(400).json({error})}
        if(categories) {
            const categoryList = createCategory(categories);
             res.status(200).json({categoryList})
}
    })
}