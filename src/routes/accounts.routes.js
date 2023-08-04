const { Router } = require('express')
const router = Router()
const { isAuthenticated } = require('../helpers/auth')

const { LogIn, SingUpReg, getData, getAllData, logout } = require('../controllers/accounts.controller')

router.get('/Logout', isAuthenticated, logout)

router.post('/SingUpReg', SingUpReg)

router.post('/Logear', LogIn)

router.get('/App/Get-Data', isAuthenticated, getData)

router.get('/App/Get-All-Data', isAuthenticated, getAllData)


module.exports = router