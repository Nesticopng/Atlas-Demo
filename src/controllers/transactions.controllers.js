const transCtrl = {}
const User = require('../models/user')
const transaction = require('../models/transaction')


transCtrl.depositTrans = (req, res) => {
    res.render("./App/Deposit")
}
  
transCtrl.postTrans = async (req, res) => {
    const { email, txt_desc, amount } = req.body

    const amountNum = parseFloat(amount)

    if(!email || !txt_desc || !amount || amountNum < 0.5){
        return res.render("./App/DepositError")
    }

    try {
        const dataBalanceAcc = await User.find({_id: req.user.id}).select('balance').lean()
        const balanceAcc = dataBalanceAcc[0].balance

        if(amount > balanceAcc){
            return res.render("./App/DepositError")
        }

        const addresseAcc = await User.findOne({ email })

        if (!addresseAcc) {
            return res.render("./App/DepositUserError")
        }

        const remitentAcc = req.user

        if (addresseAcc.email === remitentAcc.email){
            return res.render("./App/DepositSameError")
        }

        const addresse = addresseAcc.email
        const remitent = remitentAcc.email

        remitentAcc.balance -= amountNum 
        addresseAcc.balance += amountNum

        await remitentAcc.save()
        await addresseAcc.save()
        
        const trans_type = 'Depósito'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
        res.redirect("/App")

        } catch (error) {
            console.log(error)
        }
}

transCtrl.postQR = async (req, res) => {
    const { email, txt_desc, amount } = req.body

    const amountNum = parseFloat(amount)

    if(!email || !txt_desc || !amount || amountNum < 0.5){
        console.log("no llegan datos")
        return res.render("./App/TransactionsError")
    }

    try {
        const dataBalanceAcc = await User.find({_id: req.user.id}).select('balance').lean()
        const balanceAcc = dataBalanceAcc[0].balance

        if(amount > balanceAcc){
            console.log("Saldo")
            return res.render("./App/TransactionsError")
        }

        const addresseAcc = await User.findOne({ email })

        if (!addresseAcc) {
            console.log("No existe destinatario")
            return res.render("./App/TransactionsUserError")
        }

        const remitentAcc = req.user

        if (addresseAcc.email === remitentAcc.email){
            return res.render("./App/TransactionsError")
        }

        const addresse = addresseAcc.email
        const remitent = remitentAcc.email

        remitentAcc.balance -= amountNum 
        addresseAcc.balance += amountNum

        await remitentAcc.save()
        await addresseAcc.save()
        
        const trans_type = 'QR'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
        res.redirect("/App")
        
        } catch (error) {
                    console.log("Catch", error)

            return res.render("./App/TransactionsUserError")
        }
}

transCtrl.renderTrans = async (req, res) => {
    res.render("./App/Historial")
}

transCtrl.getTrans = async (req, res) => {
    const trans = await transaction.find({ $or: [{ addresse: req.user.email },{ remitent: req.user.email }] }).lean()
    res.json(trans)
}

transCtrl.sendDeposit = async (req, res) => {

}

module.exports = transCtrl
