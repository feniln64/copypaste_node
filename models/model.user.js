const mongoose = require('mongoose')

const userSchema =new mongoose.Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true,
        unique: true
    },
    name:{
        type: String,  //add constraint to frontend also minimum 3 characters required
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[{
        type: String,
        default:  "user"
    }],
    active:{
        type: Boolean,
        default: false
    },
    premium_user:{  
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User',userSchema)