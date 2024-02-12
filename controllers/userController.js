const User = require('../models/model.user');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
require('dotenv').config()
require('body-parser');
const {EmailsApi,cf,minioClient} =require('../config/imports')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage })

// var Minio = require('minio')
// const { default: axios } = require('axios');

// const cf = axios.create({
//     baseURL: 'https://api.cloudflare.com/client/v4'
// });
// cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
// cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";


// var minioClient = new Minio.Client({
//   endPoint: '207.211.187.125',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'pPAzlk6rv4x34C6GoJEd',
//   secretKey: 'aYuVmUYJonn7ESKAcDOop1O2dEca0v3RipG3FUUx',
// })
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

    if (!email || !name, !username) return res.status(400).json({ message: "Email, Name and Username is required" });
    
    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const duplicate_email = await User.findOne({ email }).lean().exec();
    if (duplicate_email) return res.status(409).json({ message: "This email is already exists with another account" });
    
    const duplicate_username = await User.findOne({ username }).lean().exec();
    if (duplicate_username) return res.status(409).json({ message: "This username is already exists with another account" });
    
    user.email = email;
    user.name = name;
    user.username = username;

    const updateUser = await user.save();
    if (!updateUser) res.status(500).json({ message: "Something went wrong" });
    
    else res.status(200).json({ message: `${name} updated successfully}` });
    
});

const updateProfileImage = asyncHandler(async (req, res) => {
    console.log("update profile image called")
    const file = req.body.file;
    const username=req.body.username;
    const type = file.split(';')[0].split('/')[1];
    var buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    
    await minioClient.putObject('docopypaste', `profile/${username}/profile.${type}`, buf, function (err, objInfo) {
        if (err) {
            return console.log(err) // err should be null
        }
        console.log('Success', objInfo)
    })

    return res.status(200).send({ message: "File Uploaded", code: 200 });
    
});

const getProfile= asyncHandler(async (req, res) => {

    console.log("get user profile image by userid called")
    const userId=req.params.userId
    if (!userId) return res.status(400).json({ message: "Email, Name and Username is required" });
    
    const user = await User.findById({_id:userId }).exec();
    const username=user.username;
    if (!user) return res.status(404).json({ message: "User not found" });
    
    
    await minioClient.presignedUrl('GET', 'docopypaste', `profile/${username}/profile.png`, 24 * 60 * 60, function (err, presignedUrl) {
        if (err) return console.log(err); 
    return res.status(200).json({ signedUrl:presignedUrl });
      })

    
});
// @desc    update Password
// @route   POST /user/:userId/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {

    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password is required" });
    

    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    const updateUser = await user.save();
    if (!updateUser) res.status(500).json({ message: "Something went wrong" });
    
    else res.status(200).json({ message: `Password updated successfully}` });
    
});

const deleteUser = asyncHandler(async (req, res) => {
    const email = req.params.email;
    if (!email) {
        return res.status(400).json({ message: "require emial" });
    }

    // check if email already exists
    let duplicate_email = await User.findOne({ email }).lean().exec();
    if (!duplicate_email) {
        return res.status(409).json({ message: "user not found" });
    }

    let userId = duplicate_email._id

    console.log("userid = ", userId)
    let subdomain_object = await Subdomain.findOne({ userId }).lean().exec();
    if (!subdomain_object) {
        return res.status(409).json({ message: "subdoamin not found" });
    }
    console.log(subdomain_object)
    let dns_record_id = subdomain_object.dns_record_id;

    //  delete subdomain in cloudflare

    await cf.delete(`zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${dns_record_id}`)
        .then(async () => {
            console.log("subdoamin deleted successfully from cloudflare")
        })
        .catch((error) => {
            return res.status(409).json({ message: "error in function" });
        });

    await User.deleteOne({ _id:userId })
        .then(async () => {
            console.log("user deleted successfully")
            const deleteSubdomain = await Subdomain.deleteOne({ dns_record_id });
            if (!deleteSubdomain) {
                console.log("subdoamin not deleted")
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(409).json({ message: "error in function" });
        });

    return res.status(200).json({ message: "user deleted" });
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
    updatePassword,
    updateProfileImage,
    getProfile
}