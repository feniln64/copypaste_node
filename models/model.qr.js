const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const qrSchema =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    s3_path:{
        type: String,  
        required: true
    },
    qr_type:{
        type: String,
        enum: ['url', 'text', 'email', 'phone', 'sms', 'vcard', 'meCard', 'wifi', 'geo', 'event', 'facebook', 'youtube', 'instagram', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'snapchat', 'pinterest', 'spotify', 'tiktok', 'tumblr', 'github', 'paypal', 'bitcoin', 'ethereum', 'litecoin', 'monero', 'binance', 'visa', 'mastercard', 'americanExpress', 'discover', 'dinersClub', 'jcb', 'unionPay', 'maestro', 'mir', 'paytm', 'phonePe', 'googlePay', 'amazonPay', 'applePay', 'alipay', 'weChatPay', 'other'],
        required: true,
        default: 'url'
    },
    valid_till:{  // in mins
        type: String,  
        required: true
    },
    is_protected:{
        type: Boolean,
        default: false,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Qr_code',qrSchema)