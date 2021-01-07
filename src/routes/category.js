const express = require('express');
const { adminCheck, requireSignin } = require('../common-middleware/auth');
const { addCategory, getCategory } = require('../controller/category');
const router = express.Router();
<<<<<<< HEAD
const shortid = require('shortid');
const multer = require('multer');
const path = require('path')

// To upload image and save in folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
 const upload = multer({ storage })


router.post('/category/create',requireSignin,adminCheck,upload.single('categoryImage'),addCategory);
=======


router.post('/category/create',requireSignin,adminCheck,addCategory);
>>>>>>> c530004806a729eb86b02ee72445654fab752745
router.get('/category/display',getCategory);

module.exports = router;