import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';
import Psicologo from './Psicologo.js';

class Artigo extends Sequelize.Model {}

Artigo.init({
    ID_Artigo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Psicologo: { type: DataTypes.INTEGER, references: { model: Psicologo, key: 'ID_Psicologo' } },
    nome: { type: DataTypes.STRING, allowNull: false },
    texto: { type: DataTypes.TEXT, allowNull: false, validate: { len: [0, 1200]} },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    referencia: { type: DataTypes.STRING, allowNull: true },
    },
    {
    sequelize,
    modelName: 'Artigo',
    }
);

Psicologo.hasMany(Artigo, { foreignKey: 'ID_Psicologo' });
Artigo.belongsTo(Psicologo, { foreignKey: 'ID_Psicologo' });

export default Artigo;