module.exports = {
    getAllRoles,
    addNewRole,
    getRole,
    updateRole,
    deleteRole,
    removeRole
}
const Roles = require('../database/helpers/roles');

async function getAllRoles(req, res){
    res.status(200).json({ message: 'get all roles API OK' });
}

async function addNewRole(req, res){
    res.status(200).json({ message: 'add new role API OK' });
}

async function getRole(req, res){
    res.status(200).json({ message: 'get role API OK' });
}

async function updateRole(req, res){
    res.status(200).json({ message: 'update role API OK' });
}

async function deleteRole(req, res){
    res.status(200).json({ message: 'delete role API OK' });
}

async function removeRole(req, res){
    res.status(200).json({ message: 'remove role API OK' });
}
