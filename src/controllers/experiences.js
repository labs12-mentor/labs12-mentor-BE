module.exports = {
    getExperiences,
    addExperience,
    getExperience,
    updateExperience,
    deleteExperience,
    removeExperience
}
const Experiences = require('../database/helpers/experiences');

async function getExperiences(req, res){
    res.status(200).json({ message: 'get experiences API OK' });
}

async function addExperience(req, res){
    res.status(200).json({ message: 'add experience API OK' });
}

async function getExperience(req, res){
    res.status(200).json({ message: 'get experience API OK' });
}

async function updateExperience(req, res){
    res.status(200).json({ message: 'update experience API OK' });
}

async function deleteExperience(req, res){
    res.status(200).json({ message: 'delete experience API OK' });
}

async function removeExperience(req, res){
    res.status(200).json({ message: 'remove experience API OK' });
}
