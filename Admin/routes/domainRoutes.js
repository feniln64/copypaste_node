const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');


router.route('/') 
    .get(subdomainController.getAllSubdomain)
    .post(subdomainController.createNewSubdomain)

module.exports = router;