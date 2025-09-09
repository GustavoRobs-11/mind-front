PORT = 8080 // servidor
const textosH6 = ["Sobre mim", "Medicamento", "Preferências"] // para modificar o nome dos H6
const textosQtdMax = [510, 510, 510] // para modificar a quantidade maxima de characters


// pop-up-deletar----------------------------------

const abrir_pop_up = document.getElementById("btn-abrir-pop-up");
const pop_up_deletar = document.getElementById("pop-up-deletar");
const fechar_pop_up = document.getElementById("btn-fechar-pop-up");

abrir_pop_up.addEventListener("click", () => {
  pop_up_deletar.style.display = "flex";
});
fechar_pop_up.addEventListener("click", () => {
  pop_up_deletar.style.display = "none";
})

// Testa o numero de caracteres com Event Listeners
const sobre_mim_input = document.getElementById('sobreMimEdit');
const medicamento_input = document.getElementById('medicamentosEdit');
const preferencias_input = document.getElementById('preferenciasEdit');

sobre_mim_input.addEventListener('input', () => {
  const qtd = sobre_mim_input.value.length;
  const txt = document.getElementById('sobreMim');

  if (qtd > textosQtdMax[0]) {
    txt.innerHTML = `${textosH6[0]} <span style="color: red; padding-left:5px">*Limite de 1000 caracteres antigido</span>`;
  } else {
    txt.innerHTML = textosH6[0]
  }
})

medicamento_input.addEventListener('input', () => {
  const qtd = medicamento_input.value.length;
  const txt = document.getElementById('Medicamento');

  if (qtd > textosQtdMax[1]) {
    txt.innerHTML = `${textosH6[1]} <span style="color: red; padding-left:5px">*Limite de 1000 caracteres antigido</span>`;
  } else {
    txt.innerHTML = textosH6[1]
  }
})

preferencias_input.addEventListener('input', () => {
  const qtd = preferencias_input.value.length;
  const txt = document.getElementById('Preferencias');

  if (qtd > textosQtdMax[2]) {
    txt.innerHTML = `${textosH6[2]} <span style="color: red; padding-left:5px">*Limite de 1000 caracteres antigido</span>`;
  } else {
    txt.innerHTML = textosH6[2]
  }
})

// DB ----------------------------------

// devolve os valores para eles serem modificados
window.addEventListener('DOMContentLoaded', async () => {
  usuario = JSON.parse(sessionStorage.getItem("mind_user"))

  try {
    const response = await fetch(`http://localhost:${PORT}/api/paciente/${usuario.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const dados_do_usuario = await response.json();

    if (response.ok) {
      // devolve o nome da Imagem
      document.getElementById('imagePreview').src = '../server/img/user/' + usuario.img_perfil;
      // devolve o nome e o email
      document.getElementById('nomeEdit').value = dados_do_usuario.nome;
      document.getElementById('sobrenomeEdit').value = dados_do_usuario.sobrenome;

      document.getElementById('telefoneEdit').value = dados_do_usuario.telefone;

      document.getElementById('loginEdit').value = dados_do_usuario.login;
      document.getElementById('emailEdit').value = dados_do_usuario.email;
      document.getElementById('senhaEdit').value = dados_do_usuario.senha;

      document.getElementById('localEdit').value = dados_do_usuario.endereco;
      document.getElementById('generoEdit').value = dados_do_usuario.genero;

      document.getElementById('sobreMimEdit').value = dados_do_usuario.sobre_mim;
      document.getElementById('medicamentosEdit').value = dados_do_usuario.medicamentos;
      document.getElementById('preferenciasEdit').value = dados_do_usuario.preferencias;

      // para converter YYYY/MM/DD do banco de dados para DD/MM/YYYY 
      const [ano, mes, dia] = dados_do_usuario.dt_nascimento.split('-');
      document.getElementById('nascimentoEdit').value = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;

    }
  } catch (error) {
    console.log(`Erro na requisição: ${error.message}`);
  }
});

const form = document.getElementById("formAtualizar");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

// atualizar o BD
document.getElementById('btnAtualizarPerfil').addEventListener('click', async () => {
  const usuario = JSON.parse(sessionStorage.getItem("mind_user"));

  const nome = document.getElementById('nomeEdit').value
  const sobrenome = document.getElementById('sobrenomeEdit').value
  const dt_nascimento = document.getElementById('nascimentoEdit').value

  const telefone = document.getElementById('telefoneEdit').value
  const endereco = document.getElementById('localEdit').value
  const genero = document.getElementById('generoEdit').value

  const login = document.getElementById('loginEdit').value;
  const email = document.getElementById('emailEdit').value;
  const senha = document.getElementById('senhaEdit').value;

  const sobre_mim = document.getElementById('sobreMimEdit').value;
  const medicamentos = document.getElementById('medicamentosEdit').value;
  const preferencias = document.getElementById('preferenciasEdit').value;

  try {
    const response = await fetch(`http://localhost:${PORT}/api/paciente/atualizar/${usuario.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, sobrenome, dt_nascimento, telefone, endereco, genero, login, email, senha, sobre_mim, medicamentos, preferencias })
    });
    // se ok: fazer login denovo
    if (response.ok) {
      try {
        const response = await fetch(`http://localhost:${PORT}/api/paciente/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login, senha })
        });
        const data = await response.json();

        if (response.ok) {
          let n = JSON.stringify(data.user);
          sessionStorage.setItem("mind_user", n)
          window.location.reload(true)
        } else {
          console.log(`Erro: ${data.erro}`);
        }

      } catch (error) {
        console.log(`Erro na requisição: ${error.message}`);
      }
    } else {
      const errorText = await response.text();
      throw new Error(`Erro: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Perfil atualizado com sucesso:", result);

  } catch (error) {
    console.error("Erro ao atualizar perfil:", error.message);
  }



});

// deleta o database 
document.getElementById('btnADeletarPerfil').addEventListener('click', async () => {
  const usuario = JSON.parse(sessionStorage.getItem("mind_user"));

  try {
    const response = await fetch(`http://localhost:${PORT}/api/paciente/deletar/${usuario.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      // deleta o user do vetor e faz logout
      sessionStorage.removeItem("mind_user")
      window.location.href = window.location.href.replace("/pages/configuracoes.html", "")

    } else {
      console.log(`Erro: ${data.erro}`);
    }
  } catch (error) {
    console.log(`Erro na requisição: ${error.message}`);
  }
});


// trocar Imagem
const imgPerfil = document.getElementById('file-image')

imgPerfil.addEventListener('change', async () => {
  const file = imgPerfil.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('imagem', file);

  // Cabeçalho IMPORTANTE
  const usuario = JSON.parse(sessionStorage.getItem("mind_user"));
  const pasta = 'user'
  const prefixo = 'perfil'

  try {
    const response = await fetch(`http://localhost:${PORT}/api/img/${pasta}/${usuario.id}`, {
      method: 'POST',
      headers: { 'prefixo': prefixo }, // prefixo para o tipo de imagem
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {

      usuario.img_perfil = imgPerfil.src = data.arquivo

      sessionStorage.setItem("mind_user", JSON.stringify(usuario))


    } else {
      alert('Erro: ' + data.erro);
    }
  } catch (error) {
    alert('Erro no upload: ' + error.message);
  }
});

/* HORARIO DE ATENDIMENTO ----------------------- */


