const mongoose = require('mongoose')

const permissionToSchema = new mongoose.Schema({
    permission_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PermissionBy'
    },
    permission_to_email: {    // email of user whome permission is given
        type: String,
        required: true,
        ref: 'User'
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('PermissionTo', permissionToSchema)