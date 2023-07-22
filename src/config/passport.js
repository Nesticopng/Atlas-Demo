const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const user = await User.findOne({email: email})
    
    if(!user){
        return done(null, false, { message: 'Not user found'})
    }else{
        const match = await user.matchPassword(password)
        if(match){
            return done(null, user)
        }else{
            return done(null, false, { message: 'Not user found' })
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err, null)
    }
})