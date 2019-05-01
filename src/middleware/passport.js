require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const Users = require('../database/helpers/users');
const bcrypt = require('bcryptjs');
const ExtractJWT  = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, cb) => {
        return Users.getUserByUsername(username)
            .then(user => {
                if(bcrypt.compareSync(password, user.password)){
                    return cb(null, user, { message: 'Logged in successfully!' });
                }
                return cb(null, false, { error: 'Incorrect credentials!' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    }, (jwtPayload, cb) => {
        return Users.getUserById(jwtPayload.id)
            .then(user => {
                if(bcrypt.compareSync(password, user.password)){
                    return cb(null, user, { message: 'Logged in successfully!' });
                }
                return cb(null, false, { error: 'Incorrect token!' });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports = passport;