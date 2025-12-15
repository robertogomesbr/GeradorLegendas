exports.upload = async (req, res) => {

    if(!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const file = req.file.filename;

    return res.redirect(`/private/modo.html?file=${file}`);
    
};