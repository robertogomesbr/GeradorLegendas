const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');
const upload = require('../middlewares/uploads');

router.post('/upload', upload.single('media'), uploadsController.upload);

module.exports = router;