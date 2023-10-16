const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');

router.route('/').post(initDataController.initData);
router.route('/dns').get(initDataController.getDns);

module.exports = router;