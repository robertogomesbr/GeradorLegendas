const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    arquivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM(
            'video', 'audio'
        ),
        allowNull: false
    }, 
    duracao: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'medias'
});

module.exports = Media;