const accordion = document.querySelectorAll('.accordion')
const arrow = document.querySelectorAll('.bi-icon');

accordion.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        arrow[index].classList.toggle('arrow-icon');
        let answer = btn.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    })
})

