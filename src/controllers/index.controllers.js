require('dotenv').config()
const axios = require('axios');

const indexCtrl = {}
const API_KEY = process.env.API_KEY

const myHeaders = { apikey: API_KEY }

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}

const today = new Date()
const year = today.getFullYear()
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

indexCtrl.renderProfile = (req, res) => {
    res.render("./App/Profile")
}

indexCtrl.APIPrice = (req, res) => {
    axios.get(`https://api.apilayer.com/exchangerates_data/fluctuation?base=USD&start_date=${year_y}-${month_y}-${day_y}&end_date=${year}-${month}-${day}`, requestOptions)
        .then(response => {
          const data = response.data.rates.VES
          res.json(data) })
        .catch(error => { res.json(error) })
}


module.exports = indexCtrl
