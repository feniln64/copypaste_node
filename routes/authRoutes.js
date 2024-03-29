const express = require('express');
const router = express.Router();
const {signupUser, login, refresh, logout, forgotPassword, resetPassword,varifyEmail,updatePassword} = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const getIP = require('../middleware/getIP');
const logging =require('../middleware/logging');

router.route('/sign-up').post(getIP,logging, signupUser);                      // /auth/sign-up
router.route('/sign-in').post(getIP,logging, loginLimiter, login);            // /auth/sign-in
router.route('/refresh').post(refresh);                                      // /auth/refresh                    
router.route('/logout').post(logout);                                        // /auth/logout
router.route('/forgot-password').post(forgotPassword);                            // /auth/forgot-password
router.route('/reset-password/:resetPasswordToken').post(resetPassword);        // /auth/reset-password/:resetPasswordToken
router.route('/update-password/:userId').patch(logging,updatePassword);         // /auth/update-password/:userId
router.route('/varify/email/:token').get(logging,varifyEmail);              // /auth/varify/email/:token
module.exports = router;