const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user
const verifyRoles = require('../middleware/verifyRoles');
const contentController = require('../controllers/contentController');


// router.use(verifyJWT);
// admin routes
/**
 * @swagger
 * /user:
 *   post:
 *     description: Use to create new user
 *     responses:
 *       200:
 *         description: A successful response
 */
router.route('/')
    .get(userController.getAllUsers) // /user
    .post(userController.createNewUser) // /user
    .delete(userController.deleteUser) // /user
    

router.route('/:userId/updateUser')
    .patch(userController.updateUser) // /user/:userId/update

router.route('/:userId/updatePassword')
    .patch(userController.updatePassword) // /user/:userId/updatePassword

router.route("/:userId/:content")
    .get(contentController.getUserContent) // /user/:userId/content

router.route('/profile')            // /user/profile
    .get(userController.getUser)


module.exports = router;