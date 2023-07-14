const { Router } = require('express')
const router = Router()

const { 
    captureOrder_5, createOrder_5, 
    captureOrder_10, createOrder_10, 
    captureOrder_20, createOrder_20, 
    captureOrder_50, createOrder_50, 
    captureOrder_100, createOrder_100,
    cancelPay, 
    } = require('../controllers/recharge.controller')

const { isAuthenticated } = require('../helpers/auth')

router.get('/App/Recharge-5', isAuthenticated, createOrder_5)

router.get('/App/Recharge/Capture-5', isAuthenticated, captureOrder_5)

router.get('/App/Recharge-10', isAuthenticated, createOrder_10)

router.get('/App/Recharge/Capture-10', isAuthenticated, captureOrder_10)

router.get('/App/Recharge-20', isAuthenticated, createOrder_20)

router.get('/App/Recharge/Capture-20', isAuthenticated, captureOrder_20)

router.get('/App/Recharge-50', isAuthenticated, createOrder_50)

router.get('/App/Recharge/Capture-50', isAuthenticated, captureOrder_50)

router.get('/App/Recharge-100', isAuthenticated, createOrder_100)

router.get('/App/Recharge/Capture-100', isAuthenticated, captureOrder_100)

router.get('/App/Recharge/Cancel', isAuthenticated, cancelPay)

module.exports = router