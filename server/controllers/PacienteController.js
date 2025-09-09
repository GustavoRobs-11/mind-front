import Paciente from '../models/Paciente.js'; 
import { getPacientes } from '../scripts/userVectors.js';

class PacienteController {
  async cadastrar(nome, email, senha) {
    // dt_nascimento, genero, telefone, endereco
    const usuario = await Paciente.create({ login: nome, email, senha});
    console.log('Usuário criado:', usuario.toJSON());
  }

  async listarTodos() {
    const usuarios = await Paciente.findAll();
    return usuarios.map(u => u.toJSON());
  }

  async buscarPorEmail(email) {
    const usuario = await Paciente.findOne({ where: { email } });
    return usuario ? usuario.toJSON() : null;
  }

  async buscarPorNome(nome) {
    const usuario = await Paciente.findOne({ where: { nome } });
    return usuario ? usuario.toJSON() : null;
  }

  async buscarPorLogin(login) {
    const where = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)
      ? { email: login }
      : { login: login };

    const usuario = await Paciente.findOne({ where });
    return usuario ? usuario.toJSON() : null;
  }

  // CRIA OS USUARIOS PADRÕES / AKA SNOOPY SUPREMACY
  async criarPacienteDefault() {
    const ds = getPacientes() 

    try {
      // deleta os pacientes antigos caso existam
      // resolve o problema
      await Paciente.destroy({ where: {}, truncate: false });
  
      for (const item of ds) {
        const novoUser = await Paciente.create({
          login: item.login,
          email: item.email,
          senha: item.password,

          nome: item.nome,
          sobrenome: item.sobrenome,
          dt_nascimento: item.dt_nascimento,
          genero: item.genero,

          telefone: item.telefone,
          endereco: item.endereco,

          img_perfil: item.img_perfil
        });
        console.log(`Usuário |${item.login}| criado`, novoUser.toJSON());
      }
  
      console.log('Usuários de exemplo recriados com sucesso!');
    } catch (err) {
      console.error('Erro ao criar usuários de exemplo:', err);
    }
  }

  // atualizar por id
  async atualizar(paciente_id, camposAtualizados) {
    if (Object.keys(camposAtualizados).length > 0) {
      await Paciente.update(camposAtualizados, {
        where: { ID_Paciente: paciente_id }
    });
    console.log('Usuário atualizado.');
    }
  }

  // buscar por
  async buscarPorId(paciente_id) {
    const paciente = await Paciente.findOne({ where: { ID_Paciente: paciente_id } });
    return paciente ? paciente.toJSON() : null;
  }

  // deletar por id
  async deletar(paciente_id) {
    await Paciente.destroy({ where: { ID_Paciente: paciente_id } });
    console.log('Usuário deletado.');
  }


}
export default new PacienteController();
