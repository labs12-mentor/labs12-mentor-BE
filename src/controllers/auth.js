module.exports = {
    loginUser,
    registerUser
}

const Users = require('../database/helpers/users');
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken');

async function loginUser(req, res){
    res.status(200).json({ message: 'login user API OK' });
}

async function registerUser(req, res){
    res.status(200).json({ message: 'register user API OK' });
}