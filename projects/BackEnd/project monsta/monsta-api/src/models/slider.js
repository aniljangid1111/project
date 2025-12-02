const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
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

const sliderModal = mongoose.model('sliders', sliderSchema);

module.exports = sliderModal;