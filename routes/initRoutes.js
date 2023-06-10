const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');
const userController = require('../controllers/userController');

router.route('/') // /init
    .post(initDataController.initData)

// router.route('/profile') // /init/profile
//     .get(userController.getUser)
module.exports = router;