require('dotenv').config()

const indexCtrl = {}
const API_KEY = process.env.API_KEY

const myHeaders = { apikey: API_KEY }

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}

let DataJSON

indexCtrl.renderIndex = (req, res) =>{
    res.render("./home") 
}

indexCtrl.renderLogin = (req, res) => {
    res.render("./Login")
}

indexCtrl.renderApp = (req, res) => {
    res.render("./App/Home")
}

indexCtrl.renderTransactions = (req, res) => {
    res.render("./App/Transactions")
}

indexCtrl.renderRecharge = (req, res) => {
    res.render("./App/Recharge")
}

indexCtrl.APIPrice = (req, res) => {
    
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    
    const yesterday = new Date(today)
          yesterday.setDate(today.getDate() - 1)
    
    const year_y = yesterday.getFullYear()
    const month_y = String(yesterday.getMonth() + 1).padStart(2, '0')
    const day_y = String(yesterday.getDate()).padStart(2, '0')
    
    fetch(`https://api.apilayer.com/exchangerates_data/fluctuation?base=USD&start_date=${year_y}-${month_y}-${day_y}&end_date=${year}-${month}-${day}`, requestOptions)
        .then(response => response.json())
        .then(result => res.json(result.rates.VES))
        .catch(error => console.log('ERROR', error))
}

module.exports = indexCtrl
