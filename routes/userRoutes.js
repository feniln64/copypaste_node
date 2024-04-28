const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const logging = require('../middleware/logging')

router.route('/all')
    .get(userController.getAllUsers)
    .delete(userController.deleteUser)

router.route('/updateuser/:userId').patch(logging, userController.updateUser);
router.route('/updateProfileImage/:userId').post( logging,userController.updateProfileImage);
router.route('/getProfile/:userId').get(logging,verifyJWT,userController.getProfile)
router.route('/updatePassword/:userId').patch(logging, userController.updatePassword);
router.route('/profile/:userId').get(logging, userController.getUser);
router.route('/delete/:email').delete( logging,userController.deleteUser);
router.route('/contact-us').post(logging, userController.contactUs);

module.exports = router;