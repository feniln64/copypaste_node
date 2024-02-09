const express = require('express');
const router = express.Router();
const {signupUser, login, refresh, logout, forgotPassword, resetPassword,varifyEmail} = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const getIP = require('../middleware/getIP');
const logging =require('../middleware/logging');

router.route('/sign-up').post(getIP, signupUser);
router.route('/sign-in').post(getIP,logging, loginLimiter, login);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:resetPasswordToken').post(resetPassword);
router.route('/varify/email/:token').get(varifyEmail);
module.exports = router;