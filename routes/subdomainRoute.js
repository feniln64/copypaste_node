const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const logging = require('../middleware/logging')

router.route('/create/:userId').post(logging,subdomainController.createNewSubdomain); // /subdomain/create/:userId
router.route('/getall').get(logging,subdomainController.getAllSubdomain);  // /subdomain/getall
router.route('/getsubdomain/:userId').get(logging,subdomainController.getSubdomainByUserId);  // /subdomain/getsubdomain/:userId
router.route('/update/:userId').post(logging,subdomainController.updateDomain);  // /subdomain/update/:userId
router.route('/delete/:subdomain').delete(logging,subdomainController.deleteSubdomainbySubdoamin);  // /subdomain/delete/:subdoamin
router.route('/availability/:userId').get(logging,subdomainController.checkSubdomainAvailability);  // /subdomain/availability/:userId

module.exports = router;