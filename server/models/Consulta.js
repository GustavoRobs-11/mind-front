import sequelize from '../db/database.js';
import DataTypes  from 'sequelize';
import Psicologo from './Psicologo.js';
import Paciente from './Paciente.js';

const Consulta = sequelize.define('consulta', {
  ID_Consulta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ID_Psicologo: { type: DataTypes.INTEGER, references: { model: Psicologo, key: 'ID_Psicologo' } },
  ID_Paciente: { type: DataTypes.INTEGER, references: { model: Paciente, key: 'ID_Paciente' } },
  Data_Hora: DataTypes.DATE,
  Tipo_Consulta: DataTypes.STRING,
  Status: DataTypes.STRING
}, {
  tableName: 'consultas',
  timestamps: false
});

// RELAÇÃO
Psicologo.hasMany(Consulta, { foreignKey: 'ID_Psicologo' });
Consulta.belongsTo(Psicologo, { foreignKey: 'ID_Psicologo' });

Paciente.hasMany(Consulta, { foreignKey: 'ID_Paciente' });
Consulta.belongsTo(Paciente, { foreignKey: 'ID_Paciente' });

export default Consulta;

