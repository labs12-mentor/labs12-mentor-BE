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
    try {
        const user = await Users.getUserById(req.user.id);

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });
        
        return await res.status(200).json(user);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getUser(req, res){
    try {
        const user = await Users.getUserById(req.params.id);

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });
        
        return await res.status(200).json(user);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res){
    try {
        const current_user = await Users.getUserById(req.user.id);
        const user = await UIEvent.getUserById(req.params.id);

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });
        
        if((current_user.role !== 'ADMINISTRATOR' && current_user.role !== 'OWNER' && current_user.role !== 'MANAGER') && current_user.id !== user.id){
            return await res.status(403).json({ error: 'This profile is not yours!' });
        }
        
        return await res.status(200).json(user);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res){
    res.status(200).json({ message: 'delete user API OK' });
}

async function removeUser(req, res){
    res.status(200).json({ message: 'remove user API OK' });
}