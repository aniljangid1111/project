const { default: mongoose } = require("mongoose")


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    thumbnail: String,
    images: Object,
    status: { type: Boolean, default: true }
})

const products = mongoose.model('products', productSchema)
module.exports = products 