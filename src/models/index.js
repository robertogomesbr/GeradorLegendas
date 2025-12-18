const Usuario = require('./Usuario');
const Media = require('./Media');
const Legenda = require('./Legenda');
const LegendaEstilo = require('./LegendaEstilo');

Usuario.hasMany(Media, {
    foreignKey: 'usuario_id',
    onDelete: 'CASCADE',
    constraints: true
});

Media.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
});

Media.hasMany(Legenda, {
    foreignKey: 'media_id',
    onDelete: 'CASCADE',
    constraints: true
});

Legenda.belongsTo(Media, {
    foreignKey: 'media_id'
});

Media.hasOne(LegendaEstilo, {
    foreignKey: 'media_id',
    onDelete: 'CASCADE',
    constraints: true
})

LegendaEstilo.belongsTo(Media, {
    foreignKey: 'media_id'
});

module.exports = {
    Usuario,
    Media,
    Legenda,
    LegendaEstilo
}