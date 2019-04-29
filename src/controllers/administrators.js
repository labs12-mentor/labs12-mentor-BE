module.exports = {
    getAdministrators,
    addAdministrator,
    getAdministrator,
    updateAdministrator,
    deleteAdministrator,
    removeAdministrator
}
const Administrators = require('../database/helpers/administrators');

async function getAdministrators(req, res){
    const administrators = await Administrators.getAdministrators();
    res.status(200).json(administrators);
}

async function addAdministrator(req, res){
    res.status(200).json({ message: 'add administrator API OK' });
}

async function getAdministrator(req, res){
    const administrator = await Administrators.getAdministratorById(req.params.id);
    res.status(200).json(administrator);
}

async function updateAdministrator(req, res){
    res.status(200).json({ message: 'update administrator API OK' });
}

async function deleteAdministrator(req, res){
    res.status(200).json({ message: 'delete administrator API OK' });
}

async function removeAdministrator(req, res){
    res.status(200).json({ message: 'remove administrator API OK' });
}
