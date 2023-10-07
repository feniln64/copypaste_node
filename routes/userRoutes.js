const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(userController.getAllUsers)
    .delete(userController.deleteUser)

router.route('/updateUser/:userId').patch(verifyJWT, userController.updateUser);
router.route('/updatePassword/:userId').patch(verifyJWT, userController.updatePassword);
router.route('/profile/:userId').get(verifyJWT, userController.getUser);

module.exports = router;