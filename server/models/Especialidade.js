import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';

class Especialidade extends Sequelize.Model {}

Especialidade.init({
    ID_Especialidade: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    },
    {
    sequelize,
    modelName: 'Especialidade',
    }
);

export default Especialidade;