const User = require('../models/model.user');
const Content = require('../models/model.content');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(404).json({message: "No users found"});
    }
    res.json(users);
})


// @desc    create users
// @route   POST /users
// @access  Private
const createNewUser = asyncHandler(async (req, res) => {
    const {email,name,password,roles}=req.body;

    // check data
    console.log(email,name,password);
        if (!email || !name || !password || !Array.isArray(roles)) {
            return res.status(400).json({message: "Please enter all fields"});
        }

    // check if user already exists
        const duplicate = await User.findOne({email}).lean().exec();
        if (duplicate) {
            return res.status(409).json({message: "User already exists"});
        }
    
    // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userObject ={ email, name,"password": hashedPassword, roles };
    
    // create user
        const user = await User.create(userObject);
        if (!user) {
            console.log(typeof user);
            res.status(500).json({message: "Something went wrong"});
        }else{
            res.status(201).json({message: `${user} created successfully`});
            // res.status(201).json({message: "User created successfully"});
        }
})

// @desc    update user
// @route   POST /users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const {user_id,email,name,password,roles,active,premium_user}=req.body;

    if(!email || !name || !password || !Array.isArray(roles) || typeof active !== "boolean" || !premium_user){
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await User.findById(user_id).exec();
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const duplicate = await User.findOne({email}).lean().exec();
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({message: "User already exists"});
    }

    user.email = email;
    user.name = name;
    user.roles = roles;
    user.active = active;
    user.premium_user = premium_user;

    if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    const updateUser  = await user.save();
    if(!updateUser){
        res.status(500).json({message: "Something went wrong"});
    }else{
        res.status(200).json({message: `${name} updated successfully}`});
    }
   
})

// @desc    delete user
// @route   POST /users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id}=req.body;
    if(!id){
        return res.status(400).json({message: "User ID is required"});
    }

     // check if user has content in the database
    //if yes then ask for delete content and then delete user
    //logic add remaining
    const content = await Content.find({User: id}).lean().exec();

    const user= await User.findById(id).exec();
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const deleteUser = await user.deleteOne();
    if(!deleteUser){
        res.status(500).json({message: "Something went wrong"});
    }else{
        res.status(200).json({message: `${user.name} deleted successfully}`});
    }
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}