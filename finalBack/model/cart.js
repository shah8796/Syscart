const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true
    },
    
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);
