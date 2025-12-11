const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dblegendas', 'root', '123beto', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
