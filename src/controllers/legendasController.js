const Legenda = require('../models/Legenda');

exports.store = async (req, res) => {
    const { mediaId, inicio, fim, texto } = req.body;

    if (!mediaId || !inicio || !fim || !texto) {
        return res.status(400).json({ erro: '' });
    };
};

exports.index = async (req, res) => {

};

exports.update = async (req, res) => {

};

exports.delete = async (req, res) => {

};