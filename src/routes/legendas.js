const express = require('express');
const router = express.Router();
const path = require('path');
const usuariosController = require('../controllers/usuariosController');
const { route } = require('./usuarios');

router.get('/legenda/manual', usuariosController.auth, (req, res) => {

    const file = req.query.file;

    if (!file) {
        return res.redirect('/private/modo.html');
    }

    res.sendFile(path.join(__dirname, '../../private/legenda/manual.html'));

});

module.exports = router;