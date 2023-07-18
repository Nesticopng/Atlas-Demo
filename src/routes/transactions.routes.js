const { Router } = require('express')
const router = Router()

const { postTrans, renderTrans, getTrans, depositTrans, sendDeposit, postQR } = require('../controllers/transactions.controllers')
const { isAuthenticated } = require('../helpers/auth')

router.get('/App/Historial', isAuthenticated, renderTrans)

router.get('/App/Transaction/Deposit', isAuthenticated, depositTrans)

router.post('/App/Transaction/Deposit', isAuthenticated, postTrans)

router.post('/App/Transaction/QR-Deposit', isAuthenticated, postQR)

router.get('/App/Get-Historial', isAuthenticated, getTrans)

router.get('/App/Transaction/Test', isAuthenticated, sendDeposit)

module.exports = router