import { initDatabase } from '../db/database.js';
import pacienteController from '../controllers/PacienteController.js';

(async () => {
  try {
    await initDatabase(); // Cria DB e tabelas
    await pacienteController.criarPacienteDefault(); // SNOOPY SUPREMACY
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar dados de exemplo:', err);
    process.exit(1);
  }
})();
