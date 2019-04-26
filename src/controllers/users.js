module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    removeUser
};
const Users = require('../database/helpers/users');

async function getAllUsers(req, res){
    const users = await Users.getAllUsers();
    res.status(200).json(users);
}

async function getUser(req, res){
    const user = await Users.getUserById(req.params.id);
    res.status(200).json(user);
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