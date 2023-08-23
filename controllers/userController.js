const User = require('../models/model.user');
const Content = require('../models/model.content');
const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
})


// @desc    create users
// @route   POST /users
// @access  Private

const createNewUser = asyncHandler(async (req, res) => {
    const { email, username, name, password } = req.body;
    const roles = ["admin"];
    // check data
    console.log(email, username, name, password);
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

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { email, username, name, "password": hashedPassword, roles };

    // create user
    const user = await User.create(userObject);
    if (!user) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        // console.log("Admin is created");
        res.status(201).json({ message: `${user} created successfully` });
        // res.status(201).json({message: "User created successfully"});
    }
})

// @desc    update user
// @route   POST /user/:userId/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, name, username } = req.body;


    if (!email || !name, !username) {
        return res.status(400).json({ message: "Email and Name and Username is required" });
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
    } else {
        res.status(200).json({ message: `${name} updated successfully}` });
    }

})

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
    } else {
        res.status(200).json({ message: `Password updated successfully}` });
    }

})

// @desc    delete user
// @route   POST /users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log("Id is " + id);
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    //  check if user has content in the database
    // if yes then ask for delete content and then delete user
    // logic add remaining
    const content = await Content.find({ User: id }).lean().exec();

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = await user.deleteOne();
    if (!deleteUser) {
        res.status(500).json({ message: "Something went wrong" });
    } else {
        res.status(200).json({ message: `${user.name} deleted successfully}` });
    }
})

const getUser = asyncHandler(async (req, res) => {
    // const user = req.body;
    const userId = req.params.userId;
    // const email = req.query.email; // domaim.com/uri?email=xyz&name=abc
    console.log(userId);
    console.log("get user profile by ID called");
    // const token = req.cookies.jwt;
    // jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decodedToken) => {
    //     if (err) {
    //         console.log(err.message);
    //         res.locals.user = null;
    //         res.status(401).json({message: "Unauthorized"});
    //     } else {
    //         console.log(decodedToken);
    //     }});
    const user= await User.findOne({userId}).lean().exec();
    console.log(user);
    return res.status(200).json({ message: user });
    // const {email}=req.body;
    //     console.log("Id is "+email);
    //     if(!email){
    //         return res.status(400).json({message: "User Email is required"});
    //     }

    //     if(!user){
    //         return res.status(404).json({message: "User not found"});
    //     }

    //     res.status(200).json({user});
})


// @desc    delete user
// @route   POST /users
// @access  Public // no JWT required for signup as this is used for normal user 
//sighup and not for admin
const signupUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const roles = ["user"];
    // check data
    console.log(email, name, password);
    if (!email || !name || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    // return res.status(201).json({message: `${name} created successfully`});

    // check if user already exists
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { email, name, "password": hashedPassword, roles };

    // create user
    const user = await User.create(userObject);
    if (!user) {
        console.log("user not created")
        res.status(500).json({ message: "Something went wrong" });
    } else {
        console.log("Normal User is created");
        res.status(201).json({ message: `${user} created successfully` });
        // res.status(201).json({message: "User created successfully"});
    }
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    signupUser,
    updatePassword
}