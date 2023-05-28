const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(subdomainController.getAllSubdomain)
    .post(subdomainController.createNewSubdomain)

module.exports = router;