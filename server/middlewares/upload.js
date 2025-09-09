import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Pasta base para upload
const baseFolder = 'server/img';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Exemplo: pegar o nome da subpasta do parâmetro da rota
    // tipo: /api/upload/:pasta
    const subFolder = req.params.pasta; // ex: 'perfil', 'user'

    const fullPath = path.join(baseFolder, subFolder);

    // Verifica se a pasta existe, se não cria
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
    
  },
  filename: (req, file, cb) => {
    const prefixo = req.headers['prefixo'];
    const sufixo = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const tipo = path.extname(file.originalname);
    cb(null, prefixo + '-' + sufixo + tipo);
  }
});

const upload = multer({ storage });

export default upload;
