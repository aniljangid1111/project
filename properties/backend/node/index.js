const express = require('express');
const { products, categories, detailProduct } = require('./data');
const { validation } = require('./middleware');
const server = express();

const route =express.Router();
route.use(validation);

server.get('/', (request, response) => {
    response.send('Server is working fine')
});
server.get('/api/view-products', validation, (request, response) => {

    if (products.length > 0) {
        const output = {
            _status: true,
            _message: 'Message Goes Here',
            _data: products,
        }
        response.json(output);
    } else {
        const output = {
            _status: false,
            _message: 'No Data Found',
            _data: products,
        }
        response.json(output);
    }
});
route.get('/api/view-categories', validation, (request, response) => {
    if (categories.length > 0) {
        const output = {
            _status: true,
            _message: 'Message Goes Here',
            _data: categories,
        }
        response.json(output);
    } else {
        const output = {
            _status: false,
            _message: 'No Data Found',
            _data: categories,
        }

        response.json(output);
    }
});
server.get('/api/view-detailproduct', validation, (request, response) => {
    if (detailProduct && typeof detailProduct === 'object' && Object.keys(detailProduct).length > 0) {
        const output = {
            _status: true,
            _message: 'Product details found',
            _data: detailProduct
        };
        response.json(output); // better than end + JSON.stringify
    } else {
        const output = {
            _status: false,
            _message: 'No product details found',
            _data: detailProduct
        };
        response.json(output);
    }
});

server.use('/',route)

server.listen(5000, () => {
    console.log('server is working Fine !')
})
