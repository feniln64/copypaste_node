const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');

router.route('/getdata/:subdomain').get(initDataController.initData);
router.route('/dns').get(initDataController.getDns);
router.route('/version').get(initDataController.versionCheck);

module.exports = router;