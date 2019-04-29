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
    const experiences = await Experiences.getExperiences();
    res.status(200).json(experiences);
}

async function addExperience(req, res){
    res.status(200).json({ message: 'add experience API OK' });
}

async function getExperience(req, res){
    const experience = await Experiences.getExperienceById(req.params.id);
    res.status(200).json(experience);
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
