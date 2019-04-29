module.exports = {
    loginUser,
    registerUser,
    loginAdministrator,
    registerAdministrator,
    loginOwner,
    registerOwner
}

const Users = require('../database/helpers/users');
const Owners = require('../database/helpers/owners');
const Administrators = require('../database/helpers/administrators');
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
    const validCredentials = await authValidator.validateCredentials(userData);
    if(!validCredentials){
        return await res
            .status(400)
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
                .json({ error: 'No user found!' });
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
        zipcode
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
        zipcode
    }

    const validUser = await authValidator.validateUser(userData);
    if(!validUser){
        return await res
            .status(400)
            .json({ error: 'Cannot register user!' });
    }
    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 10);
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
            .json({ error: error.message });
    }
}

async function loginOwner(req, res){
    const {
        username,
        password
    } = req.body;

    const userData = {
        username,
        password
    }

    const validCredentials = await authValidator.validateCredentials(userData);
    if(!validCredentials){
        return await res
            .status(400)
            .json({ error: 'Login failed. Wrong credentials!' });
    }
    try {
        const user = await Owners.getOwnerByUsername(userData.username);
        if(user && !user.deleted && bcrypt.compareSync(userData.password, user.password)){
            const token = await generateToken(user);
            return await res
                .status(200)
                .json({ token });
        } else {
            return await res
                .status(404)
                .json({ error: 'No owner found!' });
        }
    } catch(error) {
        return await res
            .status(500)
            .json({ error });
    }
}

async function registerOwner(req, res){
    const {
        username,
        password,
        email,
        company_name
    } = req.body;

    let userData = {
        username,
        password,
        email,
        company_name
    }
    const checkIfCanRegister = await Owners.checkIfCanRegister();
    const validOwner = await authValidator.validateOwner(userData);
    if(!validOwner || !checkIfCanRegister){
        return await res
            .status(400)
            .json({ error: 'Cannot register new owner!' });
    }
    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const user = await Owners.getOwnerByUsername(userData.username);
        if(user !== undefined) throw new Error('Owner already registered!');
        await Owners.insertOwner(userData);
        return res
            .status(201)
            .json({ message: 'Owner successfully registered!' });
    } catch(error) {
        return await res
            .status(500)
            .json({ error: error.message });
    }
}

async function loginAdministrator(req, res){
    const {
        username,
        password
    } = req.body;

    const userData = {
        username,
        password
    }
    
    const validCredentials = await authValidator.validateCredentials(userData);
    if(!validCredentials){
        return await res
            .status(400)
            .json({ error: 'Login failed. Wrong credentials!' });
    }
    try {
        const user = await Administrators.getAdministratorByUsername(userData.username);
        if(user && !user.deleted && bcrypt.compareSync(userData.password, user.password)){
            const token = await generateToken(user);
            return await res
                .status(200)
                .json({ token });
        } else {
            return await res
                .status(404)
                .json({ error: 'No administrator found!' });
        }
    } catch(error) {
        return await res
            .status(500)
            .json({ error });
    }
}

async function registerAdministrator(req, res){
    const {
        username,
        password,
        first_name,
        last_name,
        email,
        company_name
    } = req.body;

    let userData = {
        username,
        password,
        first_name,
        last_name,
        email,
        company_name
    }
    const validAdministrator = await authValidator.validateAdministrator(userData);
    if(!validAdministrator){
        return await res
            .status(400)
            .json({ error: 'Cannot register new administrator!' });
    }
    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const user = await Administrators.getAdministratorByUsername(userData.username);
        if(user !== undefined) throw new Error('Administrator already registered!');
        await Administrators.insertAdministrator(userData);
        return res
            .status(201)
            .json({ message: 'Administrator successfully registered!' });
    } catch(error) {
        return await res
            .status(500)
            .json({ error: error.message });
    }
}
