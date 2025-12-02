const express = require('express');
const { create, view, details, update, changestatuse, destroy, unsubscribe } = require('../../controller/admin/newsLetter.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer()
const path = require('path')





module.exports = server => {
    router.post('/create', uploads.none(), create)

    router.post('/view', uploads.none(), view)

    router.post('/details/:id', uploads.none(), details)

    router.put('/update/:id', uploads.none(), update)

    // routes/newsletter.routes.js
    router.get('/unsubscribe', unsubscribe)


    router.put('/change-status', uploads.none(), changestatuse)

    router.put('/delete', uploads.none(), destroy)


    server.use('/api/admin/newsletter', router)
}

