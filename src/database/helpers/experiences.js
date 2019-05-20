module.exports = {
    truncate,
    getExperiences,
    getExperiencesByUserId,
    getExperienceById,
    insertExperience,
    updateExperience,
    deleteExperience,
    removeExperience
};
const db = require('../dbConfig');

async function truncate() {
    await db('experiences').del();
    await db.raw('ALTER SEQUENCE experiences_id_seq RESTART WITH 1');
    return;
}

async function getExperiences() {
    return await db.select('*').from('experiences');
}

async function getExperiencesByUserId(user_id) {
    return await db
        .select('*')
        .from('experiences')
        .where({ user_id });
}

async function getExperienceById(id) {
    return await db
        .select('*')
        .from('experiences')
        .where({ id })
        .first();
}

async function insertExperience(experience) {
    return await db('experiences')
        .insert({
            user_id: experience.user_id,
            name: experience.name
        })
        .returning('id')
        .then((response) => {
            return {
                id: response[0]
            };
        });
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
