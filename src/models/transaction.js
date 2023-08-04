const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
    trans_type: { type: String, required: true },
    addresse: { type: String, required: true },
    txt_desc:{ type: String, required: true },
    amount:{ type: String, required: true },
    remitent: { type: String, required: true }
},{
    timestamps: true
})

module.exports = model('transaction', transactionSchema)