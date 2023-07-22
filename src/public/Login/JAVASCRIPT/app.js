const sign_in_btn = document.querySelector("#sign-in-btn")
const sign_up_btn = document.querySelector("#sign-up-btn")
const container = document.querySelector(".container")
const cdiInput = document.getElementById("cdiInput")
const botonEnviar = document.getElementById('buttonFormReg')
const inputValor = document.getElementById("email").value
const regForm = document.getElementById('formReg')

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode")
})

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode")
})

if(localStorage.getItem('Alert-Login')){
    const msg = 'Usuario o contraseña inválidos'
    ErrorMSG(msg)
    localStorage.removeItem('Alert-Login')
}

document.getElementById("LoginForm").addEventListener("submit", function(event) {
    localStorage.setItem('Alert-Login', 'Email o contraseña incorrectos')
})

function validarInput(valor) {
    var input = document.getElementById("numero");

    valor = valor.replace(/\D/g, '');

    if(valor.length > 0 && valor.charAt(0) === "0") {
        valor = valor.slice(1)
    }

    if(valor.length >= 3){
        valor = valor.slice(0, 3) + "-" + valor.slice(3)
    }

    valor = valor.slice(0, 11)
  
    input.value = valor
}

cdiInput.addEventListener('input', function() {
    const value = this.value
    const numericValue = value.replace(/\D/g, '')
    this.value = numericValue.slice(0, 8)
})

document.getElementById("formReg").addEventListener("submit", function(event) {
    event.preventDefault();

    var nameInput = document.getElementById("name").value
    var correoInput = document.getElementById("email").value
    var numeroInput = document.getElementById("numero").value
    var cdiInput = document.getElementById("cdiInput").value
    var passwordInput = document.getElementById("password").value
    var confirmPasswordInput = document.getElementById("confirmPassword").value
    
    if (validarCorreo(correoInput) && passwordInput.length >= 7 && passwordInput === confirmPasswordInput && cdiInput.length >= 7 && cdiInput.length <= 8) {
        botonEnviar.disabled = true
        
        var datos = {
            name: nameInput,
            email: correoInput,
            Newnumero: numeroInput,
            Newcdi: cdiInput,
            password: passwordInput,
            confirm_password: confirmPasswordInput
        }

        fetch("/SingUpReg", {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === true){
                SuccessMSG(data.mensaje)
                container.classList.remove("sign-up-mode")
                limpiarInputs()
            }
        })
        .catch(error => {
            botonEnviar.disabled = false
            console.log(error)
            ErrorMSG(error.mensaje)
        })
    } else {
        if(!validarCorreo(correoInput)){
            const err = `Por favor ingrese un correo valido`
            ErrorMSG(err)
        }else if (passwordInput.length < 7){
            const err = `Por favor ingrese una contraseña con al menos 8 caracteres.`
            ErrorMSG(err)
        }else if(passwordInput != confirmPasswordInput){
            const err = `Por favor confirma la contraseña`
            ErrorMSG(err)
        }else if(cdiInput.length > 7 || cdiInput.length < 8){
            const err = `Por favor ingrese una cédula válida`
        ErrorMSG(err)
        }
    }
})

function ErrorMSG(err){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popupLt'
    popup.id = 'popupLt'

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = "<i class='bx bx-x'></i>"
    closeButton.addEventListener('click', closePopup)

    const iconContainer = document.createElement('div')
    iconContainer.className = 'icon-alert'
    iconContainer.innerHTML = `<i class='bx bxs-error'></i>`

    const message = document.createElement('h4')
    message.className = 'message'
    message.textContent = `${err}`

    popup.appendChild(closeButton)
    popup.appendChild(iconContainer)
    popup.appendChild(message)
    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
}

function SuccessMSG(msg){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popupLt'
    popup.id = 'popupLt'

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = "<i class='bx bx-x'></i>"
    closeButton.addEventListener('click', closePopup)

    const iconContainer = document.createElement('div')
    iconContainer.className = 'icon-alert success-alert'
    iconContainer.innerHTML = `<i class='bx bxs-check-circle'></i>`

    const message = document.createElement('h4')
    message.className = 'message'
    message.textContent = `${msg}`

    popup.appendChild(closeButton)
    popup.appendChild(iconContainer)
    popup.appendChild(message)
    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
}

function validarCorreo(correo) {
    var patron = /^[\w\.-]+@[\w\.-]+\.\w+$/
    return patron.test(correo)
}

document.addEventListener("DOMContentLoaded", function() {
    function togglePasswordVisibility(inputId, toggleId) {
        var passwordInput = document.getElementById(inputId)
        var togglePassword = document.getElementById(toggleId)
    
        togglePassword.addEventListener("click", function(){
            passwordInput.type = passwordInput.type === "password" ? "text" : "password"
    
            togglePassword.classList.toggle("bx-show")
            togglePassword.classList.toggle("bx-hide")
        })
    }

    togglePasswordVisibility("password1", "togglePassword1")
  
    togglePasswordVisibility("password", "togglePassword2")
  
    togglePasswordVisibility("confirmPassword", "togglePassword3")
})

function closePopup() {
    const popupOverlay = document.querySelector('#popup-overlay')
    const popup = document.querySelector('#popupLt')
      
    popupOverlay.classList.remove('fade-in')
    popupOverlay.classList.add('fade-out')
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
      
    setTimeout(function() {
        popupOverlay.remove()
      }, 300);
}
  
function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay')
    const popup = document.querySelector('.popupLt')
  
    popupOverlay.classList.remove('fade-in')
    popupOverlay.classList.add('fade-out')
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
  
    setTimeout(function() {
        popupOverlay.remove()
    }, 300);
}

function limpiarInputs(){
    const inputs = regForm.getElementsByTagName('input')
  
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i]
        if (input.type !== 'submit') {
            input.value = ''
        }
    }
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
        if(document.querySelector('#popupLt')){
            closePopup()
        }
    } 
})