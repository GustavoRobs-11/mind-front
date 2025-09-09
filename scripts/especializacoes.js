const modelos = ["Ansiedade", "Conflitos familiares", "Casais", "Dependencia Química", "Insonia", "Burnout" ];
    const input = document.getElementById("inputTag");
    const sugestoes = document.getElementById("sugestoes");
    const tagWrapper = document.getElementById("tagWrapper");

    let selecionados = [];

    input.addEventListener("input", () => {
      const valor = input.value.toLowerCase();
      sugestoes.innerHTML = "";

      if (valor.length === 0) return;

      const filtrados = modelos.filter(
        m => m.toLowerCase().startsWith(valor) && !selecionados.includes(m)
      );

      filtrados.forEach(modelo => {
        const div = document.createElement("div");
        div.textContent = modelo;
        div.onclick = () => adicionarTag(modelo);
        sugestoes.appendChild(div);
      });

      const rect = input.getBoundingClientRect();
      sugestoes.style.top = `${rect.bottom + window.scrollY}px`;
      sugestoes.style.left = `${rect.left + window.scrollX}px`;
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && selecionados.length > 0) {
        removerTag(selecionados[selecionados.length - 1]);
      }
    });

    function adicionarTag(nome) {
      if (selecionados.includes(nome)) return;

      selecionados.push(nome);
      const tag = document.createElement("div");
      tag.className = "tag";
      tag.innerHTML = `${nome}<span onclick="removerTag('${nome}')">&times;</span>`;
      tagWrapper.insertBefore(tag, input);

      input.value = "";
      sugestoes.innerHTML = "";
    }

    function removerTag(nome) {
      selecionados = selecionados.filter(tag => tag !== nome);
      const tags = document.querySelectorAll(".tag");
      tags.forEach(tagEl => {
        if (tagEl.textContent.includes(nome)) tagEl.remove();
      });
    }

    // Clique fora esconde sugestões
    document.addEventListener("click", (e) => {
      if (!tagWrapper.contains(e.target)) {
        sugestoes.innerHTML = "";
      }
    });