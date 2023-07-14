require('dotenv').config();

const indexCtrl = {}
const API_KEY = process.env.API_KEY

var myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}

const today = new Date()
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)

const year_y = yesterday.getFullYear()
const month_y = String(yesterday.getMonth() + 1).padStart(2, '0')
const day_y = String(yesterday.getDate()).padStart(2, '0')

indexCtrl.renderIndex = (req, res) =>{
    res.render("./home") 
}

indexCtrl.renderLogin = (req, res) => {
    res.render("./login")
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

indexCtrl.API_PRICE = (req, res) => {
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=VES&from=USD&amount=1", requestOptions)
        .then(response => response.json())
        .then(result => res.json(result.result) )
        .catch(error => console.log('error', error))
}

indexCtrl.API_INFLATION = (req, res) => {
    fetch(`https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${year_y}-${month_y}-${day_y}&end_date=${year}-${month}-${day}`, requestOptions)
        .then(response => response.json())
        .then(result => res.json(result.rates.VES.change_pct) )
        .catch(error => console.log('error', error));
}


module.exports = indexCtrl