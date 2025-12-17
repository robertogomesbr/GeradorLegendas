const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LegendaEstilo = sequelize.define('LegendaEstilo', {
    media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    fonte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tamanho: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cor_texto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor_fundo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transparencia: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    posicao_y: {
        type: DataTypes.ENUM(
            'top', 'center', 'bottom'
        ),
        allowNull: false
    }
}, {
    tableName: 'legenda_estilo'
});

module.exports = LegendaEstilo;