AccountCtrl = {}

const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


AccountCtrl.getData = async (req, res) => {
    const AccData = await User.find({_id: req.user.id}).select('name balance email').lean()
    res.json(AccData)
}

AccountCtrl.SingUpReg = async (req, res) => {
    const { name, email, numero, cdi, password, confirm_password } = req.body

    if(!name || !email || !numero || !cdi || !password || !confirm_password){
        return res.status(400).json({ error: 'Campos indefinidos o inexistentes' })
    }

    const cdiRegex = /^\d{7,8}$/
    const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
    const numeroRegex = /^\d{3}-\d{7}$/

    if(!emailRegex.test(email) || !cdiRegex.test(cdi) || !numeroRegex.test(numero) || numero.length > 11 || password.lenght < 6 || password != confirm_password){
        return res.status(400).json({ mensaje: 'Formato incorrecto' })
    }

    const emailUser = await User.findOne({email: email})

    if(emailUser){
        return res.status(400).json({ mensaje: 'Este usuario ya existe' })
    }

    const existingUser = await User.findOne({
        $or: [
            { numero: numero },
            { cdi: cdi }
        ]
    })
    
    if(existingUser){
        const isNumeroMatch = await existingUser.matchNumero(numero)
        const isCdiMatch = await existingUser.matchCDI(cdi)
    
        if(isNumeroMatch || isCdiMatch){
            return res.status(400).json({ error: 'El número o cédula ya está en uso.' })
        }
    }

    const balance = 200
    const newUser = new User({ name, email, numero, cdi, password, balance})
    newUser.password = await newUser.encryptPassword(password)
    newUser.numero = await newUser.encryptNumero(numero)
    newUser.cdi = await newUser.encryptCDI(cdi)
    
    await newUser.save()

    res.json({ mensaje: 'Te has registrado exitosamente', status: true })

}

AccountCtrl.LogIn = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/App',
    failureFlash: true
})

AccountCtrl.logout = (req, res) =>{
    req.logout((err) => {
        if(err){
            
            return next(err)

        }else{
        res.redirect('/Login')}}
    )
}


module.exports = AccountCtrl