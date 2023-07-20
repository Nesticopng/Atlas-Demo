const { Schema, model } = require('mongoose')

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

module.exports = model('transaction', transactionSchema)