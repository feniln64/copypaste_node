const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(contentController.getAllContent)
    .post(contentController.createNewContent)

module.exports = router;