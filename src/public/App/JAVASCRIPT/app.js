const sideMenu = document.querySelector("aside")
const menuBtn = document.querySelector("#menu-btn")
const closeBtn = document.getElementById("btn-close")
const toggleBtn = document.querySelector("toggleBtn")
const themeToggler = document.querySelector("ToggleSwitch")
const logo = document.getElementById("logo")

const table = document.querySelector("table")
const thead = document.querySelector("thead")

const fetchData = fetch('/App/Get-Data')
const fetchHistorial = fetch('/App/Get-Historial')
const fetchPriceData = fetch('/App/API-Price-Data')

const info = document.getElementById("info")
const pfp = document.getElementById("pfp")
const balanceTxt = document.getElementById("balance-id")
const balanceBs = document.getElementById("balanceBs-id")

const Inflation = document.getElementById("inflation")
const inflationIcon = document.getElementById("inflation-icon")
const inflationText = document.getElementById("inflation-text")
const inflationSub = document.getElementById("inflation-sub")
const transactionsTbody = document.getElementById("transactions")

let balance
let email
let qrCodeScanned = false

menuBtn.addEventListener('click', () =>{
    sideMenu.classList.toggle("closed")
})

closeBtn.addEventListener('click', () =>{
    sideMenu.classList.toggle("closed")
})

const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

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

localStorage.removeItem('Alert-Login')

if(localStorage.getItem('Alert')){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popupLt'
    popup.id = 'popup'

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = '<i class="bx bx-x"></i>'
    closeButton.addEventListener('click', closePopup)

    const iconContainer = document.createElement('div')
    iconContainer.className = 'icon-advice'
    iconContainer.innerHTML = `<i class='bx bx-check'></i>`

    const message = document.createElement('h4')
    message.className = 'message'
    message.textContent = 'Transaccion completada'

    popup.appendChild(closeButton)
    popup.appendChild(iconContainer)
    popup.appendChild(message)
    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
    localStorage.removeItem('Alert')
}

function showTime(){
    document.getElementById("date").textContent=[ year, month, day  ].join( '/' );
}

showTime()

Promise.all([ fetchData, fetchPriceData, fetchHistorial ])
    .then(responses => {
        const response1 = responses[0]
        const response2 = responses[1]
        const response3 = responses[2]

        const dataPromise1 = response1.json()
        const dataPromise2 = response2.json()
        const dataPromise3 = response3.json()

        return Promise.all([dataPromise1, dataPromise2, dataPromise3])
    })
    .then(results => {

        const res1 = results[0]
        const res2 = results[1]
        const res3 = results[2]

        const BalanceUSD = res1[0].balance
        const DollarPrce = res2.start_rate.toFixed(2)
        const BsBalance = BalanceUSD*DollarPrce

        balance = parseFloat(res1.balance)
        email = res1.email
        showDataUser(res1)
        DollarPrice(DollarPrce)
        BalanceBs(BsBalance)
        showTransactions(res3)
        showInflation(res2.change_pct)
    })
    .catch(error => console.log(error))

function showDataUser(datos){
    const data = datos[0]
    console.log(datos)
    const nameDesc = document.createElement('div')
    nameDesc.innerHTML =  `
                            <p>Hola <b id="nameUser">${data.name}</b></p>
                            <small class="text-muted">Usuario</small>
                            `
    balanceTxt.innerText = `$ ${data.balance.toLocaleString()}`

    const PFP = document.createElement('h2')
    PFP.innerHTML = `${data.name.charAt(0)}`

    pfp.appendChild(PFP)
    info.appendChild(nameDesc)
}

function BalanceBs(Balance){
    if(Balance > 1000){
        balanceBs.innerText = `Bs ${Balance.toLocaleString()}`
    }else{
        balanceBs.innerText = `Bs ${Balance.toFixed(0).toLocaleString()}`
    }
}

function showTransactions(datos){
    let MaxShow = 0

    if(datos.length === 0){
        table.removeChild(thead)
        const h1 = document.createElement('h2')
        h1.innerHTML = `Aún no se han realizado transacciones...`
        table.appendChild(h1)
    }

    datos.reverse().forEach(transaction => {
        if(MaxShow < 4){
        const transType = transaction.trans_type
        let tdClass = ''
        if (transType === 'Depósito') {
            tdClass = 'green'
        } else if (transType === 'Recarga') {
            tdClass = 'blue'
        } else if (transType === 'QR') {
            tdClass = 'purple'
        }

        let date = ''
        if(transaction.updatedAt.substring(0, 4) === year){
            date = transaction.updatedAt.substring(0, 4)
        }else{
            date = transaction.updatedAt.slice(5, 10)
        }

        const tr = document.createElement('tr')
        tr.innerHTML = `
                        <td>${date}</td>
                        <td>${transaction.amount.toLocaleString()}$</td>
                        <td class="abreviation">${transaction.remitent}</td>
                        <td class="abreviation">${transaction.addresse}</td>
                        <td class="${tdClass}">${transType}</td>
                        `
        transactionsTbody.appendChild(tr)
        MaxShow++
        }
    })
}

function DollarPrice(res){    
    const Price = document.createElement('h2')
    Price.innerHTML = `<h2>${res} Bs</h2>`

    inflationText.appendChild(Price)
}

function showInflation(res){
    const inf = res.toFixed(2)

        if(inf <= -0.01){
        const i = document.createElement('i')
        i.innerHTML = `<i class='bx bxs-downvote'></i>`
        inflationIcon.appendChild(i)
        
        const txtInf = document.createElement('small')
        txtInf.innerHTML = `El dólar ha bajado ${inf}%`
        inflationSub.appendChild(txtInf)
        
        }if (inf >= 0.01){ 
        
        const i = document.createElement('i')
        i.innerHTML = `<i class='bx bxs-upvote'></i>`
        inflationIcon.appendChild(i)
        
        const txtInf = document.createElement('small')
        txtInf.innerHTML = `El dólar ha subido ${inf}%`
        inflationSub.appendChild(txtInf)

    }if(inf > -0.01 && inf < 0.01 ){   

        const i = document.createElement('i')
        i.innerHTML = `<i class='bx bx-minus'></i>`
        inflationIcon.appendChild(i)
        
        const txtInf = document.createElement('small')
        txtInf.innerHTML = `El dólar no ha fluctuado`
        inflationSub.appendChild(txtInf)

    }
}

function QR(){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.id = 'popup'

    const backButton = document.createElement('button')
    backButton.className = 'button-back hidden'
    backButton.id = 'backButton'
    backButton.innerHTML = '<i class="bx bx-chevron-left"></i>'
    backButton.addEventListener('click', goBack);

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = '<i class="bx bx-x"></i>'
    closeButton.addEventListener('click', closePopup)
    
    const message = document.createElement('h4')
    message.className = 'advice'
    message.textContent = 'Generar QR'
    message.id = "message"

    const form_container = document.createElement('div')
    form_container.className = 'form-container'

    const QR_Form = document.createElement('div')
    QR_Form.className = 'QR-Form'
    QR_Form.id = "QR_Form"
    QR_Form.innerHTML = `<form class="form">
                            <div class="credit-card-info--form">
                                <div class="input_container">
                                    <label class="input_label">Descripción de la Transacción (Opcional)</label>
                                    <input class="input_field" id="txt_desc" type="text" autocomplete="off" name="txt_desc" placeholder="Descripcion">
                                </div>
                                <div class="input_container">
                                    <label class="input_label">Monto</label>
                                    <input class="input_field" id="amount" type="text" autocomplete="off" oninput="validarTecla(event)" name="amount" title="el Monto" maxlength="10" placeholder="0,00">
                                </div>
                            </div>
                            <button onclick="genQRContainer()" type="button" class="purchase--btn G-QR">Generar QR</button>
                        </form>
                        `

    const QR_Container = document.createElement('div')
    QR_Container.className = 'QR-Container'
    QR_Container.id = "qrcode"

    popup.appendChild(backButton)
    popup.appendChild(closeButton)
    popup.appendChild(message)
    popup.appendChild(QR_Form)
    popup.appendChild(QR_Container)


    popupOverlay.appendChild(popup)
    document.body.appendChild(popupOverlay)

    setTimeout(function() {
        popupOverlay.classList.add('fade-in')
    }, 10)
}

function genQRContainer(){
    const backButton = document.querySelector('#backButton')
    const message = document.querySelector('#message')
    const QR_Form = document.querySelector('#QR_Form')
    const QR_Container = document.querySelector('#qrcode')

    backButton.classList.remove('hidden')
    setTimeout(function() {
    backButton.style.opacity = '1'
    }, 10)

    QR_Form.classList.add('form-slide-out')

    setTimeout(function() {
        message.textContent = 'QR Generado'

        QR_Container.style.display = 'block'
        QR_Container.style.transform = 'translateX(0)'
        QR_Container.style.opacity = '1'
        QR_Container.style.marginTop = '20px'
    }, 300);

    const txt_desc = document.getElementById("txt_desc").value
    const amount = document.getElementById("amount").value
    
    fetch('/App/Get-Data')
    .then(response => response.json())
    .then(datos => genQR(datos[0].email))
    .catch(error => error)

    function genQR(email){
        var data = {
            amount: amount,
            txt_desc: txt_desc,
            email: email
        }

        const QRData = JSON.stringify(data)
    
        QR_Container.innerHTML = ""
        
        if(document.body.classList.contains('dark')){
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: QRData,
                width: 256,
                height: 256,
                colorDark : "#0c0e0f",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            })
        }else{
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: QRData,
                width: 256,
                height: 256,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            })
        }
    }   
}

function startQRReader(){
    qrCodeScanned = false

    const interfaceContainer = document.createElement('div')
    interfaceContainer.className = 'interface-container'
    interfaceContainer.id = 'interface-container'

    const header = document.createElement('div')
    header.className = 'header'
    header.id = 'header'

    const backButton = document.createElement('button')
    backButton.className = 'back-button'
    backButton.innerHTML = '<i class="bx bx-chevron-left"></i>'
    backButton.addEventListener('click', goBackQR)

    const video = document.createElement('div')
    video.id = 'qr-video'
    video.className = 'video'

    const escaneandoQR = document.createElement('div')
    escaneandoQR.className = 'escaneando-qr'
    escaneandoQR.textContent = 'Escaneando QR'

    header.appendChild(backButton)
    header.appendChild(escaneandoQR)

    interfaceContainer.appendChild(header)

    interfaceContainer.appendChild(video)

    document.body.appendChild(interfaceContainer)

    setTimeout(() => {
        interfaceContainer.classList.add('show-scanner')
        header.classList.remove('hide')
    }, 10)

    const html5QrCode = new Html5Qrcode(
    "qr-video", { formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ] })

    const qrCodeSuccessCallback = (decodedResult, decodedText) => {
        if(!qrCodeScanned){
            qrCodeScanned = true
            goBackQR()
            ReadedQR(decodedText)
            html5QrCode.clear()
        }
    }

    const config = { fps: 60, qrbox: { width: 256, height: 256 }, aspectRatio: 1.777778 }
    
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
    .catch(error => {
        goBackQR()
        const msg = 'No se pudo acceder a la cámara'
        ErrorMSG(msg)
    })
}

function ReadedQR(result){
    const dataRe = result.decodedText
    try{
        const dataReObj = JSON.parse(dataRe)
        if(!'amount' in dataReObj || !'txt_desc' in dataReObj || !'email' in dataReObj){
            const msg = 'Por favor ingrese un QR válido'
            ErrorMSG(msg)
        }

        if('amount' in dataReObj && 'txt_desc' in dataReObj && 'email' in dataReObj){
            PayQR(dataReObj)
        }

    }catch(error) {
        const msg = 'Por favor ingrese un QR válido'
        ErrorMSG(msg)
    }
}

function PayQR(dataReObj){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popupPay-overlay'

    const popup = document.createElement('div')
    popup.className = 'popupLt'
    popup.id = 'popupPay'

    const closeButton = document.createElement('button')
    closeButton.className = 'button-close'
    closeButton.innerHTML = '<i class="bx bx-x"></i>'
    closeButton.addEventListener('click', closePopupPay)
    
    const message = document.createElement('h1')
    message.className = 'advice'
    message.textContent = 'QR Pago'
    message.id = "message"

    const form_container = document.createElement('div')
    form_container.className = 'form-container'

    const QR_Form = document.createElement('div')
    QR_Form.className = 'QR-Form'
    QR_Form.id = "QR_Form"

    if(!dataReObj.txt_desc && dataReObj.amount){
        QR_Form.innerHTML = 
        `<form class="form" id="Pay" action="https://atlas-fgav.onrender.com/App/Transaction/QR-Deposit" method="POST">
            <div class="credit-card-info--form" >
                <input id="txt_desc" type="hidden" name="txt_desc" value="${dataReObj.txt_desc}">
                <input id="amount" type="hidden" name="amount" value="${dataReObj.amount}">
                <input id="email" type="hidden" name="email" value="${dataReObj.email}">
                <h2 class="txt-info">¿Estás seguro de querer pagar <span style="color: rgb(16, 204, 116);">${dataReObj.amount.toLocaleString()}$</span><br>a <span style="color: #3C60FC;">${dataReObj.email}</span>?</h2>
            </div>
            <button class="purchase--btn G-QR">Pagar</button>
        </form>`

        popup.appendChild(closeButton)
        popup.appendChild(message)
        popup.appendChild(QR_Form)
    
        popupOverlay.appendChild(popup)
        document.body.appendChild(popupOverlay)
      
        setTimeout(function() {
            popupOverlay.classList.add('fade-in')
        }, 10)

    }else if(dataReObj.txt_desc && dataReObj.amount){
        QR_Form.innerHTML = 
        `<form class="form" id="Pay" action="https://atlas-fgav.onrender.com/App/Transaction/QR-Deposit" method="POST">
            <div class="credit-card-info--form" >
                <input id="txt_desc" type="hidden" name="txt_desc" value="${dataReObj.txt_desc}"">
                <input id="amount" type="hidden" name="amount" value="${dataReObj.amount}">
                <input id="email" type="hidden" name="email" value="${dataReObj.email}">
                <h2 class="txt-info">¿Estás seguro de querer pagar <span style="color: rgb(16, 204, 116);">${dataReObj.amount.toLocaleString()}$</span><br>a <span style="color: #3C60FC;">${dataReObj.email}</span><br>por <span style="color: #3C60FC;">${dataReObj.txt_desc}</span>?</h2>
            </div>
            <button class="purchase--btn G-QR">Pagar</button>
        </form>`

        popup.appendChild(closeButton)
        popup.appendChild(message)
        popup.appendChild(QR_Form)
    
        popupOverlay.appendChild(popup)
        document.body.appendChild(popupOverlay)
      
        setTimeout(function() {
            popupOverlay.classList.add('fade-in')
        }, 10)

    }else if(!dataReObj.txt_desc && !dataReObj.amount){
        QR_Form.innerHTML = 
        `<form class="form" id="Pay" action="https://atlas-fgav.onrender.com/App/Transaction/QR-Deposit" method="post">
            <div class="credit-card-info--form">
                <input id="txt_desc" type="hidden" name="txt_desc" value="${dataReObj.txt_desc}">
                <input id="email" type="hidden" name="email" value="${dataReObj.email}">
                
                <h2 class="txt-info">Ingrese el monto que va a depositar<br>a <span style="color: #3C60FC;">${dataReObj.email}</span>?</h2>
                <div class="input_container">
                    <label class="input_label">Monto</label>
                    <input class="input_field" id="amount" type="text" autocomplete="off" oninput="validarTecla(event)" name="amount" title="el Monto" maxlength="10" placeholder="0,00">
                </div>
            </div>
            <button class="purchase--btn G-QR">Pagar</button>
        </form>`

        popup.appendChild(closeButton)
        popup.appendChild(message)
        popup.appendChild(QR_Form)
    
        popupOverlay.appendChild(popup)
        document.body.appendChild(popupOverlay)
      
        setTimeout(function() {
            popupOverlay.classList.add('fade-in')
        }, 10)
    }else if(dataReObj.txt_desc && !dataReObj.amount){
        QR_Form.innerHTML = 
        `<form class="form" id="Pay" action="https://atlas-fgav.onrender.com/App/Transaction/QR-Deposit" method="post">
            <div class="credit-card-info--form">
                <input id="txt_desc" type="hidden" name="txt_desc" value="${dataReObj.txt_desc}">
                <input id="email" type="hidden" name="email" value="${dataReObj.email}">
                <h2 class="txt-info">Ingrese el monto que va a depositar<br>a <span style="color: #3C60FC;">${dataReObj.email}</span> <br> por <span style="color: #3C60FC;">${dataReObj.txt_desc}</span>?</h2>
                <div class="input_container">
                    <label class="input_label">Monto</label>
                    <input class="input_field" id="amount" type="text" autocomplete="off" oninput="validarTecla(event)" name="amount" title="el Monto" maxlength="10" placeholder="0,00">
                </div>
            </div>
            <button class="purchase--btn G-QR">Pagar</button>
        </form>`

        popup.appendChild(closeButton)
        popup.appendChild(message)
        popup.appendChild(QR_Form)
    
        popupOverlay.appendChild(popup)
        document.body.appendChild(popupOverlay)
      
        setTimeout(function() {
            popupOverlay.classList.add('fade-in')
        }, 10)
    }
}

function val(event){
    event.preventDefault()

    var emailInput = document.getElementById("email").value
    var amountInput = document.getElementById("amount").value

    if(validarCorreo(emailInput) && emailInput != email && amountInput < balance){
        localStorage.setItem('Alert', 'La transaccion ha sido completada')
        event.target.submit()
    }else if(emailInput === email){
        const err = `No puedes transferirte a ti mismo`
        ErrorMSG(err)
    }else if(amountInput > balance){
        const err = `El monto es mayor a su saldo <br> por favor recargue` 
        ErrorMSG(err)
    }else if(!validarCorreo(emailInput)){
        const err = 'El correo no es válido'
        ErrorMSG(err)
    }
}

function ErrorMSG(err){
    const popupOverlay = document.createElement('div')
    popupOverlay.className = 'popup-overlay'
    popupOverlay.id = 'popup-overlay'

    const popup = document.createElement('div')
    popup.className = 'popupLt'
    popup.id = 'popup'

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

function validarCorreo(correo) {
    var patron = /^[\w\.-]+@[\w\.-]+\.\w+$/
    return patron.test(correo)
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

function closePopupPay() {
    const popupOverlay = document.querySelector('#popupPay-overlay')
    const popup = document.querySelector('#popupPay')
    
    popupOverlay.classList.remove('fade-in')
    popupOverlay.classList.add('fade-out')
    popup.classList.remove('fade-in')
    popup.classList.add('fade-out')
    
    setTimeout(function() {
        popupOverlay.remove()
    }, 300)
}

function goBack() {
    const message = document.querySelector('#message')
    const QR_Form = document.querySelector('#QR_Form')
    const QR_Container = document.querySelector('#qrcode')
    const backButton = document.querySelector('#backButton')

    backButton.style.opacity = '0'
    backButton.addEventListener('transitionend', function() {
        backButton.classList.add('hidden')
        backButton.removeEventListener('transitionend', arguments.callee)
    });
    
    QR_Container.style.animation = 'fade-out 0.3s forwards'
    QR_Container.addEventListener('animationend', function() {
        QR_Container.style.display = 'none'
        QR_Container.style.animation = ''
    
        QR_Form.style.opacity = '0'
        QR_Form.style.transform = 'translateX(100%)'
        QR_Form.style.display = 'block'
    
        setTimeout(function() {
            message.textContent = 'Generar QR'
    
            QR_Form.style.opacity = '1'
            QR_Form.style.transform = 'translateX(0)'
        }, 10)
    })
}

function goBackQR(){
    const interfaceContainer = document.querySelector('#interface-container')
    const header = document.querySelector('#header')

    interfaceContainer.classList.remove('show-scanner')
    header.classList.add('hide')

    setTimeout(() => {
        interfaceContainer.remove()
    }, 300)
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
        if(document.querySelector('#popup') && document.querySelector('#popupPay')){
            closePopup()
        }else if(document.querySelector('#popup') && document.querySelector('#interface-container')){
            closePopup()
            goBackQR()
        }else if(document.querySelector('#popupPay')){
            closePopupPay()
        }else if(document.querySelector('#interface-container')){
            goBackQR()
        }else if(document.querySelector('#popup')){
            closePopup()
        }
    } 
})
