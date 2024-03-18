const Content = require('../models/model.content');
const User = require('../models/model.user');
const PermissionBy = require('../models/model.permissionBy');
const asyncHandler = require('express-async-handler');
const PermissionTo = require('../models/model.permissionTo');
require('body-parser');
const sizeof = require('object-sizeof');
const logger = require('../config/wtLogger');

// @desc    Get all subdoamins
// @route   GET /subdoamin
// @access  Private
const getAllContent = asyncHandler(async (req, res) => {

    const content = await Content.find().lean();
    if (!content?.length) {
        return res.status(404).json({ message: "No content found" });
    }
    res.json(content);
});

// @desc    create content
// @route   POST /content/create/:userId
// @access  Private
const createNewContent = asyncHandler(async (req, res) => {
    console.log("createNewContent called");
    const { content, is_protected, title, is_shared } = req.body;
    const userId = req.params.userId;

    // check data if all correct create "contentObject"
    if (!content || typeof is_protected !== "boolean" || !title || typeof is_shared !== "boolean") {
        return res.status(400).json({ message: "content and is_protected boolean and title is required" });
    }
    const content_size = sizeof(content);

    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    const contentObject = { userId, content, is_protected, title, is_shared };
    const count = await Content.countDocuments({ userId }).exec();
    const user = await User.findOne({ _id: userId }).lean().exec();

    if (count >= 5 && !user.premium_user) {
        return res.status(409).json({ message: "User already has 5 Content buy premium for more Content" });
    }
    else if (count >= 10 && user.premium_user) {
        return res.status(409).json({ message: "User already has 5 Content" });
    }

    const createContent = await Content.create(contentObject);
    const alldata = await Content.find({ userId: userId }).lean();
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ message: `content ${content} created successfully`,"createdContent":createContent, "content": alldata });
    }
});

// @desc    create content
// @route   POST /content/create/public/:userId
// @access  Public

const createNewContentPublic = asyncHandler(async (req, res) => {
    console.log("createNewContent public called");
    const { content, subdomain, title, is_shared } = req.body;
    const userId = req.params.userId;

    // check data if all correct create "contentObject"
    if (!content || !title || !is_shared) {
        return res.status(400).json({ message: "content and is_protected boolean and title is required" });
    }
    const content_size = sizeof(content);

    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    const contentObject = { userId, content, is_protected: false, title };
    const count = await Content.countDocuments({ userId }).exec();
    const user = await User.findOne({ _id: userId }).lean().exec();

    const createContent = await Content.create(contentObject);
    const alldata = await Content.find({ userId: userId, is_protected: false }).lean();
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ message: `content ${content} created successfully`, "content": alldata });
    }
});

// @desc    Get user content
// @route   GET /content/getcontent/:userId
// @access  Private
const getUserContent = asyncHandler(async (req, res) => {
    console.log("getUserContent called");
    const userId = req.params.userId; //doimain.com/users/email(value of email)
    console.log(userId);

    
    if (!userId) {
        return res.status(400).json({ message: "userId is required in params" });
    }
    const sharedByMe = await PermissionBy.find({owner_userId: userId}).lean().exec() || [];

    const already_exist = await Content.find({ userId }).lean();
    if (!already_exist || !already_exist.length) {
        return res.status(404).json({ message: "No content found" });
    }

    return res.json({ "content": already_exist ,"sharedByMe":sharedByMe});
});

// @desc    create content
// @route   POST /content/update/:userId
// @access  Private
const updateContentByUserId = asyncHandler(async (req, res) => {
    console.log("updateUserContent called");
    const { content, is_protected, is_shared } = req.body;
    const userId = req.params.userId;

    // check data if all correct create "contentObject"
    if (!content || typeof is_protected !== "boolean" || typeof is_shared !== "boolean") {
        return res.status(400).json({ message: "content and is_protected boolean is required" });
    }
    const content_size = sizeof(content);
    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    const contentObject = { userId, content, is_protected };

    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ userId }).lean();

    if (already_exist) {
        const update_content = await Content.updateOne(contentObject);

        if (!update_content) return res.status(500).json({ message: "Problem updating content" });

        else return res.status(201).json({ message: `content updated successfully` });

    }

    // create content if not exists
    const createContent = await Content.create(contentObject);
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ message: `content ${content} created successfully` });
    }
});

// @desc    update content
// @route   POST /update/:contentId
// @access  Public
const updateContentByContentId = asyncHandler(async (req, res) => {
    console.log("updateUserContent called");
    const { content, is_protected, title, is_shared } = req.body;
    const contentId = req.params.contentId;

    // check data if all correct create "contentObject"
    if (!content || typeof is_protected !== "boolean" || !title || typeof is_shared !== "boolean") {
        return res.status(400).json({ message: "content and is_protected boolean and title is required is required" });
    }
    const content_size = sizeof(content);
    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ _id: contentId }).exec();

    if (already_exist) {
        already_exist.content = content;
        already_exist.is_protected = is_protected;
        already_exist.title = title;

        const update_content = await already_exist.save();
        const updatedContent = await Content.findOne({ _id: contentId }).lean();
        if (!update_content) return res.status(500).json({ message: "Problem updating content" });

        else return res.status(200).json({ message: `content updated successfully`, updatedContent: updatedContent });

    }
    return res.status(404).json({ message: "No content found to update" });

});

// @desc    update content
// @route   POST /update/public/:contentId
// @access  Public

const updateContentByContentIdPublic = asyncHandler(async (req, res) => {
    console.log("updateUserContent called");
    const { content, title } = req.body;
    const contentId = req.params.contentId;

    // check data if all correct create "contentObject"
    if (!content || !title) {
        return res.status(400).json({ message: "content and is_protected boolean and title is required is required" });
    }
    const content_size = sizeof(content);
    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ _id: contentId }).exec();

    if (already_exist) {
        already_exist.content = content;
        already_exist.title = title;

        const update_content = await already_exist.save();
        const alldata = await Content.find({ userId: already_exist.userId, is_protected: false }).lean();
        if (!update_content) return res.status(500).json({ message: "Problem updating content" });

        else return res.status(200).json({ message: `content updated successfully`, "content": alldata });

    }
    return res.status(404).json({ message: "No content found to update" });

});

// // @desc    create content
// // @route   DELETE /content/update/:contentId
// // @access  Private
const deleteContentByContentId = asyncHandler(async (req, res) => {

    const contentId = req.params.contentId;
    if (!contentId) {
        return res.status(400).json({ message: "contentId is required in params" });
    }
    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ _id: contentId }).lean().exec();

    if (already_exist) {
        const delete_content = await Content.deleteOne({ _id: contentId }).exec();
        if (!delete_content) {
            return res.status(500).json({ message: "Problem deleting content" });
        }
        else {
            logger.info(`Content ${contentId} deleted successfully`);
            const permissionByContentId = await PermissionBy.find({ contentId }).lean().exec();
            const permission_by_id = permissionByContentId.map((item) => item._id);
            if (permissionByContentId) {
                const delete_permission = await PermissionBy.deleteMany({ contentId }).exec();

                if (!delete_permission) {
                    return res.status(500).json({ message: "Problem deleting permission in permission By" });
                }
                logger.info(`PermissionBy ${permission_by_id} deleted successfully`);
                const delete_permissionto = await PermissionTo.deleteMany({ permission_by_id: { $in: permission_by_id } }).exec();
                if (!delete_permissionto) {
                    return res.status(500).json({ message: "Problem deleting permission in permissionTo" });
                }
                logger.info(`PermissionTo ${permission_by_id} deleted successfully`);
                return res.status(201).json({ message: `content deleted successfully` });
            }
        }
    }
    return res.status(404).json({ message: "No content found to delete" });

});

module.exports = {
    getAllContent,
    createNewContent,
    getUserContent,
    updateContentByUserId,
    updateContentByContentId,
    updateContentByContentIdPublic,
    // deleteUserContent,
    createNewContentPublic,
    deleteContentByContentId
}