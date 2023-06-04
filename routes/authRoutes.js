const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const userController = require('../controllers/userController');
const getIP = require('../middleware/getIP');
router.route('/signup') // /auth/signup
    .post(getIP,userController.signupUser)

router.route('/login') //      /auth/login
    .post(getIP,loginLimiter, authController.login)
    

router.route('/refresh')//     /auth/refresh
    .get(authController.refresh)

router.route('/logout') //      /auth/logout
    .post(authController.logout)
module.exports = router;