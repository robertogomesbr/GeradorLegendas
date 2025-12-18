const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const mediasController = require('../controllers/mediasController');

router.get('/medias/:id', usuariosController.auth, mediasController.show);

module.exports = router;