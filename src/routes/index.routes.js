const { Router } = require('express')
const router = Router()
const { isAuthenticated } = require('../helpers/auth')
const { APIPrice, renderIndex, renderLogin, renderApp, renderTransactions, renderRecharge } = require('../controllers/index.controllers')

router.get('/' , renderIndex)

router.get('/Login', renderLogin)

router.get('/App', isAuthenticated, renderApp)

router.get('/App/API-Price-Data', isAuthenticated, APIPrice)

router.get('/App/Transactions', isAuthenticated, renderTransactions)

router.get('/App/Recharge', isAuthenticated, renderRecharge)

module.exports = router
