const { Router } = require('express')
const router = Router()
const { isAuthenticated } = require('../helpers/auth')
const { APIPrice, renderIndex, renderLogin, renderApp, APILayer, renderTransactions, renderRecharge } = require('../controllers/index.controllers')

router.get('/' , renderIndex)

router.get('/Login', renderLogin)

router.get('/App', isAuthenticated, renderApp)

router.get('/Price', APIPrice)

router.get('/App/API-Price-Data', isAuthenticated, APILayer)

router.get('/App/Transactions', isAuthenticated, renderTransactions)

router.get('/App/Recharge', isAuthenticated, renderRecharge)

module.exports = router
