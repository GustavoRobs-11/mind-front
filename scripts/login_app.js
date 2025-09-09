const PORT = 8080; // port principal
import { getPacientes } from "../server/scripts/userVectors.js";

function local(){
    // quando não tiver o vetor usuario e o site estiver offline
    if (window.location.hostname.includes("vercel")){ // "vercel"
        if (localStorage.getItem("usersHere") === null) {
            const ds = getPacientes()
            let n = JSON.stringify(ds);
            localStorage.setItem("usersHere", n);   
            return ds  
        }
    }
}


function doLogin(event){
    event.preventDefault();

    let login = document.querySelector("#login0").value
    let senha = document.querySelector('#password0').value

    // check - Versão Online; ELSE - Versão offline
    if (window.location.hostname.includes("vercel")){
        const usuarios = JSON.parse(localStorage.getItem("usersHere")) // busca os usuarios do vetor
    
        for(let i = 0; i < usuarios.length; i++){
            if((login == usuarios[i].login || login == usuarios[i].email) && senha == usuarios[i].password){
                let n = JSON.stringify(usuarios[i]);
                sessionStorage.setItem("mind_user", n)
                window.location.href =  window.location.href.replace("login.html", "home.html")
                break
            }
        }
    } else {
        // FAZ O LOGIN ACESSANDO O BANCO DE DADOS
        (async () => {
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
                    window.location.href =  window.location.href.replace("login.html", "home.html") 
                } else {
                    console.log(`Erro: ${data.erro}`);
                }

            } catch (error) {
            console.log(`Erro na requisição: ${error.message}`);
            }

        })();
    }
}

function cadastrar(event) {
    event.preventDefault();

    let nome = document.querySelector("#nome0").value
    let email = document.querySelector("#email0").value
    let senha = document.querySelector("#password0").value
    let senha1 = document.querySelector("#password1").value
    // faz o cadastro online
    if (window.location.hostname.includes("vercel")){
        var usuarios = JSON.parse(localStorage.getItem("usersHere"))
        if (senha == senha1 && senha !== ''){
            if (nome !== '' && senha !== '' && email !== ''){
                let user = { id: Date.now(), login: nome, password: senha, email:email, psi: false, img_perfil:''}
                usuarios.push(user)
                
                localStorage.setItem("usersHere", JSON.stringify(usuarios))
                alert('Conta Registrada!')
                window.location.href =  window.location.href.replace("cadastro.html","login.html")
            
            }
        } else {
            alert("As senhas não combinam")
        }
    } else { // faz o cadastro offline usando o pc como servidor
        (async () => {
            try {
                if (senha == senha1 && senha !== ''){
                    if (nome !== '' && senha !== '' && email !== ''){
                const response = await fetch(`http://localhost:${PORT}/api/paciente`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ nome, email, senha })
                });

          
                const data = await response.json();
          
                if (response.ok) {
                    alert('Conta Registrada!')
                    window.location.href = window.location.href.replace("cadastro.html","login.html")
                } else {
                  console.log(`Erro: ${data.erro}`);
                }
                }
                } else {
                    alert("As senhas não combinam")
                }
              } catch (error) {
                console.log(`Erro na requisição: ${error.message}`);
              }
            
        })();
    }
  
  }


function changePerfilData(){
    const name = document.querySelector('#perfilNome');
    const photo = document.querySelector('#perfilFoto');
    const idade = document.querySelector('#perfilIdade');

    usuario = JSON.parse(sessionStorage.getItem("mind_user"))
    console.log(usuario) // check if user is log
    

    if (usuario === null) {
        photo.src = defaultImage
      } else {
        name.innerHTML = usuario.nome
        name.classList.add('perfilTex')
        idade.innerHTML = `Idade: ${usuario.idade}`

        if (usuario.img_perfil === ''){
            photo.src =  '../server/img/user/perfil-null.png'
        } else {
            photo.src = '../server/img/user/' + usuario.img_perfil; 
        }
      }

}

function logout(){
    sessionStorage.removeItem("mind_user")
    window.location.href =  window.location.href.replace("/pages/perfil-paciente.html","")
  
}

function setTerapia(val){
    n = JSON.stringify(val);
    sessionStorage.setItem("terapia_n", n)

}

function getTerapia(){
    const NumeroTerapia = JSON.parse(sessionStorage.getItem("terapia_n"))
    
    const streamImage = document.querySelector('#streamImage');
    const srcImage = '/img/stream_'+NumeroTerapia+'.png'
    console.log(srcImage+'   '+streamImage)
    streamImage.src = srcImage;

}
  
function setUserType(val, pagina){
    const n = JSON.stringify(val);
    sessionStorage.setItem("userType", n)
    // manda para  o login    
    window.location.href = `${pagina}/login.html`
}



// exporta todos as funções se estiver no navegador
if (typeof window !== 'undefined') {
    window.local = local; 
    window.doLogin = doLogin; 
    window.cadastrar = cadastrar; 
    window.changePerfilData = changePerfilData;
    window.logout = logout;
    window.setTerapia = setTerapia;
    window.getTerapia = getTerapia;
    window.setUserType = setUserType;
} 
