require('dotenv').config()

const NodeRSA = require('node-rsa') 

const public_key = process.env.PUBLIC_KEY
const private_key = process.env.PRIVATE_KEY

let key_private = new NodeRSA(private_key)
let key_public = new NodeRSA(public_key)

AccountCtrl = {}

const User = require('../models/user')
const passport = require('passport')

AccountCtrl.getAllData = async (req, res) => {
    try{
        const AccData = await User.find({ _id: req.user.id }).select('cdi numero').lean()
        const cdi = AccData[0].cdi
        const numero = AccData[0].numero

        var decryptedCDI = key_private.decrypt(cdi, 'utf8')
        var decryptedNumber = key_private.decrypt(numero, 'utf8')

        var JSONData = {
            cdi: decryptedCDI,
            number: decryptedNumber
        }

        res.json(JSONData)

    }catch(error){
        console.log(error)
    }
}

AccountCtrl.getData = async (req, res) => {
    const AccData = await User.find({_id: req.user.id}).select('name balance email').lean()

    for (let i = 0; i < AccData.length; i++){
        const obj = AccData[i]
        obj.name = key_private.decrypt(obj.name, 'utf8')
        obj.balance = key_private.decrypt(obj.balance, 'utf8')
    }

    return res.json(AccData)
}

AccountCtrl.SingUpReg = async (req, res) => {
    const { name, email, Newnumero, Newcdi, password, confirm_password } = req.body

    if(!name || !email || !Newnumero || !Newcdi || !password || !confirm_password){
        return res.status(400).json({ error: 'Campos indefinidos o inexistentes' })
    }

    const cdiRegex = /^\d{7,8}$/
    const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
    const numeroRegex = /^\d{3}-\d{7}$/

    if(!emailRegex.test(email) || !cdiRegex.test(Newcdi) || !numeroRegex.test(Newnumero) || Newnumero.length > 11 || password.lenght < 6 || password != confirm_password){
        return res.status(400).json({ mensaje: 'Formato incorrecto' })
    }

    const emailUser = await User.findOne({email: email})

    if(emailUser){
        return res.status(400).json({ mensaje: 'Este correo ya está en uso' })
    }

    var numero = key_public.encrypt(Newnumero, 'base64')
    var cdi = key_public.encrypt(Newcdi, 'base64')

    const balance = 200
    const newUser = new User({ name, email, numero, cdi, password, balance })
    newUser.password = await newUser.encryptPassword(password)
    newUser.name = key_public.encrypt(name, 'base64')
    newUser.balance = key_public.encrypt(balance, 'base64')

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
