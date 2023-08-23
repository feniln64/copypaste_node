const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/getcontent/:userId') // /content/:userId
    .get(contentController.getUserContent)
    

router.route('/create/:userId') // /content/create/:userId
    .post(contentController.createNewContent)

router.route('/update/:userId') // /content/update/:userId
    .post(contentController.updateUserContent) 

router.route('/delete/:userId') // /content/delete/:userId
    .delete(contentController.deleteUserContent) 

module.exports = router;
