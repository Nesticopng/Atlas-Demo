require('dotenv').config()

const indexCtrl = {}
const API_KEY = process.env.API_KEY

const myHeaders = { apikey: API_KEY }

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}

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

indexCtrl.API_INFLATION = (req, res) => {
    const today = new Date()
    res.json(today)
}


module.exports = indexCtrl
