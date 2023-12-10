const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subscription_plan: { // free = 1 , basic = 2 or premium = 3
        type: Number,
        required: true,
        default: 1
    },
    subscription_current_period_start: { // date
        type: Date,
        required: true,
        default: Date.now
    },
    subscription_current_period_end: {
        type: Date,
        required: true,
        default: () => {
            const currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() + 100);
            return currentDate;
        }
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Subscription', subscriptionSchema)