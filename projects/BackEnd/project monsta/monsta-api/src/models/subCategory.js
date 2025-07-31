const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter category Name !!'],
        match: /^[a-zA-Z ]{2,20}$/
    },
    parent_category_id: {
        type:String,
         required: [true, 'parent category is Required !!'],
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

const subCategoryModal = mongoose.model('subCategories', subCategorySchema);

module.exports = subCategoryModal;