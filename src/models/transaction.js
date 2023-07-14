const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const transactionSchema = new Schema({
    trans_type: { type: String, required: true },
    email: { type: String,  required: true },
    addresse: { type: String, required: true },
    txt_desc:{ type: String, required: true },
    amount:{ type: Number, required: true },
    remitent: { type: String, required: true }
},{
    timestamps: true
})

transactionSchema.methods.encryptNumber = async number => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(number, salt)
}

transactionSchema.methods.matchNumber = function(number){
    return bcrypt.compare(number, this.number)
}

transactionSchema.methods.encryptCDI = async cdi => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(cdi, salt)
}

transactionSchema.methods.matchCDI = function(cdi){
    return bcrypt.compare(cdi, this.cdi)
}

transactionSchema.methods.encryptAmount = async amount => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(amount, salt)
}

transactionSchema.methods.matchAmount = function(amount){
    return bcrypt.compare(amount, this.amount)
}

module.exports = model('transaction', transactionSchema)