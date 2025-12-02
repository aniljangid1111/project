const express = require('express');
const { create, view, details, update, changestatuse, destroy } = require('../../controller/admin/faq.controller.js');
const router = express.Router();
const multer = require('multer');
const upload = multer();

module.exports = server => {
    router.post('/create', upload.none(), create)

    router.post('/view', upload.none(), view)

    router.post('/details/:id', upload.none(), details)

    router.put('/update/:id', upload.none(), update)

    router.put('/change-status', upload.none(), changestatuse)

    router.put('/delete', upload.none(), destroy)


    server.use('/api/admin/faq', router)
}

