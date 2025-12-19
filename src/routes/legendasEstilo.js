const express = require('express');
const router = express.Router();
const legendasEstiloController = require('../controllers/legendasEstiloController');
const usuariosController = require('../controllers/usuariosController');

router.post('/legenda-estilo/:mediaId', usuariosController.auth, legendasEstiloController.salvarOuAtualizar);

router.get('/legenda-estilo/:mediaId', usuariosController.auth, legendasEstiloController.buscar);

module.exports = router;