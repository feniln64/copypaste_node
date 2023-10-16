const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');

router.route('/create/:userId') // /subdomain/create/:userId
    .post(subdomainController.createNewSubdomain);

router.route('/getall')  // /subdomain/getall
    .get(subdomainController.getAllSubdomain);

router.route('/getsubdomain/:userId')  // /subdomain/getsubdomain/:userId
    .get(subdomainController.getSubdomainByUserId);

router.route('/update/:userId')  // /subdomain/update/:userId
    .post(subdomainController.updateDomain);

module.exports = router;