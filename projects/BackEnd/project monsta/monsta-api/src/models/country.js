const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
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

const countryModal = mongoose.model('countries', countrySchema);

module.exports = countryModal;