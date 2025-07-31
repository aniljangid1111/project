const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter category Name !!'],
        match: /^[a-zA-Z ]{2,20}$/,
        // validate: {
        //     validator: async function (v) {
        //         const name = await this.constructor.findOne({ name: v });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // },
        // minlength: 4,
        // maxlength: 15 
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

const categoryModal = mongoose.model('categories', categorySchema);

module.exports = categoryModal;