
function copyNumber() {
    const cellNumber = document.getElementById('cell-n');

  try {
    navigator.clipboard.writeText(cellNumber.textContent);

  } catch (error) {
    console.error('não foi', error);
  }
}

function copyValue(value) {

try {
  navigator.clipboard.writeText(value);

} catch (error) {
  console.error(error);
}
}

function toHome(page){
  usuario = JSON.parse(sessionStorage.getItem('user'))
  if (usuario === null) {
      window.location.href =  window.location.href.replace("pages/"+page,"") + ""
  } else {
      window.location.href =  window.location.href.replace(page,"") + "home.html"   
  }
}
