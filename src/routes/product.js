const express = require('express');
const { adminCheck, requireSignin } = require('../common-middleware/auth');
const { createProduct } = require('../controller/product');
const shortid = require('shortid');
const multer = require('multer');
const path = require('path')

const router = express.Router();

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
                                                        //use .single to upload only one file
router.post('/product/create',requireSignin,adminCheck,upload.array('productPicture'),createProduct)


module.exports = router;