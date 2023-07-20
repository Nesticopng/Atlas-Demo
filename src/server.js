require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const htmlViewEngine = require('./config/htmlViewer')
const morgan = require('morgan')
const expSession = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')


//Database
const db = process.env.MONGODB_URL
mongoose.connect(db)        
    .then(db => console.log('⛽✅'))
    .catch(err => console.log(err))


// Initializations
const app = express()
require('./config/passport')

// Settings
app.set('port', process.env.PORT || 4000)
app.engine('html', htmlViewEngine)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))


// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expSession({
    secret:'AtlasSCRT',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/accounts.routes'))
app.use(require('./routes/transactions.routes'))
app.use(require('./routes/recharge.routes'))


//Global Variables
app.use((req, res, next) =>{
    res.locals.user = req.user || null
    next()
})


//Static files
app.use(express.static(path.join(__dirname, 'public')))
app.use('/',express.static(path.resolve('views','home')));


module.exports = app