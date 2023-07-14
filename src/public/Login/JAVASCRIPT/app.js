const sign_in_btn = document.querySelector("#sign-in-btn")
const sign_up_btn = document.querySelector("#sign-up-btn")
const container = document.querySelector(".container")
const cdiInput = document.getElementById("cdiInput");
const inputValor = document.getElementById("email").value;

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode")
})

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode")
})

function formatInput(event) {
    const input = event.target
    let value = input.value.replace(/\D/g, '')
    
    if (value.charAt(0) === '0') {
      value = value.substring(1)
    }
    
    value = value.substring(0, 3) + '-' + value.substring(3, 12);
    
    if (value.length > 3 && value.charAt(3) !== '-') {
      value = value.substring(0, 3) + '-' + value.substring(3);
    }
      
    input.value = value.substring(0, 13);
}

cdiInput.addEventListener('input', function() {
    const value = this.value;
    const numericValue = value.replace(/\D/g, '');
    this.value = numericValue.slice(0, 8);
})

document.getElementById("formReg").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var correoInput = document.getElementById("email").value;
    var passwordInput = document.getElementById("password").value;
    var confirmPasswordInput = document.getElementById("confirmPassword").value;

    if (validarCorreo(correoInput) && passwordInput.length >= 7 && passwordInput === confirmPasswordInput) {
      event.target.submit();
    } else {
        if(!validarCorreo(correoInput)){
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
            message.textContent = 'Por favor ingrese un correo valido'
            
            popup.appendChild(closeButton)
            popup.appendChild(iconContainer)
            popup.appendChild(message)
            popupOverlay.appendChild(popup)
            document.body.appendChild(popupOverlay)
            
            setTimeout(function() {
                popupOverlay.classList.add('fade-in')
            }, 10)
        }else if (passwordInput.length < 7){
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
            message.textContent = 'Por favor ingrese una contraseña con al menos 8 caracteres.'
              
            popup.appendChild(closeButton)
            popup.appendChild(iconContainer)
            popup.appendChild(message)
            popupOverlay.appendChild(popup)
            document.body.appendChild(popupOverlay)
              
            setTimeout(function() {
                popupOverlay.classList.add('fade-in')
            }, 10)    
        }else if(passwordInput !==confirmPasswordInput){
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
            message.textContent = 'Por favor confirme la contraseña'
              
            popup.appendChild(closeButton)
            popup.appendChild(iconContainer)
            popup.appendChild(message)
            popupOverlay.appendChild(popup)
            document.body.appendChild(popupOverlay)
              
            setTimeout(function() {
                popupOverlay.classList.add('fade-in')
            }, 10)     
        }
    }
})

function validarCorreo(correo) {
    var patron = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return patron.test(correo);
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