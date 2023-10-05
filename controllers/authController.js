const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/model.user');
const Subscription = require('../models/model.subscription');
const crypto = require("crypto");
require('dotenv').config()

// @desc    create users
// @route   POST /users
// @access  Private
const signupUser = asyncHandler(async (req, res) => {
    const { email, username, name, password, roles } = req.body;

    // check data
    if (!email || !username || !name || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    // check if user already exists
    const duplicate_email = await User.findOne({ email }).lean().exec();
    if (duplicate_email) {
        return res.status(409).json({ message: "Email is taken" });
    }

    const duplicate_username = await User.findOne({ email }).lean().exec();
    if (duplicate_username) {
        return res.status(409).json({ message: "Username is already taken" });
    }

    // // hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { email, username, name, password, roles };

    // create user
    const user = await User.create(userObject);
    await user.save();

    const subscription = await Subscription.create({
        userId: user._id,
    });

    if (!user || !subscription) {
        res.status(500).json({ message: "Something went wrong" });
    }
    else {
        res.status(201).json({ message: `${user.name} created successfully` })
    }
});

//@desc Login
//@route POST /auth/login
//@access public
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password both' });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser || !foundUser.active) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await foundUser.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": String(foundUser._id),
                "username": foundUser.name,
                "email": foundUser.email,
                "premium_user": foundUser.premium_user,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    )

    const userInfo = {
        "id": String(foundUser._id),
        "username": foundUser.name,
        "email": foundUser.email,
        "premium_user": foundUser.premium_user
    }

    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                "id": String(foundUser._id),
                "username": foundUser.name,
                "email": foundUser.email,
                "premium_user": foundUser.premium_user
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }

    )

    //create cookie wih refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000 //1d
    })

    res.status(200).json({ accessToken, userInfo });
});

//@desc Refresh token
//@route GET /auth/refresh
//@access public
const refresh = (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthenticated' })
    }
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthenticated' })
        }

        const foundUser = await User.findOne({ email: decoded.UserInfo.email });

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const userInfo = {
            "id": String(foundUser._id),
            "username": foundUser.name,
            "email": foundUser.email,
            "premium_user": foundUser.premium_user
        }

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": String(foundUser._id),
                    "username": foundUser.name,
                    "email": foundUser.email,
                    "premium_user": foundUser.premium_user,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({ accessToken, userInfo })
    }));
}

//@desc Logout
//@route POST /auth/logout
//@access public
const logout = (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(204).json({ message: 'Unauthenticated' })
    }
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logout Successfully' });
}

//@desc Forgot Password
//@route POST /auth/forgotPassword
//@access public
const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Please enter email' });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser || !foundUser.active) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    const resetToken = foundUser.getResetPasswordToken();
    await foundUser.save();

    const requestUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

    res.status(200).json({message: 'OK', requestUrl : requestUrl});
});

//@desc Reset Password
//@route POST /auth/reset-password
//@access public
const resetPassword = asyncHandler(async (req, res) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetPasswordToken).digest('hex');

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

    if(!user){
        res.status(401).json({ message: 'Invalid token' });
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).json({message: 'Password reset successfully!!'});
});

module.exports = {
    signupUser,
    login,
    refresh,
    logout,
    forgotPassword,
    resetPassword
}
