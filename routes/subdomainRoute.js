const express = require('express');
const router = express.Router();
const subdomainController = require('../controllers/domainController');
const verifyJWT = require('../middleware/verifyJWT');
const logging = require('../middleware/logging')

router.route('/create/:userId').post(logging,subdomainController.createNewSubdomain); // /subdomain/create/:userId
router.route('/getall').get(logging,subdomainController.getAllSubdomain);  // /subdomain/getall
router.route('/getsubdomain/:userId').get(logging,subdomainController.getSubdomainByUserId);  // /subdomain/getsubdomain/:userId
router.route('/update/:subdomainId').patch(logging,subdomainController.updateDomainBySubdomainId);  // /subdomain/update/:subdomainId
router.route('/delete/:subdomainId').delete(logging,subdomainController.deleteSubdomainbySubdoamin);  // /subdomain/delete/:subdoamin
router.route('/availability/:userId').get(logging,subdomainController.checkSubdomainAvailability);  // /subdomain/availability/:userId

module.exports = router;