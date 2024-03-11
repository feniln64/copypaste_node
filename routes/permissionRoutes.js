const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);


// router.route('/getcontent/:userId') // /permission/:userId
//     .get(permissionController.getUserpermission)

router.route('/create/:contentId').post(permissionController.createNewPermission) // /permission/create/:contentId
router.route('/getsharedcontent/:userId').get(permissionController.getSharedContentByUserId) // /permission/getsharedcontent/:userId
router.route('/update/:userId').post(permissionController.updatePermission)  // /permission/update/:userId
router.route('/delete/:userId').delete(permissionController.deletePermission)  // /permission/delete/:userId
    

module.exports = router;
