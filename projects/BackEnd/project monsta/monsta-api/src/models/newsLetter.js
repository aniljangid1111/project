const mongoose = require('mongoose');


const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    status: {
        type: Boolean,
        default: 1,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    delete_at: {
        type: Date,
        default: ''
    }
});

const newsLetterModal = mongoose.model('newsletters', newsLetterSchema);

module.exports = newsLetterModal;