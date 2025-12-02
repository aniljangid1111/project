const mongooes = require('mongoose')

const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}.${process.env.DBCODE}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=${process.env.DBCLUSTER}`

mongooes.connect(url)
    .then(() => {
        console.log('connected to mongoos')
    })
    .catch((error) => {
        console.log(error)
    })