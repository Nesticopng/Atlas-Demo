const sideMenu = document.querySelector("aside")
const menuBtn = document.querySelector("#menu-btn")
const closeBtn = document.getElementById("btn-close")
const themeToggler = document.querySelector("ToggleSwitch")
const toggleBtn = document.querySelector("toggleBtn")
const divLogo = document.querySelector("logo")
const qrA = document.getElementById("QR-A")
const depositA = document.getElementById("deposit-A")
const transactionsTbody = document.getElementById("transactions")
const logo = document.getElementById("logo")

const info = document.getElementById("info")
const pfp = document.getElementById("pfp") 

function ToggleTheme(){
    document.body.classList.toggle('dark')
    
    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true')

        logo.classList.add("fadeOut")

        setTimeout(function() {
        logo.innerHTML = ""

        const logoDiv = document.createElement("div")
        logoDiv.innerHTML = `<img src="/App/IMÁGEN/AtlasWhite.png" class="log">
        <img src="/App/IMÁGEN/Logo.png" class="iso">`
        logo.appendChild(logoDiv)

        logo.classList.remove("fadeOut")
        }, 500)
    }else{
        localStorage.setItem('dark-mode', 'false')

        logo.classList.add("fadeOut")

        setTimeout(function() {
        logo.innerHTML = ""

        const logoDiv = document.createElement("div")
        logoDiv.innerHTML = `<img src="/App/IMÁGEN/Atlas.png" class="log">
        <img src="/App/IMÁGEN/Logo.png" class="iso">`
        logo.appendChild(logoDiv)

        logo.classList.remove("fadeOut")
        }, 500)
    }
}

if(localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark')
    document.getElementById('toggleBtn').checked = true
    logo.classList.add("fadeOut")

        setTimeout(function() {
        logo.innerHTML = ""

        const logoDiv = document.createElement("div")
        logoDiv.innerHTML = `<img src="/App/IMÁGEN/AtlasWhite.png" class="log">
        <img src="/App/IMÁGEN/Logo.png" class="iso">`
        logo.appendChild(logoDiv)

        logo.classList.remove("fadeOut")
        }, 500)
}else{
    document.body.classList.remove('dark')
    document.getElementById('toggleBtn').checked = false
    logo.classList.add("fadeOut")

    setTimeout(function() {
        logo.innerHTML = ""

        const logoDiv = document.createElement("div")
        logoDiv.innerHTML = `<img src="/App/IMÁGEN/Atlas.png" class="log">
        <img src="/App/IMÁGEN/Logo.png" class="iso">`
        logo.appendChild(logoDiv)

        logo.classList.remove("fadeOut")
    }, 500)
}

menuBtn.addEventListener('click', () =>{
    sideMenu.classList.toggle("closed")
});

closeBtn.addEventListener('click', () =>{
    sideMenu.classList.toggle("closed")
})

fetch('/App/Get-Data')
    .then(response => response.json())
    .then(datos => showDataUser(datos))
    .catch(error => error)

function showDataUser(datos){
    const data = datos[0]
    
    const nameDesc = document.createElement('div')
    nameDesc.innerHTML =  `
                            <p>Hola <b id="nameUser">${data.name}</b></p>
                            <small class="text-muted">Usuario</small>
                            `
    const PFP = document.createElement('h2')
    PFP.innerHTML = `${data.name.charAt(0)}`

    pfp.appendChild(PFP)
    info.appendChild(nameDesc)
}