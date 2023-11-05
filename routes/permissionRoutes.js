const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);


// router.route('/getcontent/:userId') // /permission/:userId
//     .get(permissionController.getUserpermission)

router.route('/create/:userId') // /permission/create/:userId
    .post(permissionController.createNewPermission)

router.route('/update/:userId') // /permission/update/:userId
    .post(permissionController.updatePermission) 

router.route('/delete/:userId') // /permission/delete/:userId
    .delete(permissionController.deletePermission) 

module.exports = router;
