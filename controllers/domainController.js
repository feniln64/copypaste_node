const Content = require('../models/model.content');
const Subdomain = require('../models/model.subdomain');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllSubdomain = asyncHandler(async (req, res) => {
    const subdomains = await Subdomain.find().lean();
    if(!subdomains?.length){
        return res.status(404).json({message: "No subdomains found"});
    }
    res.json(subdomains);
})


// @desc    create subdomains
// @route   POST /subdomains
// @access  Private
const createNewSubdomain = asyncHandler(async (req, res) => {
    const {userId,subdomain,active}=req.body;
    console.log(userId,subdomain,typeof active);
    // check data
    
        if (!userId || !subdomain || typeof active !== "boolean" ) {
            return res.status(400).json({message: "Please enter all fields"});
        }

    // check if subdomain already exists
        const duplicate = await Subdomain.findOne({subdomain}).lean().exec();
        if (duplicate) {
            return res.status(409).json({message: "Subdomain already exists"});
        }

        const subdomainObject ={ userId, subdomain, active };
    
    // create subdomain
        const createSubdomain = await Subdomain.create(subdomainObject);
        if (!createSubdomain) {
            res.status(500).json({message: "Something went wrong"});
        }else{
            res.status(201).json({message: `subdomain ${subdomain} created successfully`});
            // res.status(201).json({message: "Subdomain created successfully"});
        }
})

// @desc    update subdomain
// @route   POST /subdoamin
// @access  Private || private means require token
const updateDomain = asyncHandler(async (req, res) => {
    const {userId,newDomain}=req.body;
    // console.log(email,name,roles,active,premium_user);
    console.log(req.body.id);
    if(!userId || !newDomain){
        return res.status(400).json({message: "Userid and New domain required.."});
    }

    const newSubDomain = await Subdomain.findOne({userId:userId}).exec();
    if(!newSubDomain){
        return res.status(404).json({message: "User not found"});
    }

    const duplicate = await Subdomain.findOne({subdomain:newDomain}).lean().exec();
    console.log("duplicate is ="+duplicate.subdomain);
    // if (duplicate && duplicate.email.toString() === email) {
    //     return res.status(409).json({message: "This email is already exists with another account"});
    // }

    if(duplicate){
        return res.status(409).json({message: "This domain is already exists with another user"});
    }

    const updateSubDomain  = await newSubDomain.save();
    if(!updateSubDomain){
        res.status(500).json({message: "Something went wrong"});
    }else{
        res.status(200).json({message: `${name} updated successfully}`});
    }
   
})

module.exports = {
    getAllSubdomain,
    createNewSubdomain,
    updateDomain
}