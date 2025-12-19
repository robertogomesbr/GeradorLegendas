const Media = require('../models/Media');

exports.show = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.session.usuarioId;

    const media = await Media.findOne({
        where: {
            id: id,
            usuario_id: usuario_id
        }
    });

    if (!media) {
        return res.status(404).json({ erro: 'Mídia não encontrada' });
    }

    res.status(200).json(media);
};