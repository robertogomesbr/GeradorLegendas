const { where } = require('sequelize');
const Legenda = require('../models/Legenda');

exports.store = async (req, res) => {
    const { mediaId, inicio, fim, texto } = req.body;

    if (!mediaId || inicio == null || fim == null || !texto) {
        return res.status(400).json({ erro: 'Dados incompletos' });
    };

    const legenda = legenda.create({
        media_id: mediaId,
        inicio,
        fim,
        texto,
    });

    res.status(200).json(legenda);
};

exports.index = async (req, res) => {
    const { mediaId } = req.body;

    const legendas = await legenda.findAll({
        where: {media_id: mediaId},
        order: [['inicio', 'ASC']]
    });

    res.json(legendas);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { inicio, fim, texto } = req.body;

    const legenda = legenda.findByPk(id);

    if (!legenda) {
        return res.status(404).json({ erro: 'Legenda não encontrada' });
    }

    await legenda.update({ inicio, fim, texto });
    res.status(200).json(legenda);
};

exports.destroy = async (req, res) => {
    const { id } = req.params;

    const legenda = legenda.findByPk(id);

    if (!legenda) {
        return res.status(404).json({ erro: 'Legenda não encontrada' });
    }

    await legenda.destroy();
    res.status(204).send();
};