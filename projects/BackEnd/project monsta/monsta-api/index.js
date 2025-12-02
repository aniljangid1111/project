const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()

const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());
server.use(cors());


server.get('/', (request, response) => {
    response.send("server is working Fine");
})
// server.use('/uploads/categories',express.static('uploads/categories'))
// server.use('/uploads/subCategories',express.static('uploads/subCategories'))
// server.use('/uploads/subSubCategories',express.static('uploads/subSubCategories'))

server.use('/uploads', express.static('uploads'));

// Admin Api

require('./src/routes/admin/color.routes.js')(server)
require('./src/routes/admin/material.routes.js')(server)
require('./src/routes/admin/category.routes.js')(server)
require('./src/routes/admin/subCategory.routes.js')(server)
require('./src/routes/admin/subSubCategory.routes.js')(server)
require('./src/routes/admin/products.routes.js')(server)
require('./src/routes/admin/faq.routes.js')(server)
require('./src/routes/admin/country.routes.js')(server)
require('./src/routes/admin/userList.routes.js')(server)
require('./src/routes/admin/dashboard.routes.js')(server)
require('./src/routes/admin/enquiry.routes.js')(server)
require('./src/routes/admin/newsLetter.routes.js')(server)
require('./src/routes/admin/slider.routes.js')(server)


// Web Api
require('./src/routes/website/user.routes.js')(server)
require('./src/routes/website/order.routes.js')(server)
require('./src/routes/website/cart.routes.js')(server)


server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Connected!'))
        .catch((error) => console.log(error))
}) 