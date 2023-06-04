const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');
router.route('/') // /auth/signup
    .post(initDataController.initData)


module.exports = router;