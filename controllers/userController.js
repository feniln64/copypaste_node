const User = require('../models/model.user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
require('body-parser');

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
});

// @desc    update user
// @route   POST /user/:userId/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

    const { email, name, username } = req.body;

    if (!email || !name, !username) {
        return res.status(400).json({ message: "Email, Name and Username is required" });
    }

    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const duplicate_email = await User.findOne({ email }).lean().exec();
    if (duplicate_email) {
        return res.status(409).json({ message: "This email is already exists with another account" });
    }

    const duplicate_username = await User.findOne({ username }).lean().exec();
    if (duplicate_username) {
        return res.status(409).json({ message: "This username is already exists with another account" });
    }

    user.email = email;
    user.name = name;
    user.username = username;

    const updateUser = await user.save();
    if (!updateUser) {
        res.status(500).json({ message: "Something went wrong" });
    }
    else {
        res.status(200).json({ message: `${name} updated successfully}` });
    }
});

// @desc    update Password
// @route   POST /user/:userId/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {

    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    const updateUser = await user.save();
    if (!updateUser) {
        res.status(500).json({ message: "Something went wrong" });
    }
    else {
        res.status(200).json({ message: `Password updated successfully}` });
    }
});

// @desc    delete user
// @route   POST /users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {

    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = await user.deleteOne();
    if (!deleteUser) {
        res.status(500).json({ message: "Something went wrong" });
    }
    else {
        res.status(200).json({ message: `${user.name} deleted successfully}` });
    }
});

const getUser = asyncHandler(async (req, res) => {

    const userId = req.params.userId;
    const user = await User.findOne({ userId }).lean().exec();

    return res.status(200).json({ message: user });
});

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser,
    updatePassword
}