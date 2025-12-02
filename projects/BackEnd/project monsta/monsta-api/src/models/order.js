const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Name is Required."],
        default: '',
        ref: 'users'
    },
    order_id: {
        type: String,
        default: ''
    },
    order_number: {
        type: String,
        default: ''
    },
    order_date: {
        type: Date,
        default: Date.now()
    },
    product_info: {
        type: Array,
        default: []
    },
    billing_address: [
        {
            type: String,
            default: ""
        }
    ],
    shipping_address: [
        {
            type: String,
            default: ""
        }
    ],
    total_amount: {
        type: Number,
        default: 0
    },
    discount_amount: {
        type: Number,
        default: 0
    },
    net_amount: {
        type: Number,
        default: 0
    },
    payment_status: {
        type: Number,
        default: 1 //1-panding , 2-succes 3- Failed
    },
    order_status: {
        type: Number,
        default: 0 //0-in-process , 1-order placed 2- cancel 3- ready for shipment 4-shiped 5- out of delivery 6- order-Delivered
    },
    payment_id: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },

    create_at: {
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

const orderModal = mongoose.model('orders', orderSchema);

module.exports = orderModal;