const Category = require('../../models/category');
const Products = require('../../models/product')

//to show categories + sub categories within categories
function createCategory(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategory(categories, cat._id)
        });
    }
    return categoryList;
};

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Products.find({ })
        .select('_id name price quantity description slug productPic category')
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({
        categories: createCategory(categories),
        products
    })
}