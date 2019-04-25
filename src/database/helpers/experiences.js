module.exports = {
    truncate,
    getExperiences,
    getExperienceById,
    insertExperience,
    updateExperience,
    deleteExperience,
    removeExperience
};
const db = require('../dbConfig');

async function truncate() {
    return await db('experiences').truncate();
}

async function getExperiences() {
    return await db
        .select('*')
        .from('experiences');
}

async function getExperienceById(id) {
    return await db
        .select('id', 'name', 'user_id', 'deleted')
        .from('experiences')
        .where({ id })
        .first();
}

async function insertExperience(experience) {
    return await db('experiences')
        .insert({
            user_id: experience.user_id,
            name: experience.name,
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateExperience(id, experience) {
    return await db('experiences')
        .where({ id })
        .update({
            user_id: experience.user_id,
            name: experience.name,
            deleted: experience.deleted
        });
}

async function deleteExperience(id) {
    return await db('experiences')
        .where({ id })
        .update({ deleted: true });
}

async function removeExperience(id) {
    return await db('experiences')
        .where({ id })
        .del();
}
