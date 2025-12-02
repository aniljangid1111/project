const products = require("../modules/products");
const fs = require('fs')
const path = require('path')


const addProduct = async (req, res) => {

    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.images) data.images = req.files.images.map((img) => img.filename)
        }

        const dataToSave = new products(data)

        const response = await dataToSave.save()
        res.status(200).json({ message: "success", _data: response })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })

    }

}

const viewProducts = async (req, res) => {
    try {
        const response = await products.find()
        const filePath = `${req.protocol}://${req.get('host')}/api-files/`

        res.status(200).json({ message: 'success', _data: response, filePath })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'server error!' })
    }
}

const updateProduct = async (req, res) => {
    try {


        const predata = await products.findById(req.params._id);

        if (!predata) return res.status(404).json({ message: 'Data Not Found!!' })

        const data = req.body;

        if (req.files) {

            if (req.files.thumbnail) {
                const newThumb = req.files.thumbnail[0].filename;
                data.thumbnail = newThumb; // ✅ update in data so DB updates

                const oldThumbPath = path.join(
                    __dirname,
                    "../upload/products",
                    predata.thumbnail
                );
                if (fs.existsSync(oldThumbPath)) {
                    fs.unlinkSync(oldThumbPath);
                }
            }

            if (req.files.images) {
                const newImages = req.files.images.map((img) => img.filename);
                data.images = newImages; // ✅ update in data so DB updates

                predata.images.forEach((file) => {
                    const oldImagePath = path.join(__dirname, "../upload/products", file);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                        console.log("Old image deleted:", file);
                    } else {
                        console.log("Old image not found:", file);
                    }
                });

            }
        }



        const response = await products.updateOne(
            { _id: req.params._id },
            {
                $set: data
            });
        res.status(200).json({ message: 'success', data: response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error!" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const userData = req.params._id
        const record = await products.findById(userData)

        if (!record) return res.status(404).json({ message: 'Data Not Found!' })

        const response = await products.deleteOne({ _id: userData });

        if (record.thumbnail) {

            const oldThumbPath = path.join(
                __dirname,
                "../upload/products",
                record.thumbnail
            );
            if (fs.existsSync(oldThumbPath)) {
                fs.unlinkSync(oldThumbPath);
            }
        }

        if (record.images) {
            record.images.forEach((file) => {
                const oldImagePath = path.join(__dirname, "../upload/products", file);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log("Old image deleted:", file);
                } else {
                    console.log("Old image not found:", file);
                }
            });
        }

        res.status(200).json({ message: 'successfull Delete' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error!" })
    }
}

module.exports = {
    addProduct,
    viewProducts,
    updateProduct,
    deleteProduct
}