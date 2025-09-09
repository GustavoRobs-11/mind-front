import { initDatabase } from '../db/database.js';
import psicogoController from '../controllers/PsicologoController.js';

(async () => {
  try {
    await initDatabase(); // Cria DB e tabelas
    await psicogoController.criarEspecialidadeDefault(); // CRIA AS ESPECIALIDADES

    try {
      await initDatabase(); // Cria DB e tabelas
      await psicogoController.criarPsicologoDefault(); // CRIA O PSICOLOGO
      process.exit(0);
    } catch (err) {
      console.error('Erro ao criar dados de exemplo:', err);
      process.exit(1);
    }
  } catch (err) {
    console.error('Erro ao criar dados de exemplo:', err);
    process.exit(1);
  }
})();
