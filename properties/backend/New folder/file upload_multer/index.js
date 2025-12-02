const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express();


app.use(express.json());  //For JSOn data accpect

// cb mean callBack function or next()
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // console.log(file)
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 999999) + ext)
    }
})

// const upload = multer({ storage: diskStorage }).single('image') //single
// const uploads = multer({ storage: diskStorage }).array('images', 2)   //Multiple

const uploads = multer({ storage: diskStorage }).fields(
    [{ name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 }]
)

app.get('/file', uploads, (req, res) => {
    // console.log(req.body.file)
    // console.log(req.body.files)

    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename
            if (req.files.images) data.images = req.files.images.map((file) => file.filename)
        }

        console.log(data)
        res.status(200).json({ message: 'Success' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Intrenal Server error!' })

    }
})

app.listen(5000, () => {
    console.log('server Connect !')
})
