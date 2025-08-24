const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter color Name !!'],
        match: /^[a-zA-Z]{2,15}$/,
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ name: v });
                return !name;
            },
            message: props => `The specified name is already in use.`
        },
        // minlength: 4,
        // maxlength: 15
    },
    code: {
        type: String,
        required: true,
        // enum :['red','Green']
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
    }
});

const colorModal = mongoose.model('color', colorSchema);

module.exports = colorModal;