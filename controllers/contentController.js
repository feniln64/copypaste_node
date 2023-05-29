const Content = require('../models/model.content');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllContent = asyncHandler(async (req, res) => {
    const content = await Content.find().lean();
    if(!content?.length){
        return res.status(404).json({message: "No content found"});
    }
    res.json(content);
})


// @desc    create content
// @route   POST /content
// @access  Private
const createNewContent = asyncHandler(async (req, res) => {
    const {id,content,active}=req.body;
    console.log(id,content,typeof active);
    // check data
    
        if (!id || !content || typeof active !== "boolean" ) {
            return res.status(400).json({message: "Please enter all fields"});
        }

    // check if content already exists
        const duplicate = await Content.findOne({content}).lean().exec();
        if (duplicate) {
            return res.status(409).json({message: "Content already exists"});
        }

        const contentObject ={ id, content, active };
    
    // create content
        const createContent = await Content.create(contentObject);
        if (!createContent) {
            res.status(500).json({message: "Something went wrong"});
        }else{
            res.status(201).json({message: `content ${content} created successfully`});
            // res.status(201).json({message: "Content created successfully"});
        }
})

const getUserContent = asyncHandler(async (req, res) => {
    
    const content = await Content.find().lean();
    if(!content?.length){
        return res.status(404).json({message: "No content found"});
    }
    res.json(content);
})


module.exports = {
    getAllContent,
    createNewContent
}