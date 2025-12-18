const express = require('express');
const router = express.Router();
const path = require('path');
const usuariosController = require('../controllers/usuariosController');
const legendasController = require('../controllers/legendasController');
const { route } = require('./usuarios');

router.get('/legenda/manual', usuariosController.auth, (req, res) => {

    const mediaId = req.query.mediaId;

    if (!mediaId) {
        return res.redirect('/private/modo.html');
    }

    res.sendFile(path.join(__dirname, '../../private/legenda/manual.html'));

});

router.post('/legendas', usuariosController.auth, legendasController.store);

router.get('/legendas/:mediaId', usuariosController.auth, legendasController.index);

router.put('/legendas/:id', usuariosController.auth, legendasController.update);

router.delete('/legendas/:id', usuariosController.auth, legendasController.destroy);

module.exports = router;