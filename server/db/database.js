import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

// SENHA DO SQL
const senha = 'admin' 

// Criação do banco de dados de forma assíncrona
export async function createDatabase() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: senha,
    });

    connection.query('CREATE DATABASE IF NOT EXISTS mind_plus_ultra', (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Banco de dados criado ou já existe');
        resolve();
      }
    });
  });
}

// Configuração do Sequelize para se conectar ao banco de dados
const sequelize = new Sequelize('mind_plus_ultra', 'root', senha, {
  host: 'localhost',
  dialect: 'mysql',
});

// Função para inicializar a conexão com o banco e as tabelas
export async function initDatabase() {
  try {
    // Criar o banco de dados, se necessário, ou espera ele ser criado
    await createDatabase();

    // Conecta ao banco de dados e sincroniza as tabelas
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso!');
    await sequelize.sync(); // Sincroniza os modelos com o banco
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
    throw err; // Lança o erro para ser capturado no server.js PS: POR FAVOR DENOVO NÃO
  }
}

export default sequelize;
