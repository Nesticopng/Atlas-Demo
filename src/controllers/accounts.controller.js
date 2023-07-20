require('dotenv').config()

AccountCtrl = {}

const User = require('../models/user')
const passport = require('passport')

const NodeRSA = require('node-rsa') 

var public_key = '-----BEGIN PUBLIC KEY-----\n' +
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGL9euRBKM8p+rJLcl0856u68x \n' +
'4RlAC/kt0kGYLNqCFA8/eBKoelb5eyLW3mCtKJVDH/jG/6yPN+7xYDuMMZgP0CGV \n' +
'Oc/LT4QUgFU6kzFvNrjFIxcgwQ6GLkMhhotdTG4ksMQWazugo0hOf5yjBl0M1RCT \n' +
'cMrjs04vjZym5cmz2QIDAQAB \n' +
'-----END PUBLIC KEY-----';

var private_key = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIICWwIBAAKBgQCGL9euRBKM8p+rJLcl0856u68x4RlAC/kt0kGYLNqCFA8/eBKo \n' +
'elb5eyLW3mCtKJVDH/jG/6yPN+7xYDuMMZgP0CGVOc/LT4QUgFU6kzFvNrjFIxcg \n' +
'wQ6GLkMhhotdTG4ksMQWazugo0hOf5yjBl0M1RCTcMrjs04vjZym5cmz2QIDAQAB \n' +
'AoGAISaqs0vwBVBfsAl3EepdBadepgUFlvQeUHq0Z+MU7LQF/Fkuyt7GpAYO2mTA \n' +
'H6d6EMZSUN+TgyJ/brSmoYETHtyoSc0UaMvVPsIGT5He+UyZjz18xNaUqvmB8AdU \n' +
'lYP065yiu03M5uMm6OgPSGujhK7zCVG2u19D0Af4NGCV1gECQQD/c6HNKQ929+Gj \n' +
'4Q6Yd5O/wluStfIPGkgihkCRM9rg/y5Jw7u3f7VA53fpjEZfQzoP7fCNwSlINJCO \n' +
'k57cQ7gZAkEAhnmTplvquPC3n7zMnm1YDF2FI1hWuURFKHvq6ku/kayJ0VOeCKcu \n' +
'F1NRlRiv1kRNlaB9Vs6j4yr2GpcvVNxRwQJAGl9nvvSUQiYJR4/+n8MIn+2C4ryi \n' +
'BukhtV7C37rIyB3QO5FXmfQ3VEIRYS04PrGEFwzrntboWioDGpUm+3qKUQJARtmN \n' +
'SkwJWhExnc6aPCo+Bp3LRLkJUClBCrhnJ7RrJTQzlH8qt0JlzVJPnG9aTVjFS703 \n' +
'7GGJBWogKhhXjq1ZwQJAbd/1a13NGS3ZuLpBwlbv9z9VnDsHGU5svmpu4vjADGwp \n' +
'683pcckNo+vxQa+a+6TtMBA9AOtSRfWjFXBsKmUFbQ== \n' +
'-----END RSA PRIVATE KEY-----'

let key_private = new NodeRSA(private_key)
let key_public = new NodeRSA(public_key)

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
    res.json(AccData)
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
    const newUser = new User({ name, email, numero, cdi, password, balance})
    newUser.password = await newUser.encryptPassword(password)
    
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