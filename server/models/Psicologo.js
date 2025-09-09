import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';


class Psicologo extends Sequelize.Model {}

// NOME / EMAIL / SENHA / CRP / ESPECIALIDADE / TELEFONE / ENDEREÇO
Psicologo.init({
  ID_Psicologo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  crp: { type: DataTypes.STRING(13), allowNull: false, unique: true },
  nome: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  sobrenome: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  dt_nascimento: { type: DataTypes.DATEONLY, allowNull: true, defaultValue: '1999-01-01'},
  idade: {
    type: DataTypes.VIRTUAL,
    get() {
      const dt_nascimento = new Date(this.getDataValue('dt_nascimento'));
      const today = new Date();
      let idade = today.getFullYear() - dt_nascimento.getFullYear();
      const m = today.getMonth() - dt_nascimento.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dt_nascimento.getDate())) {
        idade--;
      }
      return idade;
    }
  },
  genero: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  telefone: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  endereco: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  img_perfil: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },

}, {
sequelize,
modelName: 'Psicologos',
tableName: 'psicologos',
timestamps: true,
});

export default Psicologo;
