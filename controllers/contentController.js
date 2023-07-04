const Content = require('../models/model.content');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllContent = asyncHandler(async (req, res) => {
    const content = await Content.find().lean();
    if (!content?.length) {
        return res.status(404).json({ message: "No content found" });
    }
    res.json(content);
})


// @desc    create content
// @route   POST /content/create/:userId
// @access  Private
const createNewContent = asyncHandler(async (req, res) => {
    const { content, is_protected } = req.body;
    const userId = req.params.userId;
    // console.log(content);

    // check data if all correct ctreate "contentObject"
    if (!content || typeof is_protected !== "boolean") {
        return res.status(400).json({ message: "content and is_protected boolean is required" });
    }
    const contentObject = { userId, content, is_protected };

    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ userId }).lean();
    console.log("already_exist =", already_exist);
    if (already_exist) {
        
        const update_content= await Content.updateOne(contentObject);
        console.log(update_content);
        if (!update_content) {
            console.log("update_content =", update_content);
            return res.status(500).json({ message: "Problem updating cpontent" });
        } else {
            return res.status(201).json({ message: `content updateaed successfully` });
            // res.status(201).json({message: "Content created successfully"});
        }
        // return res.status(409).json({ message: "Content already exists" });
    }

    // create content if not exists
    const createContent = await Content.create(contentObject);
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    } else {
        return res.status(201).json({ message: `content ${content} created successfully` });
        // res.status(201).json({message: "Content created successfully"});
    }
})


// @desc    Get user content
// @route   GET /content/:userId
// @access  Private
const getUserContent = asyncHandler(async (req, res) => {

    const userId = req.params.userId; //doimain.com/users/email(value of email)
    // const content = req.params.content;
    const already_exist = await Content.findOne({ userId }).lean().exec();
    if (!already_exist) {
        return res.status(404).json({ message: "No content found" });
    }

    return res.json(already_exist['content']);
    // const content = await Content.find().lean();
    // if (!content?.length) {
    //     return res.status(404).json({ message: "No content found" });
    // }
    // res.json(content);


})


module.exports = {
    getAllContent,
    createNewContent,
    getUserContent
}