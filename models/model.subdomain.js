const mongoose = require('mongoose')

const subDoaminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subdomain: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    dns_record_id: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Subdomain', subDoaminSchema)