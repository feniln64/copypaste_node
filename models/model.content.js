const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    },
    content: {
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    },
    is_protected: {
        type: Boolean,
        default: false,
        required: true
    },
    is_shared: {
        type: Boolean,
        default: false,
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Content', contentSchema)