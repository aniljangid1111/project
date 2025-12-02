const express = require('express')
const app = express();
const token = 'anil'

const middleWare = (req, res, next) => { 
    if (!req.params.key) return res.send('Please Provide a Key')
    if (req.params.key !== token) return res.send('Please Provide a valid Key')
    next()
}

app.get("/home/:key", middleWare, (req, res) => {
    res.send(`Hello World, key: ${req.params.key}`);
});

app.listen('5000', () => {
    console.log('Server Is Running on 5000 PORT')
})