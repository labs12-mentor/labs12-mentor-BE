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
    const roles = await Roles.getAllRoles();
    res.status(200).json(roles);
}

async function addNewRole(req, res){
    res.status(200).json({ message: 'add new role API OK' });
}

async function getRole(req, res){
    const role = await Roles.getRoleById(req.params.id);
    res.status(200).json(role);
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
