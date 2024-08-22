const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [20, 'Password cannot exceed 20 characters']
    },
    type:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model('user', userschema);