module.exports = {
    getAllUsers,
    getCurrentUser,
    getUser,
    updateUser,
    deleteUser,
    removeUser
};
const Users = require('../database/helpers/users');

async function getAllUsers(req, res){
    try {
        const users = await Users.getAllUsers();
        return await res.status(200).json(users);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getCurrentUser(req, res){
    const user = await Users.getUserById(req.user.id);
    res.status(200).json(user);
}

async function getUser(req, res){
    try {
        const user = await Users.getUserById(req.user.id);

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });

        if(user.role !== 'ADMINISTRATOR' && user.id !== req.params.id){
            return await res.status(403).json({ error: 'This profile is not yours!' });
        }
        
        return await res.status(200).json(user);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
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