const Content = require("../models/model.content");
const Subdomain = require("../models/model.subdomain");
const PermissionBy = require("../models/model.permissionBy");
const PermissionTo = require("../models/model.permissionTo");
const User = require("../models/model.user");
const asyncHandler = require("express-async-handler");
require("body-parser");

// @desc    create or update permission
// @route   POST /permission/create/:userId
// @access  Private
const createNewPermission = asyncHandler(async (req, res) => {
    var permission_by_id = "";
    console.log("createNewPermission by Id called");
    // console.log(req.body);
    const { userList, permission_current_period_end, permission_type } = req.body;
    const contentId = req.params.contentId;


    // check data if all correct create "contentObject"
    if (!permission_current_period_end || !userList || !contentId || !permission_type) {
        return res.status(400).json({ message: "permission_current_period_end and userList required" });
    }
    const already_exist = await PermissionBy.findOne({ contentId }).lean();
    if (already_exist) {
        await updatePermission(contentId, userList, permission_current_period_end, permission_type)
            .then((result) => {
                return res.status(201).json({ message: `permission updated successfully from update function` });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Something went wrong in update function" });
            });
        }
        else { // create new permission
        console.log("create new permission");
        var contentObject = await Content.findOne({ _id: contentId }).exec();
        const userId = contentObject.userId.toString();

        const Userobject = await User.findOne({ _id: userId }).lean().select('email');
        const email = Userobject.email;

        const permissionObject = { contentId, owner_userId: userId, owner_email: email, permission_type: permission_type, user_emails: userList, permission_current_period_end };
        const create = await PermissionBy.create(permissionObject);
        if (!create) {
            return res.status(500).json({ message: "permission by not created" });
        }
        permission_by_id = create._id;
        console.log(permission_by_id);
        for (let i = 0; i < userList.length; i++) {
            const permissionObject = { permission_by_id,permission_to_email: userList[i] };
            const create = await PermissionTo.create(permissionObject);
            if (!create) {
                return res.status(500).json({ message: `permission for ${userList[i]} not created by ${email}` });
            }
        }
        contentObject.is_shared = true;
        const update_content = await contentObject.save();

        if (!update_content) {
            return res.status(500).json({ message: "Problem updating content" });
        }
        return res.status(201).json({ message: `permission created successfully` });
    }
});

// @desc    create content
// @route   POST /content/update/:userId
// @access  Private
const updatePermission = async (contentId, userList, permission_current_period_end, permission_type) => {
    return new Response("updatePermission by Id called")
}

const getSharedContentByUserEmail = asyncHandler(async (req, res) => {  // check  if i have permission to any content
    console.log("getSharedContentByUserId called");
    const emailId = req.params.userEmail;
    const sharedContentIds = [];
    const userpermission = await PermissionTo.find({ permission_to_email: emailId }).lean().exec();  /// check if user has permission to access content
    if (userpermission.length == 0) {
        return res.status(404).json({ message: "no shared content with you" });
    }
    
    for (let i = 0; i < userpermission.length; i++) {
        const contentObject=await PermissionBy.find({ _id: userpermission[i].permission_by_id}).lean().exec();
        const id=contentObject[0].contentId.toString();
        sharedContentIds.push(id);
    }
    const sharedContent = await Content.find({ _id: { $in: sharedContentIds } }).lean().exec();
    if (sharedContent.length == 0) {
        return res.status(404).json({ message: "permission exists but no shared content found with you" });
    }
    return res.status(201).json({ message: `shared content fetched successfully`, sharedContent });

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
    getSharedContentByUserEmail
};
