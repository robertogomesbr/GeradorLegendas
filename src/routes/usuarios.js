const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.login('/login', userControllers.login);

router.cadastro('/cadastro', userControllers.cadastrar);

module.exports = router;