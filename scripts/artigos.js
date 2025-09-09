
const PORT = 8080 // porta padrão
let artigo_vect = [];

window.addEventListener('DOMContentLoaded', async () => {
    //usuario = JSON.parse(sessionStorage.getItem("mind_user"))
    const id = 1
    try {
        const response = await fetch(`http://localhost:${PORT}/api/artigo/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const todos_artigos = await response.json();
        const local_dos_artigos = document.getElementById("local_dos_artigos")

        if (response.ok) {
                // console.log(todos_artigos[1])
                for (let i=0; i < todos_artigos.length; i++){
                    artigo_vect.push(todos_artigos[i].texto)
                    let article = `
                    <article class="artigo-container">
                        <img src="../server/img/artigos/${todos_artigos[i].img}" alt="imagem de artigo">
                        <div value="${todos_artigos[i].id}" class="artigo-texto">
                            <div class="visible">
                                <h3>${todos_artigos[i].nome}</h3>
                                <span>${todos_artigos[i].autor}</span>
                                <button type="button" class="artigo-btn" onclick="toggleArtigo(this, ${i})">Ver</button>
                            </div>
                            <p></p>
                        </div>
                    </article>
                    `
                    local_dos_artigos.innerHTML += article
                }

        }
    } catch (error) {
    console.log(`Erro na requisição: ${error.message}`);
    }
});



function toggleArtigo(own, n){
    let text = ''
    text += artigo_vect[n]

    const artigoContainer = own.closest('.artigo-texto');
    const p = artigoContainer.querySelector('p');

    p.classList.toggle('artigo-texto-inside')
    if (p.classList.contains('artigo-texto-inside')) {
        p.style.display = "block"
        p.innerHTML = artigo_vect[n];
    } else {
        p.style.display = "none"
        p.innerHTML = '';
    }
}
