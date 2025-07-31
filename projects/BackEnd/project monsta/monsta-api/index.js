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
server.use('/uploads/categories',express.static('uploads/categories'))
server.use('/uploads/categories',express.static('uploads/subCategories'))

// Admin Api

require('./src/routes/admin/color.routes.js')(server)
require('./src/routes/admin/material.routes.js')(server)
require('./src/routes/admin/category.routes.js')(server)
require('./src/routes/admin/subCategory.routes.js')(server)

server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Connected!'))
        .catch((error)=> console.log(error))
}) 