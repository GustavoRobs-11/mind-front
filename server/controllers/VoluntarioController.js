import Voluntario from '../models/Voluntario.js';

class VoluntarioController {
  async cadastrar(dados) {
    const novoVoluntario = await Voluntario.create(dados);
    return novoVoluntario.toJSON();
  }

  async listarTodos() {
    const voluntarios = await Voluntario.findAll();
    return voluntarios.map(v => v.toJSON());
  }

  async buscarPorEmail(email) {
    const voluntario = await Voluntario.findOne({ where: { email } });
    return voluntario ? voluntario.toJSON() : null;
  }

  async buscarPorId(id) {
    const voluntario = await Voluntario.findOne({ where: { id } });
    return voluntario ? voluntario.toJSON() : null;
  }

  async atualizar(id, camposAtualizados) {
    await Voluntario.update(camposAtualizados, { where: { id } });
  }

  async deletar(id) {
    await Voluntario.destroy({ where: { id } });
  }
}

export default new VoluntarioController();
