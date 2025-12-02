const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter category Name !!'],
        match: /^[a-zA-Z & 1'-]{2,}$/,
        // validate: {
        //     validator: async function (v) {
        //         const name = await this.constructor.findOne({ name: v });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // },
    },
    image: {
        type: String,
        default: ''
    },
    photos: {
        type: Array,
        default: []
    },
    slug: {
        type: String,
        default: ''
    },
    actual_price: {
        type: Number,
        required: [true, 'Actual price is required'],
        default: ''
    },
    sale_price: {
        type: Number,
        required: [true, "Sale price is Required!"],
        default: ''
    },
    // product_type:{
    //     type: Number,
    //     required: [true, 'Product type is required'],
    //     default: 1  // 1 - Featured 2- New Arrival 3- OnSale
    // },
    is_feature: {
        type: Number,
        required: [true, 'Featured is required!'],
        default: 1 //1-Yes 2-No
    },
    is_new_arrivals: {
        type: Number,
        required: [true, 'Arrivals is required!'],
        default: 1 //1-Yes 2-No
    },
    is_onsale: {
        type: Number,
        required: [true, 'OnSale is required!'],
        default: 1 //1-Yes 2-No
    },
    is_best_selling: {
        type: Number,
        required: [true, 'Best selling is required!'],
        default: 1 //1-Yes 2-No
    },
    is_upsell: {
        type: Number,
        required: [true, 'UpSell is required!'],
        default: 1 //1-Yes 2-No
    },
    product_code: {
        type: String,
        required: [true, 'Product Code  is required!'],
        default: ''
    },
    product_dimension: {
        type: String,
        required: [true, 'Product Dimension is required!'],
        default: ''
    },
    estimate_delivery_days: {
        type: String,
        required: [true, 'Estimate Delivery days is required!'],
        default: ''
    },
    short_description: {
        type: String,
        required: [true, 'Short Description days is required!'],
        default: ''
    },
    long_description: {
        type: String,
        required: [true, 'Long Description days is required!'],
        default: ''
    },
    material_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Material'
    }],
    colors_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'color'
    }],

    parent_category_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'categories'
        
    }],
    sub_category_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'subCategories'
    }],
    sub_sub_category_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'subSubCategories'
    }],

    status: {
        type: Boolean,
        default: 1,
    },
    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },
    update: {
        type: Date,
        default: Date.now()
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    delete_at: {
        type: Date,
        default: ''
    }

});

const productModal = mongoose.model('products', productSchema);

module.exports = productModal;