const mongoose = require('mongoose')
const artSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    imageType:{
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

artSchema.virtual('imagePath').get(function(){
    if(this.image!=null && this.imageType!==null){
        return `data: ${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})

module.exports = mongoose.model('ARTs',artSchema)