const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.getElementById("btn-close");
const themeToggler = document.querySelector("ToggleSwitch");
const toggleBtn = document.querySelector("toggleBtn");
const divLogo = document.querySelector("logo");
const cdiInput = document.getElementById("cdiInput");
let balance
let email

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
    .then(datos => {
        showDataUser(datos)
        const data = datos[0]
        balance = parseFloat(data.balance)
        email = data.email
    })

    .catch(error => error)
    
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault()

    var emailInput = document.getElementById("email").value
    var amountInput = document.getElementById("amount").value

    if(validarCorreo(emailInput) && emailInput != email && amountInput > 0.5 && amountInput < balance){
        event.target.submit()
    }else if(!validarCorreo(emailInput)){
        const err = 'Por favor ingrese un correo valido'
        ErrorMSG(err)
    }else if(emailInput === email){
        const err = `No puedes hacer un depósito<br>a ti mismo`
        ErrorMSG(err)
    }else if(amountInput > balance){
        console.log(amountInput)
        console.log(balance)
        const err = `El monto ingresado <br> es mayor a su saldo` 
        ErrorMSG(err)
    }else if(amountInput < 0.5){
        const err = `Por favor ingrese un monto<br> de al menos 0.5$`
        ErrorMSG(err)
    }
})

function ErrorMSG(Err){
    const errormsg = Err

    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    
    const popup = document.createElement('div')
    popup.className = 'popup'
    
    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = "<i class='bx bx-x'></i>"
    closeButton.addEventListener('click', closePopup)
    
    const iconContainer = document.createElement('div')
    iconContainer.className = 'icon-alert'
    iconContainer.innerHTML = `<i class='bx bxs-error'></i>`
    
    const message = document.createElement('h4')
    message.className = 'message'
    message.innerHTML = errormsg
    
    popup.appendChild(closeButton)
    popup.appendChild(iconContainer)
    popup.appendChild(message)
    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    localStorage.removeItem('Alert')
    
    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
}

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
  
function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay')
    const popup = document.querySelector('.popup')
  
    popupOverlay.classList.remove('fade-in')
    popupOverlay.classList.add('fade-out')
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
  
    setTimeout(function() {
        popupOverlay.remove()
    }, 300);
}

function validarCorreo(correo) {
    var patron = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return patron.test(correo);
}

function validarTecla(event) {
    var inputValue = event.target.value;
    var lastChar = inputValue.slice(-1);
  
    if (lastChar === ".") {
      event.target.value = inputValue.slice(0, -1)
      return;
    }
  
    if (lastChar === ",") {
        var numero = inputValue.slice(0, -1).replace(/,/g, '')
        if (numero.length > 1) {
            var penultimoChar = inputValue.slice(-2, -1);
            if (penultimoChar !== ",") {
            event.target.value = inputValue.slice(0, -1) + ","
            } else {
            event.target.value = inputValue.slice(0, -2) + ","
            }
        } else {
            event.target.value = numero
        }
    }
  
    var caracteresPermitidos = /^[0-9,]+$/
    if (!caracteresPermitidos.test(inputValue)) {
        event.target.value = inputValue.replace(/[^0-9,]/g, '')
    }
  
    if (inputValue.includes(",,") || inputValue.endsWith(",")) {
        event.target.value = inputValue.replace(/,+/g, ",")
    }
  
    var partes = inputValue.split(",");
    if (partes.length > 1 && partes[1].length > 2) {
        event.target.value = partes[0] + "," + partes[1].substring(0, 2)
    }
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
})

function Alert(){ 
    localStorage.setItem('Alert', 'La transaccion ha sido completada')
}
