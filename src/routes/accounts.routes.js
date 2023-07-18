const { Router } = require('express')
const router = Router()
const { isAuthenticated } = require('../helpers/auth')

const { LogIn, SingUpReg, getData, logout } = require('../controllers/accounts.controller')

router.get('/Logout', isAuthenticated, logout)

router.post('/SingUpReg', SingUpReg)

router.post('/Logear', LogIn)

router.get('/App/Get-Data', isAuthenticated, getData)

module.exports = router