const passport = require('passport');
const local = require('passport-local')

const userService = require('../models/user.js')
const { createHash, isValidatePassword } = require('../../../utils.js');
const User = require('../models/user.js');


const LocalStrategy = local.Strategy

const initializePassport = () => {


    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body

            try {
                let user = await User.findOne({ email: username })
                if (user) {
                    console.log('Usuario existente')
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await User.create(newUser)
                return done(null, result)
            } catch (error) {
                return done(`'Error al obtener usuario' ${error}`)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username })
            if (!user) {
                console.log('Usuario no existe')
                return done(null, false)
            }
            if (!isValidatePassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport