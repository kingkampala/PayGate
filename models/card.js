const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    expire_month: {
        type: String,
        required: true
    },
    expire_year: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;