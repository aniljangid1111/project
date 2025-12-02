const express = require('express');
const { orderplaced } = require('../../controller/website/order.controller.js');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads' })
const path = require('path');

module.exports = server => {



    router.post('/register', uploads.none(), orderplaced);



    server.use('/api/website/order', router);
}