
// código para verificar a largura da pagina para assim poder modificar o nav
// check o minimo de 800px de largura
let widthMatch = window.matchMedia("(min-width: 800px)");

function checkPageWidth(mm) {
    if (mm.matches) {
        desktopNav()
    } else {
        mobileNav()
    }
    checkNavLinks(mm.matches)
    
}

// adiciona o eventListener para checar a largura
widthMatch.addEventListener('change', checkPageWidth);

// primeira inicialização
checkPageWidth(widthMatch);

// check se precisa de links pela largura da pagina
function checkNavLinks(check){
  usuario = JSON.parse(sessionStorage.getItem('mind_user'))
  
    let navLinks = document.querySelector('.cont-nav-center')
    let mindHome = document.querySelector('#mindHome')
    let pathName = window.location.pathname

    // trocar os nomes dos href do HOME
    mindHome.title = 'Página inicial do Mind'
    // se usuario estiver logado
    if (usuario !== null) {
      if (window.location.pathname.includes('home')){        
        mindHome.href = 'javascript:void(0)'
      } 
      else{
      mindHome.href = '/pages/home.html'
      }
    } else {
      // se estiver deslogado
      if (window.location.pathname.includes('index')){
         mindHome.href = 'javascript:void(0)'
      } else {
        mindHome.href = "/index.html"
      }
    }

    if (check){
        navLinks.classList.remove("null")
         
        navLinks.innerHTML = `
            <a id="linkSobreNos" class="nav-item nav-link" href="javascript:void(0)"> Sobre nós</a>
            <a id="linkPlanos" class="nav-item nav-link" href="javascript:void(0)" onclick="" > Planos</a>
            <a id="linkArtigos" class="nav-item nav-link" href="javascript:void(0)"> Artigos</a>
            `

        switch (pathName) {
          case '/index.html':
            document.querySelector('#linkPlanos').onclick = function() { scrollToPos(); };
            document.querySelector('#linkArtigos').href = './pages/artigos.html';
            document.querySelector('#linkSobreNos').href = './pages/sobrenos.html';
            break;

          case '/pages/artigos.html':
            document.querySelector('#linkPlanos').href = '/index.html';
            document.querySelector('#linkSobreNos').href = '/pages/sobrenos.html';
            break;
    
          case '/pages/sobrenos.html':
            document.querySelector('#linkPlanos').href = '/index.html';
            document.querySelector('#linkArtigos').href = '/pages/artigos.html';
            break;

          default:
            document.querySelector('#linkPlanos').href = '/index.html';
            document.querySelector('#linkArtigos').href = '/pages/artigos.html';
            document.querySelector('#linkSobreNos').href = '/pages/sobrenos.html';
          }
            
    } else {
        navLinks.classList.add("null")
        navLinks.innerHTML = ''
    }

}
function desktopNav(){
    const navButtons = document.querySelector('.nav-right-buttons')
    usuario = JSON.parse(sessionStorage.getItem('mind_user'))
  
    let navB = ''

    // se usuario estiver logado
    if (usuario !== null) {
      // se o usuário estiver no perfil
      if (this.window.location.href.includes('perfil')){
        navB += `<div></div>
                      <a href="../pages/home.html">
                        <button type="button"  class="nav-btn"
                            style="background-image: url('../img/magnifying-glass-solid.png');">
                        </button>
                      </a>

                      <button type="button"  onclick="logout()" class="nav-btn nav-btn-logout"
                      style="background-image: url('../img/user-logout3.png');">
                      </button> `
      } else {
      // else: usuário está logado mas não no perfil
      navB += `<div></div>
              <a href="../pages/home.html">
                <button type="button"  class="nav-btn"
                  style="background-image: url('../img/magnifying-glass-solid.png');">
                </button>
              </a>
              <a href="../pages/perfil-paciente.html">
              <button type="button"  class="nav-btn"
                style="background-image: url('../img/user-regular.png');
                margin-right: 20%;">
              </button>`
      }
    // se usuario não estiver logado
    } else { 
      // se o usuario estiver no login
      if (this.window.location.href.includes('login', '') || this.window.location.href.includes('cadastro')){
        navB += ` <div></div><div></div>`
      } else {
        // usuario deslogado e fora do login
        navB += ` <div></div><div></div>
                  <div class="nav-right" onmouseenter="dropNav(this)" onmouseleave="closeNav(this)">
                      <button type="button" class="nav-btn-login">login</button>
                      <div></div>
                  </div> `
      }
    }
      // preenche o html
      navButtons.innerHTML = navB
}

  function mobileNav(){

    let navRightButton = document.querySelector('.nav-right-buttons')
    usuario = JSON.parse(sessionStorage.getItem('mind_user'))
    // cria o o btn que abre o side bar
    navRightButton.innerHTML = `
        <div></div><div></div>
        <button type="button"  class="nav-btn" onclick="activateSideBar()"
        style="background-image: url('../img/cardapio.png');
        margin-right: 20%;
        display:block;">
        </button>`

      // guarda a string se tiver pages
      const href = this.window.location.href;
      let str = ''
      if (href.includes('pages')) {
        str = '.';
      } else {
        str = 'pages';
      }

      let sideBarItems = ''

      if (usuario !== null) {
        if (href.includes('login') || href.includes('cadastro')) {
          sideBarItems = `
          <a class="nav-item nav-link" href="${str}/sobrenos.html"> Sobre nós</a>
          <a class="nav-item nav-link" href="${str}/artigos.html"> Artigos</a>
          `
        } else if (href.includes('perfil')){
          sideBarItems = `
          <a class="nav-item nav-link" href="${str}/sobrenos.html"> Sobre nós</a>
          <a class="nav-item nav-link" href="${str}/artigos.html"> Artigos</a>
          <button type="button"  onclick="logout()" class="nav-btn nav-btn-logout"
          style="background-image: url('./img/user-logout3.png');">
          </button> 
          `

        } else {
          sideBarItems = `
          <a href="${str}/perfil-paciente.html">
            <button type="button" class="nav-btn" style="width: 100px; align-self: center; color: #fff;">
            Perfil
            </button>
          </a>
          <a class="nav-item nav-link" href="${str}/sobrenos.html"> Sobre nós</a>
          <a class="nav-item nav-link" href="${str}/artigos.html"> Artigos</a>

          `
        }
      } else {
      sideBarItems = `   
        <a class="nav-item nav-link" href="${str}/sobrenos.html"> Sobre nós</a>
        <a class="nav-item nav-link" href="${str}/artigos.html"> Artigos</a>
        <a href="${str}/login.html">
          <button type="button" class="nav-btn" style="width: 100px; align-self: center; color: #fff;">login</button>
        </a>`
      }
      // cria o side bar fora da tela
      document.querySelector('#sideNav').innerHTML = `
      <div class="nav-side-bar">
          <button type="button"  class="nav-btn nav-btn-box" onclick="deactivateSideBar()"
          style="background-image: url('../img/cancel.png');
          margin-right: 20%;">
          </button>
            <nav class="nav-side-bar-items">
              ${sideBarItems}
            </nav>
          </div>
          <div id="nav-background-color-change"> 
      </div>
      `
  }

    

  function activateSideBar(){
    const navSideBar = document.querySelector('.nav-side-bar')
    const changeBackground = document.querySelector('#nav-background-color-change')

    // check se a animação defechar terminou
    if (!document.querySelector('#sideNav').classList.contains('lock')){
      // adiciona a class ativa
      navSideBar.classList.add('active')
      changeBackground.classList.add('active')
      // remove, se tiver, a class desativa
      navSideBar.classList.remove('deactive')
      changeBackground.classList.remove('deactive')

      // trava a tela
      document.querySelector('.nav-main-grid').classList.add('lock')
      document.querySelector('#sideNav').classList.add('lock')
    }


  }


  function deactivateSideBar(){
    // desativa o side Bar
    const navSideBar = document.querySelector('.nav-side-bar')
    const changeBackground = document.getElementById('nav-background-color-change')

    // remove a class ativa e adiciona a desativa
    navSideBar.classList.remove('active')
    changeBackground.classList.remove('active')
    navSideBar.classList.add('deactive')
    changeBackground.classList.add('deactive')

    // destrava a tela
    setTimeout(function() {
      document.querySelector('.nav-main-grid').classList.remove('lock')
      document.querySelector('#sideNav').classList.remove('lock')
  
  }, 400);


  }


  
  function dropNav(own){
    document.querySelector('.nav-btn-login').classList.add('hover-state')
    const hr = this.window.location.href;
    let str = ''
    if (hr.includes('pages')) {
      str = '.';
    } else {
      str = 'pages';
    }
  
    console.log(this.window.location.href)
    own.children[1].innerHTML = `<div class=nav-login-drop-wrapper>
                                    <div class="nav-login-drop">
                                            <button type="button" onclick="setUserType(0, '${str}')" class="nav-drop-btn">Paciente</button>
                                            <button type="button" onclick="setUserType(1, '${str}')" class="nav-drop-btn">Psicólogo</button>
                                            <button type="button" onclick="setUserType(2, '${str}')" class="nav-drop-btn">Voluntário</button>

                                    </div>`
  
  }
  
  function closeNav(own){
    document.querySelector('.nav-btn-login').classList.remove('hover-state')
  
    own.children[1].innerHTML = ''
  }
  

// Muda o footer 
document.getElementById('mainFooter').innerHTML = `
              <div class="grid-footer">
                <div>
                    <a href="../pages/sobrenos.html">Sobre nós</a>
                    <a href="../pages/artigos.html">Artigos</a>
                    <a href="../pages/termos.html">Termos e Acordos</a>
                    <a href="">Entre para nosso time</a>
                </div>
                <div>
                    <a href="javascript:void(0)"><p>Planos</p></a>
                    <a href="../pages/atri.html"><p>Atribuições</p></a>
                    <a href="javascript:void(0)">Canal de denúncia</a>

                    <p style="margin-bottom: -15px;">Contatos:</p>
                    <form>                       
                        <button value="mind@falsoemail.com" onclick="copyValue(value)" type="button" title="copiar email"  class="nav-btn btn-circle"
                        style="background-image: url('../img/mail_icon.svg');">
                        </button>
                        <button value="(11) 1111-1111" onclick="copyValue(value)" type="button" title="copiar telefone"  class="nav-btn btn-circle"
                        style="background-image: url('../img/call_icon.svg');">
                        </button>
                    </form>

                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <hr>
            </div>
            <p class="footer-logo">&copy; Mind - 2024</p>
            `
    
  