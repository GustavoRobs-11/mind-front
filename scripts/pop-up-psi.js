document.getElementById('abrir-notif').addEventListener('click',function () {
  document.querySelector('.container-pop-up-agendarConsulta').style.display = 'flex';
  console.log('clicou')
});

document.getElementById('pop-up-fechar').addEventListener('click', function () {
  document.querySelector('.container-pop-up-agendarConsulta').style.display = 'none';
});