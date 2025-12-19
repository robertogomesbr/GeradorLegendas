require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env')
});
require('./models/index');

const express = require('express');
const session = require('express-session');
const app = express();

const usuariosRoutes = require('./routes/usuarios');
const uploadsRoutes = require('./routes/uploads');
const legendasRoutes = require('./routes/legendas');
const mediasRoutes = require('./routes/medias');
const legendasEstiloRoutes = require('./routes/legendasEstilo');
const usuariosControllers = require('./controllers/usuariosController');

const path = require('path');
const PORT = process.env.PORT || 3000;

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
app.use(uploadsRoutes);
app.use(legendasRoutes);
app.use(mediasRoutes);
app.use(legendasEstiloRoutes);

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, '../public' )));

app.use('/private', usuariosControllers.auth, express.static(path.join(__dirname, '../private')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});