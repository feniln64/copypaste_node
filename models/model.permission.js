const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Content'
    },
    subdoaminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subdomain'
    },
    permission_status: {  // true means active and false means inactive
        type: Boolean,
        default: true,
        required: true
    },
    permission_type: { // 0 = none ,1 = read, 2 = read and write
        type: Number,
        default: 0,
        required: true
    },
    user_ids: {
        type: [{ type: String }],
        required: true,
        ref: 'User'
    },
    permission_current_period_start: { // date
        type: Date,
        required: true,
        default: Date.now
    },
    permission_current_period_end: {
        type: Date,
        required: true,
        default: Date.now + 24 * 60 * 60 * 1000  // ask this end date default should be 1 day
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('permission', permissionSchema)