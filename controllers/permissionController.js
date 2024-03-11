const Content = require("../models/model.content");
const Subdomain = require("../models/model.subdomain");
const permission = require("../models/model.permission");
const User = require("../models/model.user");
const asyncHandler = require("express-async-handler");
require("body-parser");
const sizeof = require("object-sizeof");
const { Permission } = require("@aws-sdk/client-s3");
const { exitOnError } = require("winston");

// @desc    create or update permission
// @route   POST /permission/create/:userId
// @access  Private
const createNewPermission = asyncHandler(async (req, res) => {
    console.log("createNewPermission by Id called");
    // console.log(req.body);
    const { userList, permission_current_period_end, permission_type } = req.body;
    const contentId = req.params.contentId;


    // check data if all correct create "contentObject"
    if (!permission_current_period_end || !userList || !contentId || !permission_type) {
        return res.status(400).json({ message: "permission_current_period_end and userList required" });
    }
    const already_exist = await permission.findOne({ contentId }).lean();
    if (already_exist) {
       await updatePermission(contentId, userList, permission_current_period_end, permission_type)
        .then((result) => {
            return res.status(201).json({ message: `permission updated successfully from update function` });
        })
        .catch((err) => {
           return res.status(500).json({ message: "Something went wrong in update function" });
        });
        
    }
    else{
        console.log("here")
    // const user_list = userList.split(',');
    // console.log(userList);
    var contentObject = await Content.findOne({ _id: contentId }).exec();
    const userId = contentObject.userId.toString();
    const Userobject = await User.findOne({ _id: userId }).lean().select('email');
    const email = Userobject.email;
    // const permission_status=1;
    const permissionObject = { contentId, owner_userId: userId, owner_email: email, permission_type: permission_type, user_emails: userList, permission_current_period_end };
    // console.log(permissionObject);
    const create = await permission.create(permissionObject);
    if (!create) {
        return res.status(500).json({ message: "Something went wrong" });
    } 
    contentObject.is_shared = true;
    const update_content = await contentObject.save();

    if (!update_content) {
        return res.status(500).json({ message: "Problem updating content" });
    }else{
        return res.status(201).json({ message: `permission created successfully` });
    }
        return res.status(201).json({ message: `permission created successfully` });
    }
});

// @desc    create content
// @route   POST /content/update/:userId
// @access  Private
const updatePermission = async (contentId,userList, permission_current_period_end, permission_type ) => {
   return new Response ("updatePermission by Id called")
}

const getSharedContentByUserId = asyncHandler(async (req,res) => {
    console.log("getSharedContentByUserId called");
    const userId = req.params.userId;
    const userpermission = await permission.find({owner_userId: userId}).lean();
    if (!userpermission) {
        return res.status(500).json({ message: "Problem getting shared content" });
    }
    return res.status(201).json({ message: `shared content fetched successfully`, userpermission });

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
    getSharedContentByUserId
};
