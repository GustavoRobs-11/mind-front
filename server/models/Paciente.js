import sequelize from '../db/database.js';
import { Sequelize, DataTypes } from 'sequelize';

class Paciente extends Sequelize.Model {}

// NOME / EMAIL / SENHA / DT_NASCIMENTO / GENERO / TELEFONE / ENDEREÇO / IMAGEM DE PERFIL / SOBRE MIM / MEDICAMENTOS / PREFERENCIAS
Paciente.init({
  ID_Paciente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
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
  sobre_mim: { type: DataTypes.TEXT, allowNull: true, validate: { len: [0, 510]} }, // máximo 510 caracteres
  medicamentos: { type: DataTypes.TEXT, allowNull: true, validate: { len: [0, 510]} }, // máximo 510 caracteres
  preferencias: { type: DataTypes.TEXT, allowNull: true, validate: { len: [0, 510]} } // máximo 510 caracteres
}, {
  sequelize,
  modelName: 'Pacientes',
  tableName: 'pacientes',
  timestamps: true,
});

export default Paciente;
