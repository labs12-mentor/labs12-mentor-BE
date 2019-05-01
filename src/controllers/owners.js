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
    try {
        const owners = await Owners.getOwners();
        return await res.status(200).json(owners);
    } catch(error) {
        return await res.status(500).json({ error: 'Cannot fetch owners!' });
    }
}

async function addOwner(req, res){
    try {

    } catch(error) {
        return await res.status(500).json({ error: 'Cannot add new owner!' });
    }
}

async function getOwner(req, res){
    try {
        const owner = await Owners.getOwnerById(req.params.id);
        if(owner.length === 0) return await res.status(404).json({ error: 'Owner not found!' });
        return await res.status(200).json(owner);
    } catch(error) {
        return await res.status(500).json({ error: 'Cannot fetch owner!' });
    }
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
