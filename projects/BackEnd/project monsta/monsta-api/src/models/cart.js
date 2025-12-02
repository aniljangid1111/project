const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    items: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
            price: {
                type: Number,
                required: true, // product sale_price store
            },
            total: {
                type: Number, // quantity * price
                required: true,
            },
        },
    ],
    sub_total: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("carts", cartSchema);
