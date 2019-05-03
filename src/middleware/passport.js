require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const JWTStrategy = passportJWT.Strategy;
const Users = require('../database/helpers/users');
const Invitations = require('../database/helpers/invitations');
const bcrypt = require('bcryptjs');
const ExtractJWT  = passportJWT.ExtractJwt;
const request = require('superagent');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, cb) => {
        console.log(email, password);
        return Users.getUserByEmail(email)
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
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Authorization"),
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

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        passReqToCallback: true,
        scope: [ 'user:email' ]
    }, (req, accessToken, refreshToken, profile, cb) => {
        Users.getUserByGithubId(profile.id, async (user) => {
            if (!user) {
                if(req.query.state.length === 0){
                    return cb("Cannot register the user - no organization ID provided!");
                }else{
                    const invitationID = JSON.parse(req.query.state).invitation_id;
                    const invitationData = {
                        organization_id,
                        role
                    } = await Invitations.getInvitationById(invitationID);

                    request
                        .get('https://api.github.com/user/emails')
                        .set('Accept-Language', 'en-us')
                        .set('Accept', 'application/json')
                        .set('Authorization', `token ${accessToken}`)
                        .set('Accept-Encoding', 'gzip, deflate')
                        .then(async (response) => {
                            const userData = {
                                email: response.body.filter(elem => elem.primary)[0].email,
                                password: accessToken,
                                github_id: profile.id,
                                github_token: accessToken,
                                role: invitationData.role,
                                organization_id: invitationData.organization_id
                            }
                            await Users.insertUser(userData)
                                .then(async (result) => {
                                    const user = await Users.getUserById(result.id);
                                    return cb(null, user);
                                })
                                .catch(err => cb(err));
                            })
                        .catch(err => cb(err));
                }
            }
            return cb(null, user);
        });
    }
));

module.exports = passport;