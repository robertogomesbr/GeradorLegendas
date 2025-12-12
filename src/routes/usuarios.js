const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuariosController');

router.post('/login', usuariosControllers.login);

router.post('/cadastrar', usuariosControllers.cadastrar);

module.exports = router;