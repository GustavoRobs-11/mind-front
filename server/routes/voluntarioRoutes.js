import express from 'express';
import psicologoController from '../controllers/VoluntarioController.js';

const router = express.Router();

// put
router.put('/voluntario/', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    await psicologoController.cadastrar(nome, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
  }
});

// lista os pacientes
router.get('/voluntario/', async (req, res) => {
  try {
    const usuarios = await psicologoController.listarTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
  }
});

// busca por email
router.get('/voluntario/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await psicologoController.buscarPorEmail(email);
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
router.get('/voluntario/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  try {
    const usuario = await psicologoController.buscarPorNome(nome);
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
router.post('/voluntario/login', async (req, res) => {
  const { login, senha } = req.body;
  try {
    const usuario = await psicologoController.buscarPorLogin(login);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({
      user: {
        id: usuario.id,
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
router.get('/voluntario/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const usuario = await psicologoController.buscarPorId(id);

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
router.put('/voluntario/atualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, dt_nascimento, telefone, endereco, genero, login, email, senha } = req.body;

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

  if (dt_nascimento) {
    console.log(dt_nascimento)
    const [dia, mes, ano] = dt_nascimento.split('/');
    camposAtualizados.dt_nascimento = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    console.log(camposAtualizados.dt_nascimento)
  }


  try {
    await psicologoController.atualizar(id, camposAtualizados);
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: err.message });
  }

});
 
// Deletar por ID
router.delete('/voluntario/deletar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await psicologoController.deletar(id);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: err.message });
  }

});


export default router;
