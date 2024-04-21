const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const verifyJWT = require('../middleware/verifyJWT');
const logging = require('../middleware/logging')
// router.use(verifyJWT);


// router.route('/getcontent/:userId') // /permission/:userId
//     .get(permissionController.getUserpermission)

router.route('/create/:contentId').post(logging,permissionController.createNewPermission) // /permission/create/:contentId
router.route('/shared/withme/:userEmail').get(logging,permissionController.getSharedContentByUserEmail) // /permission/getsharedcontent/:userId
router.route('/update/:permissionId').patch(logging,permissionController.updatePermission)  // /permission/update/:userId
router.route('/delete/:permissionId').delete(logging,permissionController.deletePermissionByPermissionId)  // /permission/delete/:permissionId
router.route('/delete/:emailId/:contentId').delete(logging,permissionController.deletePermissionByContentId)  // /permission/delete/:permissionId


module.exports = router;
