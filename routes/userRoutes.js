const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user
const verifyRoles = require('../middleware/verifyRoles');
const getUserContent = require('../controllers/contentController');


router.use(verifyJWT);
// admin routes
router.route('/')
    .get(userController.getAllUsers) // /users
    .post(verifyRoles(roles[0],roles[1]),userController.createNewUser) // /users
    .patch(verifyRoles(roles[0],roles[1]),userController.updateUser) // /users
    .delete(verifyRoles(roles[0]),userController.deleteUser) // /users

router.route('/:email')
    .get(userController.getUser) // /users/:email

router.route("/:email/:content")
    .get(getUserContent.getAllContent) // /users/:email/content

router.route('/profile')            // /users/profile
    .post(userController.getUser)
module.exports = router;