const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const qrSchema =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    qr_code:{
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    },
    is_protected:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Qr_code',qrSchema)