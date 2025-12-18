const Media = require('../models/Media');

exports.show = async (req, res) => {
    const { id } = req.params;

    const media = await Media.findByPk(id);

    if (!media) {
        return res.status(404).json({ erro: 'Mídia não encontrada' });
    }

    res.status(200).json(media);
};