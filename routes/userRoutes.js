const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user
const verifyRoles = require('../middleware/verifyRoles');
const contentController = require('../controllers/contentController');


router.use(verifyJWT);
// admin routes
router.route('/')
    .get(userController.getAllUsers) // /users
    .post(userController.createNewUser) // /users
    .delete(userController.deleteUser) // /users

router.route('/:userId/update')
    .patch(userController.updateUser) // /users/:email

router.route("/:userId/:content")
    .get(contentController.getUserContent) // /users/:email/content

router.route('/profile')            // /users/profile
    .get(userController.getUser)


module.exports = router;