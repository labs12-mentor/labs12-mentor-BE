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
    try {
        const experiences = await Experiences.getExperiences();
        return await res.status(200).json(experiences);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addExperience(req, res){
    try {
        const experienceData = {
            name,
            user_id
        } = req.body;
        const experienceId = await Experiences.insertExperience(experienceData);
        return await res.status(201).json({ id: experienceId, ...experienceData });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getExperience(req, res){
    try {
        const experience = await Experiences.getExperienceById(req.params.id);
        if(experience === undefined || experience.deleted) return await res.status(404).json({ error: 'Experience not found!' });
        return await res.status(200).json(experience);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateExperience(req, res){
    try {
        const experience = await Experiences.getExperienceById(req.params.id);
        const experienceData = {
            name,
            user_id
        } = req.body;
        if(experience === undefined || experience.deleted) return await res.status(404).json({ error: 'Experience not found!' });
        await Experiences.updateExperience(req.params.id, experienceData);
        const exp = await Experiences.getExperienceById(req.params.id);
        return await res.status(200).json({ ...exp });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteExperience(req, res){
    try {
        const experience = await Experiences.getExperienceById(req.params.id);
        if(experience === undefined || experience.deleted) return await res.status(404).json({ error: 'Experience not found!' });
        await Experiences.deleteExperience(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeExperience(req, res){
    try {
        const experience = await Experiences.getExperienceById(req.params.id);
        if(experience === undefined) return await res.status(404).json({ error: 'Experience not found!' });
        await Experiences.removeExperience(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
