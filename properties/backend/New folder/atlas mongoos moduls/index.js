const express = require('express')
require('dotenv').config();
require('./db/config.js')
const path = require('path');
const ProductRouter = require('./routes/product.route.js');


const app = express()
// path view photo
app.use('/api-files', express.static(path.join(__dirname, 'upload')))

// Router import
app.use('/product', ProductRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})