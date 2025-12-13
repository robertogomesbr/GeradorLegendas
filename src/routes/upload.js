const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');

router.post('/upload');

module.exports = router;