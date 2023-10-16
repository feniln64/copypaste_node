const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const domainController = require('../controllers/domainController');

router.use(verifyJWT);

// Domain Routes
router.route('/')
    .get(domainController.getUserDomains) //    /user/domains
    .post(domainController.createNewDomain) //  /user/domains
    .patch(domainController.updateDomain) //    /user/domains