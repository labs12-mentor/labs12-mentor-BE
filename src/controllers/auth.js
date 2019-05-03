module.exports = {
    loginUser,
    register,
    githubAuth,
    githubAuthCallback
}

require('dotenv').config();
const Users = require('../database/helpers/users');
const Organizations = require('../database/helpers/organizations');
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken');
const { authValidator } = require('../validators');
const passport = require('passport');
require('../middleware/passport');
const request = require('superagent');

async function loginUser(req, res){
    try {
        const userData = {
            email,
            password
        } = req.body;
    
        const validCredentials = await authValidator.validateCredentials(userData);
        if(!validCredentials){
            return await res
                .status(400)
                .json({ error: 'Login failed. Wrong credentials!' });
        }
        const userExists = await Users.getUserByEmail(userData.email);
        if(userExists === undefined) return await res.status(404).json({ error: 'Cannot log in! User not found.' });
        passport.authenticate('local', { session: false }, async (err, user, info) => {
            if(!user || err) return await res.status(401).json({ error: 'Cannot log in! Wrong credentials.' });
            req.login(user, { session: false }, async (err) => {
                if(err) throw new Error('Cannot log in!');
                const token = await generateToken(user);
                const {password, ...userWithoutPassword} = user;
                return res
                    .status(200)
                    .json({
                        ...userWithoutPassword,
                        token
                    });
            })
        })(req, res);
    } catch(error) {
        return await res
            .status(500)
            .json({ error: error.message });
    }
}

async function register(req, res){
    const {
        organization_name,
        organization_description,
        organization_logo,
        user_email,
        user_password,
        user_first_name,
        user_last_name
    } = req.body;

    let organizationData = {
        name: organization_name,
        description: organization_description,
        logo: organization_logo
    }

    let userData = {
        email: user_email,
        password: user_password,
        first_name: user_first_name,
        last_name: user_last_name,
        organization_id: -1
    }

    const validOrganization = await authValidator.validateOrganization(organizationData);
    const validUser = await authValidator.validateUser(userData);
    if(!validUser || !validOrganization){
        return await res
            .status(400)
            .json({ error: 'Cannot register organization or user - missing required fields!' });
    }

    if(await Users.getUserByEmail(userData.email) || await Organizations.getOrganizationByName(organizationData.name)){
        return await res
            .status(404)
            .json({ error: 'User or organization already exists!' });
    }

    try {
        const org = await Organizations.insertOrganization(organizationData);

        let hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;

        await Users.insertUser({
            ...userData,
            organization_id: org.id,
            role: 'OWNER'
        });

        return res
            .status(201)
            .json({ message: 'User successfully registered!' });
    } catch(error) {
        return await res
            .status(500)
            .json({ error: error.message });
    }
}

async function githubAuth(req, res){

}

async function githubAuthCallback(req, res){
}