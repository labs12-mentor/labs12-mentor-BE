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
        // const current_user = await Users.getUserById(req.user.id);
        const user = await Users.getUserById(req.params.id);
        // if(current_user === undefined){
        //     return await res.status(403).json({ error: 'Cannot find this user!' });
        // }

        // if(current_user.role !== 'ADMINISTRATOR' && current_user.organization_id !== user.organization_id){
        //     return await res.status(403).json({ error: 'Cannot find this user!' });
        // }

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });
        
        return await res.status(200).json(user);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res){
    try {
        // const current_user = await Users.getUserById(req.user.id);
        const user = await Users.getUserById(req.params.id);

        // if(current_user === undefined){
        //     return await res.status(403).json({ error: 'Cannot find this user!' });
        // }

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });

        // if(current_user.role !== 'ADMINISTRATOR'){
        //     if(!((current_user.role === 'OWNER' || current_user.role === 'MANAGER') && current_user.organization_id === user.organization_id)||(current_user.role === 'USER' && current_user.id !== user.id)){
        //         return await res.status(403).json({ error: 'Cannot find this user!' });
        //     }
        // }
        
        await Users.updateUser(req.params.id, {
            ...user,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country
        });

        return await res.status(200).json({ message: 'User successfully updated!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res){
    try {
        // const current_user = await Users.getUserById(req.user.id);
        const user = await Users.getUserById(req.params.id);

        // if(current_user === undefined || user === undefined){
        //     return await res.status(403).json({ error: 'Cannot find this user!' });
        // }

        if(user === undefined || user.deleted) return await res.status(404).json({ error: 'User not found!' });

        // if(current_user.role !== 'ADMINISTRATOR'){
        //     if(!((current_user.role === 'OWNER' || current_user.role === 'MANAGER') && current_user.organization_id === user.organization_id)||(current_user.role === 'USER' && current_user.id !== user.id)){
        //         return await res.status(403).json({ error: 'Cannot find this user!' });
        //     }
        // }

        await Users.deleteUser(req.params.id);

        return await res.status(200).json({ message: 'User successfully deleted!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeUser(req, res){
    try {
        const user = await Users.getUserById(req.params.id);
        if(user === undefined) return await res.status(404).json({ error: 'User not found!' });
        await Users.removeUser(req.params.id);
        return await res.status(200).json({ message: 'User successfully removed!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}