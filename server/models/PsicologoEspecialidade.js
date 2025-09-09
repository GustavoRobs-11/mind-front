import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';





class PsicologoEspecialidade extends Sequelize.Model {}

PsicologoEspecialidade.init(
  {
    ID_Psicologo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Psicologo',
        key: 'ID_Psicologo',
      },
    },
    ID_Especialidade: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Especialidades',
        key: 'ID_Especialidade',
      },
    },
  },
  {
    sequelize,
    modelName: 'Psicologo_Especialidade',
  }
);

export default PsicologoEspecialidade;