const fs = require('fs')
const path = require('path')

const pathname = path.join(__dirname, 'public')

// create file

fs.writeFileSync(`${pathname}/index.html`, '<h1>hello</h1>');

// read file

// fs.readFile(`${pathname}/index.html`,'utf-8', (error, read) => {
//     if(error) return console.log(error)

//         console.log(read)
// })

// update append

// fs.appendFile(`${pathname}/index.html`, '<p>Append Data</P>', (error, succes) => {
//     if (error) return console.log(error)
//     console.log("succes")
// })

// delete file

// fs.unlink(`${pathname}/index.html`, (err, succ) => {
//     if (err) return console.log(err)
//     console.log('succes')
// })