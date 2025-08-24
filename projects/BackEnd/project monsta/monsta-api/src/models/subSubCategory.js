const mongoose = require('mongoose');
const { Schema } = mongoose;


const subSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter category Name !!'],
        match: /^[a-zA-Z ]{2,20}$/
    },
    image: {
        type: String,
        default: ''
    },
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
    parent_category_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'parent category is Required !!'],
        ref: 'categories'
    },
    parent_category_ids: [{
        type: Schema.Types.ObjectId,
        // required: [true, 'parent category is Required !!'],
        default: [],
        ref: 'categories'
    }],
    sub_category_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'parent category is Required !!'],
        ref: 'subCategories'
    },

    sub_category_ids: [{
        type: Schema.Types.ObjectId,
        // required: [true, 'parent category is Required !!'],
        default: [],
        ref: 'subCategories'
    }],
    products_ids: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'products'
    }],
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

const subSubCategoryModal = mongoose.model('subSubCategories', subSubCategorySchema);

module.exports = subSubCategoryModal;