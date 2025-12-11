const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const Usuario = require('./models/Usuario')
const sequelize = require('./config/database');

sequelize.sync().then(() => {
    console.log('Banco sincronizado com sucesso');
}).catch((err) => {
    console.error(`Erro ao sincronizar o banco! ${err}`);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public' )));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});