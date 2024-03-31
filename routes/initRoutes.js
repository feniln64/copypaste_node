const express = require('express');
const router = express.Router();
const initDataController = require('../controllers/initController');
const logging = require('../middleware/logging')

router.route('/getdata/:subdomain').get(initDataController.initData);
router.route('/dns').get(initDataController.getDns);
router.route('/version').get(logging,initDataController.versionCheck);
router.route('/systeminfo').get(logging,initDataController.systeminformation);


module.exports = router;