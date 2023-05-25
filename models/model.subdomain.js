const mongoose = require('mongoose')

const subDoaminSchema =new mongoose.Schema({
    email:{
        type: mangoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    active:{
        type: Boolean,
        default: ture
    },
    time_stamp:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Subdomain',subDoaminSchema)