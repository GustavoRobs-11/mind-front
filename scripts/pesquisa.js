document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card-psi');
    const noResultsCard = document.getElementById('no-results-card'); 

    function filtrarPorTexto() {
        const textoBusca = searchInput.value.trim().toLowerCase();
        let algumCardVisivel = false;

        cards.forEach(card => {
            const nome = card.querySelector('.nome-psi')?.textContent.toLowerCase() || '';
            const especialidades = Array.from(card.querySelectorAll('.hm-psi-stats'))
                .map(tag => tag.getAttribute('data-speciality').toLowerCase());

            const corresponde = nome.includes(textoBusca) ||
                especialidades.some(esp => esp.includes(textoBusca));

            card.style.display = corresponde ? 'block' : 'none';
            if (corresponde) algumCardVisivel = true;
        });

        noResultsCard.style.display = algumCardVisivel ? 'none' : 'block';
    }

    searchInput.addEventListener('input', filtrarPorTexto);

    filtrarPorTexto(); // inicial
});