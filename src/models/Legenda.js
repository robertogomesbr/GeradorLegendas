const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Legenda = sequelize.define('Legenda', {
    media_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    inicio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    fim: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    texto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'legendas'
});

module.exports = Legenda;