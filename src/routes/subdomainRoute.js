const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const logging = require('../middleware/logging')

router.route('/create/:userId') // /subdomain/create/:userId
    .post(logging,subdomainController.createNewSubdomain);

router.route('/getall')  // /subdomain/getall
    .get(logging,subdomainController.getAllSubdomain);

router.route('/getsubdomain/:userId')  // /subdomain/getsubdomain/:userId
    .get(logging,subdomainController.getSubdomainByUserId);

router.route('/update/:userId')  // /subdomain/update/:userId
    .post(logging,subdomainController.updateDomain);

module.exports = router;