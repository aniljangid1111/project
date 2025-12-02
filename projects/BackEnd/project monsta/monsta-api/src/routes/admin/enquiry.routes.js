const express = require('express');
const { create, view, details, update, changestatuse, destroy } = require('../../controller/admin/enquiry.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer()
const path = require('path')





module.exports = server => {
    router.post('/create', uploads.none(), create)

    router.post('/view', uploads.none(), view)

    router.post('/details/:id', uploads.none(), details)

    router.put('/update/:id', uploads.none(), update)

    router.put('/change-status', uploads.none(), changestatuse)

    router.put('/delete', uploads.none(), destroy)


    server.use('/api/admin/enquiry', router)
}

