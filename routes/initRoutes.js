const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');

router.route('/:subdomain').get(initDataController.initData);
router.route('/dns').get(initDataController.getDns);

module.exports = router;