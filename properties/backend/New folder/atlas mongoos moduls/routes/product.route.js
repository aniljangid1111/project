const express = require('express');
const upload = require('../middleware/multer');
const { addProduct, viewProducts, updateProduct, deleteProduct } = require('../controller/product.controller');


const ProductRouter = express.Router();

ProductRouter.post('/data-insert', upload('products'), addProduct)
ProductRouter.get('/data-view', viewProducts)
ProductRouter.put('/data-update/:_id', upload('products'), updateProduct)
ProductRouter.delete('/data-delete/:_id', deleteProduct)

module.exports = ProductRouter