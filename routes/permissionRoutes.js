const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);


// router.route('/getcontent/:userId') // /permission/:userId
//     .get(permissionController.getUserpermission)

router.route('/create/:contentId').post(permissionController.createNewPermission) // /permission/create/:contentId
router.route('/shared/withme/:userEmail').get(permissionController.getSharedContentByUserEmail) // /permission/getsharedcontent/:userId
router.route('/update/:permissionId').patch(permissionController.updatePermission)  // /permission/update/:userId
router.route('/delete/:permissionId').delete(permissionController.deletePermissionByPermissionId)  // /permission/delete/:permissionId
router.route('/delete/:emailId/:contentId').delete(permissionController.deletePermissionByContentId)  // /permission/delete/:permissionId


module.exports = router;
