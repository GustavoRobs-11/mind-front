import express, { json } from 'express';
import cors from 'cors';
import pacienteRoutes from './routes/PacienteRoutes.js';
import psicologoRoutes from './routes/PsicologoRoutes.js';
import voluntarioRoutes from './routes/voluntarioRoutes.js';

const app = express();

// Configuração do CORS // PS: Veja qual porta o live-server está enviando, se ela não estiver aqui, ADICIONE
const origensPermitidas = [
  'http://127.0.0.1:5501',
  'http://localhost:5501',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || origensPermitidas.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS disse NÃO'));
    }
  },
  credentials: true,
}));

app.use(json());
app.use('/api', pacienteRoutes); // rota do paciente
app.use('/api', psicologoRoutes); // rota do psicologo
app.use('/api', voluntarioRoutes); // rota do voluntario

// app.use('/img', express.static(path.join(__dirname, 'server/img'))); // rota da pasta de imagens

export default app;
