const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    numero: {type: String, required: true},
    cdi: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, required: true}
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.encryptNumero = async numero => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(numero, salt)
}

userSchema.methods.matchNumero = async function(numero){
    return await bcrypt.compare(numero, this.numero)
}

userSchema.methods.encryptCDI = async cdi => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(cdi, salt)
}

userSchema.methods.matchCDI = async function(cdi){
    return await bcrypt.compare(cdi, this.cdi)
}

module.exports = model('User', userSchema)