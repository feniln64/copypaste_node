const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const verifyJWT = require('../middleware/verifyJWT');
const logging = require('../middleware/logging')
// router.use(verifyJWT);


// router.route('/getcontent/:userId') // /permission/:userId
//     .get(permissionController.getUserpermission)

router.route('/create/:contentId').post(logging,verifyJWT,permissionController.createNewPermission) // /permission/create/:contentId
router.route('/shared/withme/:userEmail').get(logging,verifyJWT,permissionController.getSharedContentByUserEmail) // /permission/getsharedcontent/:userId
router.route('/update/:permissionId').patch(logging,verifyJWT,permissionController.updatePermission)  // /permission/update/:userId
router.route('/delete/:permissionId').delete(logging,verifyJWT,permissionController.deletePermissionByPermissionId)  // /permission/delete/:permissionId
router.route('/delete/:emailId/:contentId').delete(logging,verifyJWT,permissionController.deletePermissionByContentId)  // /permission/delete/:permissionId


module.exports = router;
