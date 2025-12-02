const express = require('express');
const { view, details, update, changestatuse, destroy } = require('../../controller/admin/userList.controller.js');
const router = express.Router();
const multer = require('multer');
const upload = multer();

module.exports = server => {

    router.post('/view', upload.none(), view)
    router.post('/details/:id', upload.none(), details)
    router.post('/update/:id', upload.none(), update)
    router.put('/change-status', upload.none(), changestatuse)
    router.put('/delete', upload.none(), destroy)


    server.use('/api/admin/userList', router)
}

