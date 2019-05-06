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

const { authValidator } = require('../validators');
require('../middleware/passport');
const request = require('superagent');

async function loginUser(req, res){
    return await res.status(req.authInfo.status).json(
        req.authInfo.status === 200 ? {
            message: req.authInfo.message,
            token: req.authInfo.token,
            ...req.user
        } : {
            error: req.authInfo.error
        });
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