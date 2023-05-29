const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user
const verifyRoles = require('../middleware/verifyRoles');
const getUserContent = require('../controllers/contentController');
const domainController = require('../controllers/domainController');

router.use(verifyJWT);

// Domain Routes
router.route('/')
    .get(domainController.getUserDomains) //    /user/domains
    .post(domainController.createNewDomain) //  /user/domains