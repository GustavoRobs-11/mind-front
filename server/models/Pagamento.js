import sequelize from '../db/database.js';
import { DataTypes } from 'sequelize';
import Consulta from './Consulta.js';

const Pagamento = sequelize.define('pagamento', {
  ID_Pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ID_Consulta: { type: DataTypes.INTEGER, allowNull: false, references: { model: Consulta, key: 'ID_Consulta' } },
  Tipo_Pagamento: { type: DataTypes.STRING(50) },
  Valor: { type: DataTypes.DECIMAL(10, 2) },
  Status: { type: DataTypes.STRING(50) }
}, {
  tableName: 'pagamentos',
  timestamps: false
});

Consulta.hasOne(Pagamento, { foreignKey: 'ID_Consulta' });
Pagamento.belongsTo(Consulta, { foreignKey: 'ID_Consulta' });

export default Pagamento;
