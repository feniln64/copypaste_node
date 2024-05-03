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
    const { userList, permission_type } = req.body;
    const contentId = req.params.contentId;


    // check data if all correct create "contentObject"
    if ( !userList || !contentId || !permission_type) {
        return res.status(400).json({ message: "permission type and userList required" });
    }
    // check permission exists for content id
    const permission_exists = await PermissionBy.findOne ({ contentId: contentId }).exec();
    if (permission_exists) {
        console.log("permission exists for content id");
        permission_exists.permission_type = permission_type;
        permission_exists.user_emails = userList;
        for (let i = 0; i < userList.length; i++) {
            const permissionObject = { permission_by_id: permission_exists._id, permission_to_email: userList[i] };
            const create = await PermissionTo.create(permissionObject);
            if (!create) {
                return res.status(500).json({ message: `permission for ${userList[i]} not created` });
            }
        }
        const update_permission = await permission_exists.save();
        const all_permissions = await PermissionBy.find({ owner_email: permission_exists.owner_email }).exec();
        if (!update_permission) {
            return res.status(500).json({ message: "Problem updating permission" });
        }
        return res.status(201).json({ message: `permission updated successfully` ,sharedbyMe: all_permissions });
    }
    // create new permission
    console.log("create new permission");
    var contentObject = await Content.findOne({ _id: contentId }).exec();
    if (!contentObject) {
        return res.status(404).json({ message: "content not found to give permission" });
    }
    const userId = contentObject.userId.toString();

    const Userobject = await User.findOne({ _id: userId }).lean().select('email');
    const email = Userobject.email;

    const permissionObject = { contentId, owner_userId: userId, owner_email: email, permission_type: permission_type, user_emails: userList };
    const create = await PermissionBy.create(permissionObject);
    if (!create) {
        return res.status(500).json({ message: "permission by not created" });
    }
    permission_by_id = create._id;
    console.log(permission_by_id);
    for (let i = 0; i < userList.length; i++) {
        const permissionObject = { permission_by_id, permission_to_email: userList[i] };
        const create = await PermissionTo.create(permissionObject);
        if (!create) {
            return res.status(500).json({ message: `permission for ${userList[i]} not created by ${email}` });
        }
    }
    contentObject.is_shared = true;
    const update_content = await contentObject.save();
    
    const all_permissions = await PermissionBy.find({ owner_email:email }).exec();
    console.log(all_permissions);
    if (!update_content) {
        return res.status(500).json({ message: "Problem updating content" });
    }
    return res.status(201).json({ message: `permission created successfully`,sharedbyMe: all_permissions });

});

// @desc    create content
// @route   PATCH /permission/update/:permissionId  
// @access  Private
const updatePermission = asyncHandler(async (req, res) => {
    const permissionId = req.params.permissionId;
    const { userList, permission_current_period_end, permission_type } = req.body;
    const contentId = req.params.contentId;
    console.log("updatePermission by Id called");
    // check data if all correct create "contentObject"
    if (!permission_current_period_end || !userList || !contentId || !permission_type || permissionId) {
        return res.status(400).json({ message: "permission_current_period_end and userList required" });
    }

    const permission_object = await PermissionBy.findOne({ _id: permissionId }).exec();
    if (!permission_object) {
        return res.status(404).json({ message: "permission not found" });
    }

    permission_object.permission_current_period_end = permission_current_period_end;
    permission_object.permission_type = permission_type;
    permission_object.user_emails = userList;

    const update_permission = await permission_object.save();
    if (!update_permission) {
        return res.status(500).json({ message: "Problem updating permission" });
    }
    return res.status(201).json({ message: `permission updated successfully` });

})

// @desc    delete permission by permissionId
// @route   DELETE /permission/delete/:permissionId
// @access  Private
const deletePermissionByPermissionId = asyncHandler(async (req, res) => {
    const permissionId = req.params.permissionId;
    console.log("deletePermissionByPermissionId called");
    const permission_object = await PermissionBy.findOne({ _id: permissionId }).exec();
    if (!permission_object) {
        return res.status(404).json({ message: "permission not found" });
    }
    const permission_to_object = await PermissionTo.deleteMany({ permission_by_id: permissionId }).exec();
    if (!permission_to_object) {
        return res.status(500).json({ message: "Problem deleting permission" });
    }
    const delete_permission = await PermissionBy.deleteOne({ _id: permissionId }).exec();
    if (!delete_permission) {
        return res.status(500).json({ message: "Problem deleting permission" });
    }
    return res.status(201).json({ message: `permission deleted successfully` });
});

// @desc    get shared content by user email
// @route   GET /permission/getSharedContentByUserEmail/:userEmail
// @access  Private
const getSharedContentByUserEmail = asyncHandler(async (req, res) => {  // check  if i have permission to any content
    const emailId = req.params.userEmail;
    const sharedContent = [];
    const userpermission = await PermissionBy.find({ user_emails: emailId }).lean().exec();  /// check if user has permission to access content
    if (userpermission.length == 0) {
        return res.status(404).json({ message: "no shared content with you" });
    }
    for (let i = 0; i < userpermission.length; i++) {
        const id = userpermission[i].contentId.toString();
        const type = userpermission[i].permission_type;
        const sharedContentObject = await Content.find({ _id: id }).lean().exec();
        if (sharedContentObject.length == 0) {
            return res.status(404).json({ message: "permission exists but no shared content found with you" });
        }
        sharedContentObject[0].permission_type = type;
        sharedContent.push( sharedContentObject[0] );
    }
    return res.status(201).json({ message: `shared content fetched successfully`, sharedContent });

});


const deletePermissionByContentId = asyncHandler(async (req, res) => {
    const contentId = req.params.contentId;
    const emailId = req.params.emailId;
    if (!contentId || !emailId) {
        return res.status(400).json({ message: "contentId and emailId required in params" });
    }
    console.log("deletePermissionByContentId called");
    const permission_object = await PermissionBy.findOne({ contentId: contentId }).exec();
    if (!permission_object) {
        return res.status(404).json({ message: "permission not found" });
    }
    const owner = permission_object.owner_email;
    const permission_to_object = await PermissionTo.deleteMany({ permission_by_id: permission_object._id, permission_to_email: emailId }).exec();
    if (!permission_to_object) {
        return res.status(500).json({ message: "Problem deleting permission" });
    }
    permission_object.user_emails = permission_object.user_emails.filter(e => e !== emailId);
    const update_permission = await permission_object.save();
    if (!update_permission) {
        return res.status(500).json({ message: "Problem updating permission" });
    }
    const all_permissions = await PermissionBy.find({ owner_email: owner }).exec();
    if (!all_permissions) {
        return res.status(500).json({ message: "Problem fetching all permissions" });
    }
   /*  const delete_permission = await PermissionBy.deleteOne({ contentId: contentId }).exec();
    if (!delete_permission) {
        return res.status(500).json({ message: "Problem deleting permission" });
    } */
    return res.status(201).json({ message: `permission deleted successfully`,sharedbyMe: all_permissions});
});
module.exports = {
    createNewPermission,
    updatePermission,
    deletePermissionByPermissionId,
    getSharedContentByUserEmail,
    deletePermissionByContentId
};
