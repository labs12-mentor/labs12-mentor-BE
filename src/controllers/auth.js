module.exports = {
    loginUser,
    registerUser
}

const Users = require('../database/helpers/users');
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken');
const { authValidator } = require('../validators');

async function loginUser(req, res){
    const {
        username,
        password
    } = req.body;

    const userData = {
        username,
        password
    }
    
    if(!authValidator.validateCredentials(userData)){
        return await res
            .status(404)
            .json({ error: 'Login failed. Wrong credentials!' });
    }
    try {
        const user = await Users.getUserByUsername(userData.username);
        if(user && !user.deleted && bcrypt.compareSync(userData.password, user.password)){
            const token = await generateToken(user);
            return await res
                .status(200)
                .json({ token });
        } else {
            return await res
                .status(404)
                .json({ message: 'No user found!' });
        }
    } catch(error) {
        return await res
            .status(500)
            .json({ error });
    }
}

async function registerUser(req, res){
    const {
        username,
        password,
        first_name,
        last_name,
        email,
        country,
        state,
        city,
        zipcode,
        role
    } = req.body;

    let userData = {
        username,
        password,
        first_name,
        last_name,
        email,
        country,
        state,
        city,
        zipcode,
        role: role || 0
    }

    if(!authValidator.validateUser(userData)){
        return await res
            .status(400)
            .json({ error: 'Cannot register user!' });
    }
    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 12);
        userData.password = hashedPassword;
        const user = await Users.getUserByUsername(userData.username);
        if(user !== undefined) throw new Error('User already registered!');
        await Users.insertUser(userData);
        return res
            .status(201)
            .json({ message: 'User successfully registered!' });
    } catch(error) {
        return await res
            .status(500)
            .json({ error });
    }
}