const mongoose = require('mongoose');

const MenSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date:{
        type:String
    }
});

module.exports = mongoose.model('Men', MenSchema);
