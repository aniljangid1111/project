const express = require('express');
require('dotenv').config();
const allRoutes = require('./src/app');
require('./src/db/config')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/api', allRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})     