rechargeCtrl = {}
const axios = require('axios');
const { PAYPAL_API, PAYPAL_API_SECRET, PAYPAL_CLIENT } = require('../config/config')
const transaction = require('../models/transaction')

rechargeCtrl.createOrder_5 = async (req, res) => {
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "5.00"
                    }
                },
            ],
            application_context: {
                brand_name: "Atlas",
                user_action:"PAY_NOW",
                return_url: "http://localhost:4000/App/Recharge/Capture-5",
                cancel_url: "http://localhost:4000/App/Recharge/Cancel"
            },
            experience_context: {
                landing_page: "NO_PREFERENCE"
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              }, 
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
        })
    
        const Redirect = response.data.links[1].href
    
        return res.redirect(`${Redirect}`)
    } catch {
        return res.redirect('/App/Recharge')
    }
}

rechargeCtrl.captureOrder_5 = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const amount = 5
    const amountNum = parseFloat(amount)
    const User = req.user

    if(response.data.status === "COMPLETED"){
        User.balance += amountNum
        await User.save()

        const txt_desc = 'Recarga de 5$'
        const email = req.user.email
        const remitent = 'PayPal'
        const addresse = req.user.email
        const trans_type = 'Recarga'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
    }
    
    return res.render('./App/RechargeDone')
}

rechargeCtrl.createOrder_10 = async (req, res) => {
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "10.00"
                    }
                },
            ],
            application_context: {
                brand_name: "Atlas",
                user_action:"PAY_NOW",
                return_url: "http://localhost:4000/App/Recharge/Capture-10",
                cancel_url: "http://localhost:4000/App/Recharge/Cancel"
            },
            experience_context: {
                landing_page: "NO_PREFERENCE"
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              }, 
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
        })
    
        const Redirect = response.data.links[1].href
    
        return res.redirect(`${Redirect}`)
    } catch {
        return res.redirect('/App/Recharge')
    }
}

rechargeCtrl.captureOrder_10 = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const amount = 10
    const amountNum = parseFloat(amount)
    const User = req.user

    if(response.data.status === "COMPLETED"){
        User.balance += amountNum
        await User.save()

        const txt_desc = 'Recarga de 10$'
        const email = req.user.email
        const remitent = 'PayPal'
        const addresse = req.user.email
        const trans_type = 'Recarga'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
    }
    
    return res.render('./App/RechargeDone')
}

rechargeCtrl.createOrder_20 = async (req, res) => {
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "20.00"
                    }
                },
            ],
            application_context: {
                brand_name: "Atlas",
                user_action:"PAY_NOW",
                return_url: "http://localhost:4000/App/Recharge/Capture-20",
                cancel_url: "http://localhost:4000/App/Recharge/Cancel"
            },
            experience_context: {
                landing_page: "NO_PREFERENCE"
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              }, 
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
        })
    
        const Redirect = response.data.links[1].href
    
        return res.redirect(`${Redirect}`)
    } catch {
        return res.redirect('/App/Recharge')
    }
}

rechargeCtrl.captureOrder_20 = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const amount = 20
    const amountNum = parseFloat(amount)
    const User = req.user

    if(response.data.status === "COMPLETED"){
        User.balance += amountNum
        await User.save()

        const txt_desc = 'Recarga de 20$'
        const email = req.user.email
        const remitent = 'PayPal'
        const addresse = req.user.email
        const trans_type = 'Recarga'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
    }
    
    return res.render('./App/RechargeDone')
}

rechargeCtrl.createOrder_50 = async (req, res) => {
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "50.00"
                    }
                },
            ],
            application_context: {
                brand_name: "Atlas",
                user_action:"PAY_NOW",
                return_url: "http://localhost:4000/App/Recharge/Capture-50",
                cancel_url: "http://localhost:4000/App/Recharge/Cancel"
            },
            experience_context: {
                landing_page: "NO_PREFERENCE"
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              }, 
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
        })
    
        const Redirect = response.data.links[1].href
    
        return res.redirect(`${Redirect}`)
    } catch {
        return res.redirect('/App/Recharge')
    }
}

rechargeCtrl.captureOrder_50 = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const amount = 50
    const amountNum = parseFloat(amount)
    const User = req.user

    if(response.data.status === "COMPLETED"){
        User.balance += amountNum
        await User.save()

        const txt_desc = 'Recarga de 50$'
        const email = req.user.email
        const remitent = 'PayPal'
        const addresse = req.user.email
        const trans_type = 'Recarga'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
    }
    
    return res.render('./App/RechargeDone')
}

rechargeCtrl.createOrder_100 = async (req, res) => {
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: "100.00"
                    }
                },
            ],
            application_context: {
                brand_name: "Atlas",
                user_action:"PAY_NOW",
                return_url: "http://localhost:4000/App/Recharge/Capture-100",
                cancel_url: "http://localhost:4000/App/Recharge/Cancel"
            },
            experience_context: {
                landing_page: "NO_PREFERENCE"
            }
        }
    
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
    
        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              }, 
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
        })
    
        const Redirect = response.data.links[1].href
    
        return res.redirect(`${Redirect}`)
    } catch {
        return res.redirect('/App/Recharge')
    }
}

rechargeCtrl.captureOrder_100 = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth:{
            username: PAYPAL_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const amount = 100
    const amountNum = parseFloat(amount)
    const User = req.user

    if(response.data.status === "COMPLETED"){
        User.balance += amountNum
        await User.save()

        const txt_desc = 'Recarga de 100$'
        const email = req.user.email
        const remitent = 'PayPal'
        const addresse = req.user.email
        const trans_type = 'Recarga'
        const newTransaction = new transaction({ txt_desc, email, amount, trans_type, addresse, remitent })
        await newTransaction.save()
    }
    
    return res.render('./App/RechargeDone')
}

rechargeCtrl.cancelPay = (req, res) => {
    res.redirect('/App/Recharge')
}

module.exports = rechargeCtrl