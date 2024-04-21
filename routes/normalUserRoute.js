const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const domainController = require('../controllers/domainController');
const logging = require('../middleware/logging')
router.use(verifyJWT);

// Domain Routes
router.route('/')
    .get(logging,domainController.getUserDomains) //    /user/domains
    .post(logging,domainController.createNewDomain) //  /user/domains
    .patch(logging,domainController.updateDomain) //    /user/domains