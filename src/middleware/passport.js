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
const { authValidator } = require('../validators');
const generateToken = require('../middleware/generateToken');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, cb) => {
        const validCredentials = authValidator.validateCredentials({ email, password });
        if(!validCredentials){
            return cb(null, false, { status: 400, error: 'Login failed. Wrong credentials!' });
        }
        return Users.getUserByEmail(email)
            .then(user => {
                if(user === undefined) return cb(null, false, { status: 404, error: 'Cannot log in! User not found.' });
                if(bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user);
                    const {password, ...userWithoutPassword} = user;
                    return cb(null, userWithoutPassword, { status: 200, message: 'Logged in successfully!', token });
                }
                return cb(null, false, { status: 401, error: 'Incorrect credentials!' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Authorization"),
        secretOrKey: process.env.SECRET_KEY,
        passReqToCallback: true
    }, (req, jwtPayload, cb) => {
        console.log(jwtPayload);
        return Users.getUserById(jwtPayload.id)
            .then(user => {
                if(bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user);
                    const {password, ...userWithoutPassword} = user;
                    return cb(null, userWithoutPassword, { status: 200, message: 'Logged in successfully!', token });
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
            if (user == undefined) {
                if(req.query.state === undefined || req.query.state.length === 0){
                    return cb("Cannot register the user - no organization ID provided!");
                }else{
                    const invitationID = JSON.parse(req.query.state).invitation_id;
                    const invitationData = {
                        organization_id,
                        role
                    } = await Invitations.getInvitationById(invitationID);
                    return request
                        .get('https://api.github.com/user/emails')
                        .set({
                            'Accept-Language' : 'en-us',
                            'Accept' : 'application/json',
                            'Authorization' : `token ${accessToken}`,
                            'Accept-Encoding' : 'gzip, deflate'
                        })
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
            const token = generateToken(user);
            const { password, github_token, ...userWithoutPassword } = user;
            return cb(null, {...userWithoutPassword, token}, { status: 200, message: 'Logged in successfully!', token });
        })
        .catch((err) => cb(err));
    }
));

module.exports = passport;