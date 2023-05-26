const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contentSchema =new mongoose.Schema({
    email:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content:{
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    },
    time_stamp:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Content',contentSchema)