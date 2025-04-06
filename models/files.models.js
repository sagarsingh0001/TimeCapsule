const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: [true , 'path is required'],
    },
    originalname:{
        type: String,
        required: [true , 'original name is required']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,  //this tells that a ID is going to present inside this field.
        ref:'users',
        required:[true , 'user is required']
    }
})

const file = mongoose.model('file' , fileSchema);

module.exports = file;