const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const roles=require('../config/roles');// roles[0]== admin, roles[1]==moderator, roles[2]==user

router.use(verifyJWT);

router.route('/') 
    .get(subdomainController.getAllSubdomain)
    .post(subdomainController.createNewSubdomain)

module.exports = router;