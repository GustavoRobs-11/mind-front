import express from 'express';
import pacienteController from '../controllers/PacienteController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// put
router.put('/paciente/', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    await pacienteController.cadastrar(nome, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
  }
});

// lista os pacientes
router.get('/paciente/', async (req, res) => {
  try {
    const usuarios = await pacienteController.listarTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
  }
});

// busca por email
router.get('/paciente/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await pacienteController.buscarPorEmail(email);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
});
// busca pelo nome
router.get('/paciente/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  try {
    const usuario = await pacienteController.buscarPorNome(nome);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
});

// faz  o login
router.post('/paciente/login', async (req, res) => {
  const { login, senha } = req.body;
  try {
    const usuario = await pacienteController.buscarPorLogin(login);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({
      user: {
        id: usuario.ID_Paciente,
        login: usuario.login,
        email: usuario.email,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        idade: usuario.idade,
        img_perfil: usuario.img_perfil,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Pegar usuario por id
router.get('/paciente/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const usuario = await pacienteController.buscarPorId(id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
});

// Atualizar usuário pelo id
router.put('/paciente/atualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, dt_nascimento, telefone, endereco, genero, login, email, senha, sobre_mim, medicamentos, preferencias} = req.body;

  // Filtra os campos com valores não vazios
  const camposAtualizados = {};
  //if (nome) camposAtualizados.nome = nome;
  //if (dt_nascimento) camposAtualizados.dt_nascimento = dt_nascimento;
  if (nome) camposAtualizados.nome = nome;
  if (sobrenome) camposAtualizados.sobrenome = sobrenome;
  if (telefone) camposAtualizados.telefone = telefone;
  if (endereco) camposAtualizados.endereco = endereco;
  if (genero) camposAtualizados.genero = genero;

  if (login) camposAtualizados.login = login;
  if (email) camposAtualizados.email = email;
  if (senha) camposAtualizados.senha = senha;
  if (sobre_mim) camposAtualizados.sobre_mim = sobre_mim;
  if (medicamentos) camposAtualizados.medicamentos = medicamentos;
  if (preferencias) camposAtualizados.preferencias = preferencias;

  if (dt_nascimento) {
    console.log(dt_nascimento)
    const [dia, mes, ano] = dt_nascimento.split('/');
    camposAtualizados.dt_nascimento = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    console.log(camposAtualizados.dt_nascimento)
  }


  try {
    await pacienteController.atualizar(id, camposAtualizados);
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: err.message });
  }

});
 
// Deletar por ID
router.delete('/paciente/deletar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pacienteController.deletar(id);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: err.message });
  }

});

// atualizar imagem do paciente
router.post('/img/:pasta/:id', upload.single('imagem'), async (req, res) => {
  const { pasta, id } = req.params;
  const arquivo = req.file;

  if (!arquivo) {
    return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
  }

  try {

    // Atualiza o caminho da imagem no banco, ex: "user/snoopy.jpg"
    const caminhoImagem = `${pasta}/${arquivo.filename}`;
    await pacienteController.atualizar(id, { img_perfil: caminhoImagem });

    res.json({ mensagem: 'Imagem atualizada com sucesso!', arquivo: arquivo.filename });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar imagem', detalhe: err.message });
  }
});


export default router;
