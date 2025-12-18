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
            return res.status(400).json({ erro: "Usuário ou senha inválida" });
        }

        const senhaValida = bcrypt.compareSync(senha, usuarioExistente.senha);

        if (!senhaValida) {
            return res.status(400).json({ erro: "Usuário ou senha inválida" });
        }

        req.session.usuarioId = usuarioExistente.id;

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
        res.redirect('/');
    });
};

exports.auth = (req, res, next) => {
    if (!req.session.usuarioId) {
        return res.send(`<script>
            alert("Você precisa estar logado!");
            window.location.href = "/index.html";
        </script>`);
    }
    next();
};

exports.pegarDadosUsuario = async (req, res) => {
    if (!req.session.userId) {
        return res.send(`<script>
            alert("Você precisa estar logado!");
            window.location.href = "/index.html";
        </script>`);
    }

    try {
        const usuario = await Usuario.findByPk(req.session.userId, {
            attributes: ['usuario', 'email']
        });
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
};

exports.alterarDados = async (req, res) => {
    if (!req.session.userId) {
        return res.send(`<script>
            alert("Você precisa estar logado!");
            window.location.href = "/index.html";
        </script>`);
    }

    const { usuario, email, senha } = req.body;

    if (!usuario || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    try {
        const usuarioAtual = await Usuario.findByPk(req.session.userId);

        usuarioAtual.usuario = usuario;
        usuarioAtual.email = email;
        usuarioAtual.senha = bcrypt.hashSync(senha, 10);

        await usuarioAtual.save();

        res.json({ msg: "Dados atualizados com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar dados" });
    }
};
