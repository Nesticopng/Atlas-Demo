require('dotenv').config()
const Paypal = {}

Paypal.PAYPAL_CLIENT = process.env.PAYPAL_API_CLIENT
Paypal.PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
Paypal.PAYPAL_API = 'https://api-m.sandbox.paypal.com'

module.exports = Paypal