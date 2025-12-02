const express = require('express')
require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const multer = require('multer')
const fs = require('fs');
const path = require('path')

const app = express()
// const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}.${process.env.DBCODE}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=${process.env.DBCLUSTER}`
app.use('/api-photo', express.static(path.join(__dirname, 'upload')))
const url = 'mongodb://localhost:27017'

const client = new MongoClient(url);

const config = async () => {
    await client.connect();
    const db = await client.db('api_temp');
    return db;
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'upload')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname))
        }
    })
}).fields(
    [
        {
            name: 'thumbnail', maxCount: 1
        },
        {
            name: 'images', maxCount: 5
        }
    ]
)

app.post('/file-upload', upload, async (req, res) => {
    try {
        const data = req.body;

        const db = await config()
        const collection = db.collection('sultansirclass');

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.images) data.images = req.files.images.map((img) => img.filename)
        }

        const response = await collection.insertOne(data)
        res.status(200).json({ message: "success", data: response })

    } catch (error) {
        res.status(500).json({ message: 'Server erroo!', data: null })
    }

})

app.get('/file-view', async (req, res) => {
    const db = await config();
    const collection = db.collection('sultansirclass');
    const data = await collection.find().toArray()

    const path = 'localhost:5000/api-photo'

    res.status(200).json({ _message: 'success', data, path })
})


app.put('/file-update/:id', upload, async (req, res) => {
    try {
        const id = req.params.id;
        const db = await config();
        const collection = db.collection('sultansirclass');

        const data = req.body

        if (req.files) {
            if (req.files.thumbnail) {
                data.thumbnail = req.files.thumbnail[0].filename;
            }
            if (req.files.images) {
                data.images = req.files.images.map(img => img.filename);
            }
        }

        const response = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        )


        res.status(200).json({ message: 'Data updated successfully', data: response })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
})

app.delete('/file-delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await config();
        const collection = db.collection('sultansirclass');

        // Find existing record before deleting (for deleting files)
        const record = await collection.findOne({ _id: new ObjectId(id) });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Delete the record from MongoDB
        const response = await collection.deleteOne({ _id: new ObjectId(id) });

        if (response.deletedCount === 0) {
            return res.status(400).json({ message: 'Failed to delete record' });
        }

        // Optional: Delete uploaded files (if they exist)
        if (record.thumbnail) {
            const thumbnailPath = path.join(__dirname, 'upload', record.thumbnail);
            if (fs.existsSync(thumbnailPath)) fs.unlinkSync(thumbnailPath);
        }

        if (record.images && Array.isArray(record.images)) {
            record.images.forEach(img => {
                const imagePath = path.join(__dirname, 'upload', img);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            });
        }

        res.status(200).json({ message: 'Data and associated files deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});



app.listen(process.env.PORT, () => {
    console.log(`server Running on PORT ${process.env.PORT}`)
})