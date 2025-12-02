const express = require('express')
const path = require('path')

const file = path.join(__dirname, 'public')

const app = express()
app.get('/greet/:name', (req, res) => {
    console.log(req.query)
    res.send(`Hello ${req.params.name}`)
})
app.get('/file', (req, res) => {
    res.sendFile(`${file}/index.html`)
})

app.listen(5000, () => {
    console.log('server in Running on 5000 Port')
})