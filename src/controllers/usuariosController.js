const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.cadastrar = async (req, res) => {
    const { usuario, email, senha } = req.body;

    if (!usuario || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    try {
        const emailExistente = await Usuario.findOne({ where: { email } });
        const usuarioExistente = await Usuario.findOne({ where: { usuario } });

        if (emailExistente) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Usuario já cadastrado' });
        }

        const senhaCriptografada = bcrypt.hashSync(senha, 10);

        await Usuario.create({
            usuario,
            email,
            senha: senhaCriptografada,
        });

        return res.status(200).json({ msg: 'Usuário cadastrado com sucesso' });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro no servidor' });

    }
};

exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ erro: "Preencha usuário e senha" });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ where: { usuario } });

        if (!usuarioExistente) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        const senhaValida = bcrypt.compareSync(senha, usuarioExistente.senha);

        if (!senhaValida) {
            return res.status(400).json({ erro: "Senha incorreta" });
        }

        req.session.userId = usuarioExistente.id;

        return res.status(200).json({
            msg: "Login realizado",
            usuario: {
                id: usuarioExistente.id,
                usuario: usuarioExistente.usuario,
                email: usuarioExistente.email
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro no servidor" });
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({ msg: "Deslogado com sucesso" });
    });
};

exports.auth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ erro: "Acesso não autorizado" });
    }
    next();
};