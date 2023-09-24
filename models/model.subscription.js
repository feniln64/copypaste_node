const mongoose = require('mongoose')

const subscriptionSchema =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subscription_status:{  // true means active and false means inactive
        type: Boolean,
        required: true
    },
    subscription_plan:{  // free , basic or premium
        type: String,
        required: true,
        default: "free"
    },
    subscription_current_period_start:{ // date
        type: Date,
        required: true,
        default: Date.now
    },
    subscription_current_period_end:{
        type: Date,
        required: true,
        default: Date.now+30*24*60*60*1000  // ask this end date default should be 100 years
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Subscription',subscriptionSchema)