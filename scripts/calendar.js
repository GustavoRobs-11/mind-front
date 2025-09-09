// =========================
// CONFIGURAÇÕES INICIAIS
// =========================

// Dias da semana exibidos (segunda a sexta)
const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex"];

// Meses representados em string (com zero à esquerda)
const meses = ["01","02","03","04","05","06","07","08","09","10","11","12"];

// Objeto de consultas dinâmicas
// Cada chave é uma data no formato yyyy-mm-dd
// O valor é um array de horários já ocupados
let consultas = {
  "2025-09-01": ["09:00", "14:30"],
  "2025-09-02": ["10:15"],
  "2025-09-04": ["09:00", "10:00", "16:45", "12:21", "12:21", "12:21"],
  "2026-04-14": ["21:00"]
};

// Data atual
let hoje = new Date();

// Primeira segunda-feira da semana atual
let inicioSemana = getSegunda(hoje);


// =========================
// FUNÇÕES AUXILIARES
// =========================

/**
 * Retorna a segunda-feira da semana da data informada.
 * @param {Date} data - Data de referência
 * @returns {Date} - Segunda-feira da semana
 */
function getSegunda(data) {
  let diaSemana = data.getDay(); // 0 = domingo, 1 = segunda, ...
  if (diaSemana === 0) diaSemana = 7; // Ajuste: domingo vira 7
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - (diaSemana - 1));
}


// =========================
// FUNÇÃO PRINCIPAL: RENDERIZAÇÃO DA SEMANA
// =========================

/**
 * Renderiza a semana (segunda a sexta) na tela,
 * criando colunas com os dias e horários ocupados.
 */
function renderSemana() {
  const diasContainer = document.getElementById("dias-container");
  const horariosContainer = document.getElementById("horarios");

  // Limpa os containers antes de redesenhar
  diasContainer.innerHTML = "";
  horariosContainer.innerHTML = "";

  // Gera 5 dias (segunda a sexta)
  for (let i = 0; i < 5; i++) {
    // Data correspondente ao dia
    let diaData = new Date(inicioSemana);
    diaData.setDate(inicioSemana.getDate() + i);

    // Formatações
    let d = diaData.getDate().toString().padStart(2, "0"); // dia com 2 dígitos
    let m = meses[diaData.getMonth()]; // mês (com zero à esquerda)
    let diaKey = diaData.toISOString().split("T")[0]; // chave yyyy-mm-dd

    // Cria a coluna do dia
    let coluna = document.createElement("div");
    coluna.classList.add("coluna-dia");

    // Cabeçalho do dia (ex: Seg, 01/09)
    coluna.innerHTML = `
      <div class="dia">
        <strong>${diasSemana[i]}</strong>
        <small>${d}/${m}</small>
      </div>
    `;

    // Renderiza os horários ocupados (se houver)
    if (consultas[diaKey]) {
      // Ordena os horários para exibir na ordem
      let horariosOrdenados = consultas[diaKey].slice().sort((a, b) => a.localeCompare(b));

      // Pega os 3 primeiros e o restante (que irá aparecer no modal)
      let primeiros = horariosOrdenados.slice(0, 3);
      let restantes = horariosOrdenados.slice(3);

      // Exibe os 3 primeiros
      primeiros.forEach(h => {
        let div = document.createElement("div");
        div.classList.add("horario", "ocupado");
        div.dataset.dia = diaKey;
        div.dataset.hora = h;
        div.innerText = h;
        coluna.appendChild(div);
      });

      // Rodapé da coluna (botão "MAIS" abre o modal com todos os horários)
      let footer = document.createElement("div");
      footer.classList.add("footer-dia");

      let btn = document.createElement("button");
        btn.innerText = "MAIS";
        btn.addEventListener("click", () => abrirModal(diaKey));

        footer.appendChild(btn);
        coluna.appendChild(footer);

    } else {
      // Caso não tenha nenhum horário, cria só o rodapé com botão "MAIS"
      let footer = document.createElement("div");
      footer.classList.add("footer-dia");

      let btn = document.createElement("button");
      btn.innerText = "MAIS";
      btn.addEventListener("click", () => abrirModal(diaKey, diasSemana[i], d, m));
      footer.appendChild(btn);

      coluna.appendChild(footer);
    }

    // Adiciona a coluna ao container
    horariosContainer.appendChild(coluna);
  }
}


// =========================
// NAVEGAÇÃO ENTRE SEMANAS
// =========================

// Botão "Anterior" → volta uma semana
document.getElementById("anterior").addEventListener("click", () => {
  inicioSemana.setDate(inicioSemana.getDate() - 7);
  renderSemana();
});

// Botão "Próximo" → avança uma semana
document.getElementById("proximo").addEventListener("click", () => {
  inicioSemana.setDate(inicioSemana.getDate() + 7);
  renderSemana();
});


// =========================
// MODAL (POPUP DE HORÁRIOS)
// =========================

/**
 * Abre o modal exibindo todos os horários de um determinado dia.
 * @param {string} diaKey - Data no formato yyyy-mm-dd
 * @param {string} nomeDia - Nome do dia da semana (ex: Seg)
 * @param {string} d - Dia do mês (com 2 dígitos)
 * @param {string} m - Mês (com 2 dígitos)
 */
function abrirModal(diaKey) {
  const modal = document.getElementById("modal");
  const selectDia = document.getElementById("modal-select-dia");

  // Preenche o select com os 5 dias da semana atual
  selectDia.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let diaData = new Date(inicioSemana);
    diaData.setDate(inicioSemana.getDate() + i);

    let diaFormatado = diaData.toISOString().split("T")[0];
    let option = document.createElement("option");
    option.value = diaFormatado;
    option.text = `${diasSemana[i]} - ${diaData.getDate().toString().padStart(2,"0")}/${meses[diaData.getMonth()]}`;
    if (diaFormatado === diaKey) option.selected = true;
    selectDia.appendChild(option);
  }

  atualizarHorariosModal(diaKey);

  // Atualiza horários ao mudar o select
  selectDia.addEventListener("change", (e) => atualizarHorariosModal(e.target.value));

  modal.style.display = "block";
}

function atualizarHorariosModal(diaKey) {
      const modalDia = document.getElementById("modal-dia");
      const modalHorarios = document.getElementById("modal-horarios");

      let data = new Date(diaKey);
      let nomeDia = diasSemana[(data.getDay()+6)%7]; // Ajuste domingo=0
      let d = data.getDate().toString().padStart(2,"0");
      let m = meses[data.getMonth()];

      modalDia.innerText = `${nomeDia} - ${d}/${m}`;
      modalHorarios.innerHTML = "";

      if (consultas[diaKey]) {
        let horariosOrdenados = consultas[diaKey].slice().sort((a,b)=>a.localeCompare(b));
        horariosOrdenados.forEach(h => {
          let div = document.createElement("div");
          div.classList.add("horario","ocupado");
          div.innerText = h;
          modalHorarios.appendChild(div);
          modalHorarios.style.display = "flex";
          modalHorarios.style.flexWrap = "wrap";
          modalHorarios.style.gap = "8px";
          modalHorarios.style.paddingTop = "1rem";
        });
      } else {
        modalHorarios.innerHTML = "<p>Nenhum horário registrado</p>";
      }
    }



// Fechar modal ao clicar no X
document.getElementById("fecharModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Fechar modal ao clicar fora da área
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


// =========================
// INICIALIZAÇÃO
// =========================

// Renderiza a semana inicial ao carregar
renderSemana();
