import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';

class Voluntario extends Sequelize.Model {}

// NOME / EMAIL / SENHA / AREA INTERESSE / DISPONIBILIDADE / TELEFONE
Voluntario.init({ 
  ID_Voluntario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  senha: {type: DataTypes.STRING, allowNull: false },
  area_interesse: { type: DataTypes.STRING, allowNull: true },
  disponibilidade: { type: DataTypes.STRING, allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
  // Adicione outros campos relevantes para Voluntario
}, {
  sequelize,
  modelName: 'Voluntarios',
  tableName: 'voluntarios',
  timestamps: true,
});

export default Voluntario