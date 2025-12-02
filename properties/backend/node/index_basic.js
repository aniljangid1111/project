// const http = require('http');

// http.createServer((request, response) => {

//     response.end('server is working fine!')

// }).listen(5000, () => {
//     console.log('server is working fine!')
// })

const http = require('http');
const { products, categories, detailProduct } = require('./data');

var server = http.createServer((request, response) => {
    if (request.url == '/') {
        response.end('server is working fine!')
    } else if (request.url == '/api/view-products' && request.method == 'GET') {
        if (products.length > 0) {
            const output = {
                _status: true,
                _message: 'Message Goes Here',
                _data: products,
            }
            response.end(JSON.stringify(output))
        } else {
            const output = {
                _status: false,
                _message: 'No Data Found',
                _data: products,
            }
            response.end(JSON.stringify(output))
        }


    } else if (request.url == '/api/view-categories' && request.method == 'GET') {
        if (categories.length > 0) {
            const output = {
                _status: true,
                _message: 'Message Goes Here',
                _data: categories,
            }
            response.end(JSON.stringify(output))
        } else {
            const output = {
                _status: false,
                _message: 'No Data Found',
                _data: categories,
            }
            response.end(JSON.stringify(output))
        }


    } else if (request.url == '/api/view-detailProduct' && request.method == 'GET') {
        if (detailProduct && Object.keys(detailProduct).length > 0) {
            const output = {
                _status: true,
                _message: 'Message Goes Here',
                _data: detailProduct,
            }
            response.end(JSON.stringify(output))
        } else {
            const output = {
                _status: false,
                _message: 'No Data Found',
                _data: detailProduct,
            }
            response.end(JSON.stringify(output))
        }


    }

    else {
        response.end('Page Not Found!')
    }

})
server.listen(5000, () => {
    console.log('server is working fine')
})