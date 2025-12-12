const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuariosController');

router.post('/login', usuariosControllers.login);

router.post('/cadastrar', usuariosControllers.cadastrar);

router.get('/me', usuariosControllers.auth, async (req, res) => {
    res.json({ msg: "Você está autenticado!", id: req.session.userId });
});

router.get('/logout', usuariosControllers.logout);

router.get('/me-dados', usuariosControllers.auth, usuariosControllers.pegarDadosUsuario);

router.post('/alterar', usuariosControllers.auth, usuariosControllers.alterarDados);


module.exports = router;