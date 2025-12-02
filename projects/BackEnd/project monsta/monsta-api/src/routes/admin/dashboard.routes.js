const express = require('express');
const { view } = require('../../controller/admin/dashboard.controller.js');
const router = express.Router();
const multer = require('multer');
const upload = multer();

module.exports = server => {

    router.post('/', upload.none(), view)

    server.use('/api/admin/dashboard', router)
}

