const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const verifyJWT = require('../middleware/verifyJWT');
const logging = require('../middleware/logging')

router.route('/getcontent/:userId').get(logging, contentController.getUserContent) // /content/getcontent/:userId
router.route('/create/:userId').post(logging, contentController.createNewContent) // /content/create/:userId
router.route('/create/public/:userId').post(logging, contentController.createNewContentPublic) // /content/create/:userId  // no jwt token
router.route('/update/:userId').post(logging, contentController.updateContentByUserId)  // /content/update/:userId
router.route('/update/:contentId').patch(logging, contentController.updateContentByContentId)  // /content/update/:contentId
router.route('/update/public/:contentId').patch(logging, contentController.updateContentByContentId)  // /content/update/:contentId   // no jwt token
router.route('/delete/:contentId').delete(logging, contentController.deleteContentByContentId) // /content/delete/:contentId
router.route('/update/shared/:contentId').patch(logging, contentController.updateSharedContent) // /content/update/shared/:contentId

module.exports = router;
