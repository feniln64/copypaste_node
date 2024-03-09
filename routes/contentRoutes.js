const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.route('/getcontent/:userId').get(contentController.getUserContent) // /content/getcontent/:userId
router.route('/create/:userId').post(contentController.createNewContent) // /content/create/:userId
router.route('/create/public/:userId').post(contentController.createNewContentPublic) // /content/create/:userId
router.route('/update/:userId').post(contentController.updateContentByUserId)  // /content/update/:userId
router.route('/update/:contentId').patch(contentController.updateContentByContentId)  // /content/update/:contentId
router.route('/update/public/:contentId').patch(contentController.updateContentByContentId)  // /content/update/:contentId
router.route('/delete/:contentId').delete(contentController.deleteContentByContentId) // /content/delete/:contentId

module.exports = router;
