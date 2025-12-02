const mongoose = require('mongoose');


const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,50}$/,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    mobile_number: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: /^[0-9]{8,15}$/,
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
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

const enquiryModal = mongoose.model('enquirys', enquirySchema);

module.exports = enquiryModal;