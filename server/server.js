import app from './app.js'; // Importando o app.js
import { initDatabase } from './db/database.js'; // Importando a inicialização do banco

const PORT = 8080;

(async () => {
  try {
    // Inicializando o banco e as tabelas
    await initDatabase();
    
    // Iniciando o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao inicializar a aplicação:', err);
    process.exit(1); // Encerra a aplicação caso ocorra erro
  }
})();
