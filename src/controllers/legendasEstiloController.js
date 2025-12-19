const { LegendaEstilo, Media } = require('../models');

exports.salvarOuAtualizar = async (req, res) => {
    const { mediaId } = req.params;
    const usuarioId = req.session.usuarioId;

    const {
        fonte,
        tamanho,
        cor_texto,
        cor_fundo,
        transparencia,
        posicao_y
    } = req.body;

    if (
        !fonte ||
        !tamanho ||
        !cor_texto ||
        !cor_fundo ||
        transparencia === undefined ||
        !posicao_y
    ) {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
    }

    try {
        const media = await Media.findOne({
            where: {
                id: mediaId,
                usuario_id: usuarioId
            }
        });

        if (!media) {
            return res.status(403).json({ erro: 'Acesso negado' });
        }

        const [estilo, created] = await LegendaEstilo.findOrCreate({
            where: { media_id: mediaId },
            defaults: {
                fonte,
                tamanho,
                cor_texto,
                cor_fundo,
                transparencia,
                posicao_y
            }
        });

        if (!created) {
            await estilo.update({
                fonte,
                tamanho,
                cor_texto,
                cor_fundo,
                transparencia,
                posicao_y
            });
        }

        res.json(estilo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao salvar estilo da legenda' });
    }
};

exports.buscar = async (req, res) => {
    const { mediaId } = req.params;
    const usuarioId = req.session.usuarioId;

    try {
        const estilo = await LegendaEstilo.findOne({
            include: {
                model: Media,
                where: {
                    id: mediaId,
                    usuario_id: usuarioId
                }
            }
        });

        if (!estilo) {
            return res.status(404).json(null);
        }

        res.json(estilo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar estilo' });
    }
};
