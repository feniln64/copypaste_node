const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.route('/getcontent/:userId') // /content/getcontent/:userId
    .get(contentController.getUserContent)

router.route('/create/:userId') // /content/create/:userId
    .post(contentController.createNewContent)

router.route('/update/:userId') // /content/update/:userId
    .post(contentController.updateUserContent) 

router.route('/delete/:userId') // /content/delete/:userId
    .delete(contentController.deleteUserContent) 

module.exports = router;
