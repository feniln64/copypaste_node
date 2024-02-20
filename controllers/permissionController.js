const Content = require("../models/model.content");
const Subdomain = require("../models/model.subdomain");
const permission = require("../models/model.permission");

const asyncHandler = require("express-async-handler");
require("body-parser");
const sizeof = require("object-sizeof");
const { Permission } = require("@aws-sdk/client-s3");

// @desc    create content
// @route   POST /permission/create/:userId
// @access  Private
const createNewPermission = asyncHandler(async (req, res) => {
    console.log("createNewPermission by Id called");
    console.log(req.body);
    const { userList,permission_current_period_end } = req.body;
    const userId = req.params.userId;
    const permission_type=req.body.permission_type;
    
    // check data if all correct create "contentObject"
    if ( !permission_current_period_end || !userList) {
        return res.status(400).json({ message: "permission_current_period_end and userList required" });
    }
    const user_list = userList.split(',');
    console.log(user_list);
    const contentId = await Content.findOne({ userId }).lean().select('_id');
    const subdoaminId = await Subdomain.findOne({ userId }).lean().select('subdomainId');
    const permission_status=1;
    const permissionObject = { contentId,subdoaminId,permission_type:permission_type, user_ids:user_list,permission_current_period_end };
    const create= await permission.create(permissionObject);
    if (!create) {
        return res.status(500).json({ message: "Something went wrong" });
    } else if (create){
        return res
            .status(201)
            .json({ message: `permission created successfully` });
    }
    // check if content already exists the update content with new values

    if (already_exist) {
        const update_content = await Content.updateOne(contentObject);

        if (!update_content) {
            return res.status(500).json({ message: "Problem updating content" });
        } else {
            return res.status(201).json({ message: `content updated successfully` });
        }
    }

    // create content if not exists
    const createContent = await Content.create(contentObject);
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    } else {
        return res
            .status(201)
            .json({ message: `content ${content} created successfully` });
    }
});

// @desc    create content
// @route   POST /content/update/:userId
// @access  Private
const updatePermission = asyncHandler(async (req, res) => {
    const { content, is_protected } = req.body;
    const userId = req.params.userId;

    // check data if all correct create "contentObject"
    if (!content || typeof is_protected !== "boolean") {
        return res
            .status(400)
            .json({ message: "content and is_protected boolean is required" });
    }
    const content_size = sizeof(content);
    if (content_size > 28000) {
        return res.status(413).json({ message: "Content is to large" });
    }
    const contentObject = { userId, content, is_protected };

    const already_exist = await Content.findOne({ userId }).lean();

    if (already_exist) {
        const update_content = await Content.updateOne(contentObject);
        if (!update_content) {
            return res.status(500).json({ message: "Problem updating content" });
        } else {
            return res.status(201).json({ message: `content updated successfully` });
        }
    }

    // create content if not exists
    const createContent = await Content.create(contentObject);
    if (!createContent) {
        return res.status(500).json({ message: "Something went wrong" });
    } else {
        return res
            .status(201)
            .json({ message: `content ${content} created successfully` });
    }
});

// @desc    create content
// @route   DELETE /content/update/:userId
// @access  Private
const deletePermission = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // check if content already exists the update content with new values
    const already_exist = await Content.findOne({ userId }).lean();

    if (already_exist) {
        const update_content = await Content.deleteOne({ userId });
        if (!update_content) {
            return res.status(500).json({ message: "Problem deleting content" });
        } else {
            return res.status(201).json({ message: `content deleted successfully` });
        }
    }
});

module.exports = {
    createNewPermission,
    updatePermission,
    deletePermission,
};
