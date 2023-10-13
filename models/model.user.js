const mongoose = require('mongoose');
const crypto = require("crypto");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,  //add constraint to frontend also minimum 3 characters required
            required: true,
            unique: true
        },
        name: {
            type: String,  //add constraint to frontend also minimum 3 characters required
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: Number, // Admin = 1, User = 2
            default: 2
        },
        active: {
            type: Boolean,
            default: true
        },
        premium_user: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        resetPasswordExpire: {
            type: Date,
            required: false
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


module.exports = mongoose.model('User', userSchema)