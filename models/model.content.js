const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contentSchema =new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content:{
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Content',contentSchema)