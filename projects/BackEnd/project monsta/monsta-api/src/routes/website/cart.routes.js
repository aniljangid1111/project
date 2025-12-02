const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads' })
const path = require('path');
const { addToCart, view, updateItem, removeItem, clear } = require('../../controller/website/cart.controller.js');

module.exports = server => {



    router.post('/add', uploads.none(), addToCart);
    router.post('/view/:_id', uploads.none(), view);
    router.post('/update', uploads.none(), updateItem);
    router.post('/remove', uploads.none(), removeItem);
    router.post('/delete', uploads.none(), clear);



    server.use('/api/website/cart', router);
}