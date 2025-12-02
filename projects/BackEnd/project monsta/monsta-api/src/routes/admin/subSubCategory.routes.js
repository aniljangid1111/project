const express = require('express');
const { create, view, details, update, changestatuse, destroy } = require('../../controller/admin/subSubCategory.controller.js');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads/subSubCategories' })
const path = require('path')





module.exports = server => {

    // cb= mean callback function
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/subSubCategories')

        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            const extension = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    var singleImage = upload.single('image');  // upload.single('key name write here for single image')
    var multipleImages = upload.array('photos', 6);  //upload.array('keyname', 12(number of images upload you want))
    var uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'photos', maxCount: 6 }])  //multiple or oneimage


    router.post('/create', singleImage, create) 

    router.post('/view', upload.none(), view)

    router.post('/details/:id', upload.none(), details)

    router.put('/update/:id', singleImage, update)

    router.put('/change-status', upload.none(), changestatuse)

    
    router.put('/delete', upload.none(), destroy)

    server.use('/api/admin/subSubCategory', router)
}

