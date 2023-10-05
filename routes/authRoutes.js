const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const userController = require('../controllers/userController');
const getIP = require('../middleware/getIP');
const verifyJWT = require('../middleware/verifyJWT');



router.route('/login') //      /auth/login
    .post(getIP,loginLimiter, authController.login)

router.route('/varify/email/:token') //      /auth/varify/email/:token
    .get(authController.varifyEmail)
router.route('/refresh')//     /auth/refresh
    .post(authController.refresh)

router.route('/logout') //      /auth/logout
    .post(authController.logout)


module.exports = router;