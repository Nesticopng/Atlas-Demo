AccountCtrl = {}

const User = require('../models/user')
const passport = require('passport')

AccountCtrl.getData = async (req, res) => {
    const AccData = await User.find({_id: req.user.id}).select('name balance email').lean()
    res.json(AccData)
}

AccountCtrl.SingUpReg = async (req, res) =>{
    const { name, email, numero, cdi, password, confirm_password } = req.body
    error = []
    
    console.log(req.body)
    
    if(password != confirm_password){
        error.push('error conraseña no coincide')
    }

    if(password.lenght < 6){
        error.push('Contraseña muy insegura')
    }

    if(error.lenght >0 ){
        res.render("./login")

    }else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            console.log('Este usuario ya existe')
            res.redirect('/Login')
        }else{
            const balance = 200
            const newUser = new User({ name, email, numero, cdi, password, balance})
            newUser.password = await newUser.encryptPassword(password)
            newUser.numero = await newUser.encryptNumero(numero)
            newUser.cdi = await newUser.encryptCDI(cdi)

            await newUser.save()
            res.redirect('/Login')
        }
    }
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