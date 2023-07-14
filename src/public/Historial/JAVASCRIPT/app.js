const sideMenu = document.querySelector("aside")
const menuBtn = document.querySelector("#menu-btn")
const closeBtn = document.getElementById("btn-close")
const themeToggler = document.querySelector("ToggleSwitch")
const logo = document.getElementById("logo")

const table = document.querySelector("table")
const transactionsTbody = document.getElementById("transactions")

const fetchData = fetch('/App/Get-Data')
const fetchHistorial = fetch('/App/Get-Historial')

const toggleBtn = document.querySelector("toggleBtn")
const divLogo = document.querySelector("logo")
const qrA = document.getElementById("QR-A")
const depositA = document.getElementById("deposit-A")

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
})

closeBtn.addEventListener('click', () =>{
    sideMenu.classList.toggle("closed")
})

Promise.all([fetchData, fetchHistorial])
    .then(responses => {
        const response1 = responses[0]
        const response2 = responses[1]

        const dataPromise1 = response1.json()
        const dataPromise2 = response2.json()

        return Promise.all([dataPromise1, dataPromise2])
    })
    .then(results => {
        const res1 = results[0]
        const res2 = results[1]

        showDataUser(res1)
        showTransactions(res2)
    })
  .catch(error => error)

function showTransactions(datos){
    let MaxShow = 0

    if(datos.length === 0){
        table.removeChild(thead)
        const h1 = document.createElement('h2')
        h1.innerHTML = `Aún no se han realizado transacciones...`
        table.appendChild(h1)
    }

    datos.reverse().forEach(transaction => {
        if(MaxShow < 30){
            const date = transaction.updatedAt.slice(0, 10)
            const transType = transaction.trans_type
            let tdClass = ''
            if (transType === 'Depósito') {
                tdClass = 'green'
            } else if (transType === 'Recarga') {
                tdClass = 'blue'
            } else if (transType === 'QR') {
                tdClass = 'purple'
            }

            const tr = document.createElement('tr')
            tr.innerHTML = `
                            <td>${date}</td>
                            <td>${transaction.amount.toLocaleString()}$</td>
                            <td class="abreviation">${transaction.remitent}</td>
                            <td class="abreviation">${transaction.addresse}</td>
                            <td class="${tdClass}">${transType}</td>
                            `

            tr.addEventListener('click', () => {
            ShowTransaction(transaction)
            })
            transactionsTbody.appendChild(tr)
            MaxShow++
        }
    })
}

function showDataUser(datos){
    const data = datos[0]

    const nameDesc = document.createElement('div')
    nameDesc.innerHTML =    `
                            <p>Hola <b id="nameUser">${data.name}</b></p>
                            <small class="text-muted">Usuario</small>
                            `
    const PFP = document.createElement('h2')
    PFP.innerHTML = `${data.name.charAt(0)}`

    pfp.appendChild(PFP)
    info.appendChild(nameDesc)
}

function ShowTransaction(transaction){
    console.log(transaction)
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.id = 'popup'

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = "<i class='bx bx-x'></i>"
    closeButton.addEventListener('click', closePopup)

    const message = document.createElement('h1')
    message.className = 'message'
    message.textContent = `${transaction.trans_type}`

    popup.appendChild(closeButton)
    popup.appendChild(message)
    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
}

function closePopup() {
    const popupOverlay = document.querySelector('#popup-overlay')
    const popup = document.querySelector('#popup')
    
    popupOverlay.classList.remove('fade-in')
    popupOverlay.classList.add('fade-out')
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
    
    setTimeout(function() {
        popupOverlay.remove()
    }, 300)
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
        if(document.querySelector('#popup')){
            closePopup()
        }
    } 
})