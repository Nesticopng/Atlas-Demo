const { Router } = require('express')
const router = Router()
const { isAuthenticated } = require('../helpers/auth')
const { renderIndex, renderLogin, renderApp, renderTransactions, renderRecharge, API_INFLATION } = require('../controllers/index.controllers')

router.get('/' ,renderIndex)

router.get('/Login', renderLogin)

router.get('/App', isAuthenticated, renderApp)

router.get('/App/Transactions', isAuthenticated, renderTransactions)

router.get('/App/Recharge', isAuthenticated, renderRecharge)

router.get('/App/API-Price-Data', isAuthenticated, API_INFLATION)


module.exports = router