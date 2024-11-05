const passport = require('passport');
const GitHubStrategy = require('passport-github2')
const User = require('../models/user.js');

const initializePassport = () => {


    passport.use("github", new GitHubStrategy({
        clientID: "Iv23liyCYs7EnT7fpy9V",
        clientSecret: "bb781b50cc73c58fa154a0c9d5b3ee67ecc9f4e7",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 20,
                    email: profile._json.email,
                    password: ""
                }
                let createdUser = await User.create(newUser)
                done(null, createdUser)

            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
        console.log(profile)
    }))



    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

}

module.exports = initializePassport