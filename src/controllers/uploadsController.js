const { Media } = require('../models');

exports.upload = async (req, res) => {

    if(!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const media = await Media.create({
        usuario_id: req.session.usuarioId,
        arquivo: req.file.filename,
        tipo: req.file.mimetype.startsWith('video') ? 'video' : 'audio',
        duracao: 0
    })

    return res.redirect(`/private/modo.html?mediaId=${media.id}`);
    
};