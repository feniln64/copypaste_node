const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user

// router.use(verifyJWT);

router.route('/create/:userId') // /subdomain/create/:userId
    .post(subdomainController.createNewSubdomain)

router.route('/getall')  // /subdomain/getall
    .get(subdomainController.getAllSubdomain)

router.route('/getsubdomain/:userId')  // /subdomain/getsubdomain/:userId
    .get(subdomainController.getSubdomainByUserId)

router.route('/update/:userId')  // /subdomain/update/:userId
    .post(subdomainController.updateDomain)

module.exports = router;