document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.checkbox input');
    const cards = document.querySelectorAll('.card-psi');
    const noResultsCard = document.getElementById('no-results-card');
    function filtrarCards() {
        const especialidadesSelecionadas = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-speciality').toLowerCase());
        if (especialidadesSelecionadas.length === 0) {
            cards.forEach(card => {
                card.style.display = "block";
            });
            noResultsCard.style.display = "none";
        } else {
            cards.forEach(card => {
                const especialidadesCard = Array.from(card.querySelectorAll('.hm-psi-stats'))
                    .map(tag => tag.getAttribute('data-speciality').toLowerCase());

                const deveAparecer = especialidadesSelecionadas.some(especialidade =>
                    especialidadesCard.includes(especialidade)
                );
                if (deveAparecer) {
                    card.style.display = "block";
                    algumCardVisivel = true;
                } else {
                    card.style.display = "none";
                }
            });
        }
    }
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filtrarCards);
    });
    filtrarCards();
});
function AbrirFiltro() {
    const filtro = document.getElementById('filtro-checkbox');
    const seta = document.getElementById('seta-checkbox');
    filtro.classList.toggle('show');
    seta.style.transform = filtro.classList.contains('show') ? 'rotate(-90deg)' : 'rotate(0deg)';
}

