module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    removeUser
};
const Users = require('../database/helpers/users');

async function getAllUsers(req, res){
    res.status(200).json({ message: 'get all users API OK' });
}

async function getUser(req, res){
    res.status(200).json({ message: 'get user API OK' });
}

async function updateUser(req, res){
    res.status(200).json({ message: 'update user API OK' });
}

async function deleteUser(req, res){
    res.status(200).json({ message: 'delete user API OK' });
}

async function removeUser(req, res){
    res.status(200).json({ message: 'remove user API OK' });
}