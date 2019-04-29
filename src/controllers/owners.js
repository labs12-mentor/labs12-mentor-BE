module.exports = {
    getOwners,
    addOwner,
    getOwner,
    updateOwner,
    deleteOwner,
    removeOwner
}
const Owners = require('../database/helpers/owners');

async function getOwners(req, res){
    const owners = await Owners.getOwners();
    res.status(200).json(owners);
}

async function addOwner(req, res){
    res.status(200).json({ message: 'add owner API OK' });
}

async function getOwner(req, res){
    const owner = await Owners.getOwnerById(req.params.id);
    res.status(200).json(owner);
}

async function updateOwner(req, res){
    res.status(200).json({ message: 'update owner API OK' });
}

async function deleteOwner(req, res){
    res.status(200).json({ message: 'delete owner API OK' });
}

async function removeOwner(req, res){
    res.status(200).json({ message: 'remove owner API OK' });
}
