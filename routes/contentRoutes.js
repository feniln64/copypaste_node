const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/:userId')
    .get(contentController.getUserContent)
    

router.route('/create/:userId')
    .post(contentController.createNewContent)

module.exports = router;
