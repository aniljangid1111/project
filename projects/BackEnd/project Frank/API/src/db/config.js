const mongoose = require('mongoose')
const { registerAdmin } = require('../controller/Admin-panel/adminPanel.controller')


const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}.${process.env.DBCODE}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=${process.env.DBCLUSTER}`

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongoose')
        registerAdmin()
    })
    .catch((error) => { 
        console.error(error)

    })