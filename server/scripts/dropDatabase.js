import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('mind_plus_ultra', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
  });

async function dropDatabase() {
  try {
    // verifica se a conexão existe
    const databaseName = sequelize.config.database;
    const queryInterface = sequelize.getQueryInterface();

    // Query para o database
    let dropQuery;
    switch (sequelize.getDialect()) {
      case 'postgres':
        dropQuery = `DROP DATABASE IF EXISTS "${databaseName}";`;
        break;
      case 'mysql':
      case 'mariadb':
        dropQuery = `DROP DATABASE IF EXISTS \`${databaseName}\`;`;
        break;
      case 'sqlite':
        console.warn('Dropping an SQLite database by deleting the file.');
        const dbFilePath = sequelize.config.storage; // Path to the SQLite file
        if (dbFilePath) {
          const fs = require('fs').promises;
          try {
            await fs.unlink(dbFilePath);
            console.log(`Deletou database: ${dbFilePath}`);
            return; // Exit the function as the database is dropped
          } catch (err) {
            console.error('Erro ao deletar database:', err);
            return;
          }
        } else {
          console.error('Mind_plus_ultra não configurado.');
          return;
        }
        break;
      case 'mssql':
        dropQuery = `IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = '${databaseName}') DROP DATABASE ${databaseName};`;
        break;
      default:
        console.error(`Dialeto: "${sequelize.getDialect()}" | esse código não funciona nesse dialeto.`);
        return;
    }

    // Executa o Query
    await sequelize.query(dropQuery);
    
    console.log(`Successfully dropped database: ${databaseName}`);
  } catch (error) {
    console.error('Error dropping database:', error);
  } finally {
    // Fecha a conexão
    await sequelize.close();
  }
}

// chama a função
dropDatabase();