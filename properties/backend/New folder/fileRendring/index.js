const express = require('express')
// const path = require('path')
const app = express();
// const filepath = path.join(__dirname, 'public')

// app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//     res.sendFile(`${filepath}/home.html`)
// })

// app.get('/contect', (req, res) => {
//     res.sendFile(`${filepath}/contect.html`)
// })

// app.get('/about', (req, res) => {
//     res.sendFile(`${filepath}/about.html`)
// })

// app.use((req, res) => {
//     res.status(404).sendFile(`${filepath}/404.html`);
// });

// MiddleWare Normal

const token = 'anil'

const middleWare = (req, res, next) => {
    if (!req.params.key) return res.send('Please Provide a Key')
    if (req.params.key !== token) return res.send('Please Provide a valid Key')
    next()
}

app.get("/home/:key(.*)?", middleWare, (req, res) => {
    res.send(`Hello World, key: ${req.params.key}`);
});

app.listen('5000', () => {
    console.log('Server Is Running on 5000 PORT')
})