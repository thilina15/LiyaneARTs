const mongoose = require('mongoose')
const artSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    description: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ARTs',artSchema)