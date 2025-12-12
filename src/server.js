const express = require('express');
const session = require('express-session');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const usuariosControllers = require('./controllers/usuariosController');
const path = require('path');
const PORT = 3000;

const Usuario = require('./models/Usuario')
const sequelize = require('./config/database');

sequelize.sync().then(() => {
    console.log('Banco sincronizado com sucesso');
}).catch((err) => {
    console.error(`Erro ao sincronizar o banco! ${err}`);
});

app.use(session({
    secret: 'dsfsf@#$43%hjgf!la32',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 1000 * 60 * 60 }
}));

app.use(express.json());
app.use(usuariosRoutes);

app.use(express.static(path.join(__dirname, '../public' )));

app.use('/private', usuariosControllers.auth, express.static(path.join(__dirname, '../private')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});