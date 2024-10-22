const passport = require('passport');
const jwt = require('passport-jwt');
const User = require('../models/user.js');


const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt


const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }
        , async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload);
            }
            catch (error) {
                return done(error);
            }
        }
    ));

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

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
}


module.exports = initializePassport