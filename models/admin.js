const mongoose = require('mongoose')
const Admin = new mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String,
    userName:{
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin',Admin)