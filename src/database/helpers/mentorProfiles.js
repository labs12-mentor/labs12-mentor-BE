module.exports = {
    truncate,
    getMentorProfiles,
    getMentorProfileById,
    insertMentorProfile,
    updateMentorProfile,
    deleteMentorProfile,
    removeMentorProfile
};
const db = require('../dbConfig');

async function truncate() {
    return await db('mentorprofiles').truncate();
}

async function getMentorProfiles() {
    return await db
        .select('*')
        .from('mentorprofiles');
}

async function getMentorProfileById(id) {
    return await db
        .select('id', 'user_id', 'deleted')
        .from('mentorprofiles')
        .where({ id })
        .first();
}

async function insertMentorProfile(mentorProfile) {
    return await db('mentorprofiles')
        .insert({
            user_id: mentorProfile.user_id,
        })
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateMentorProfile(id, mentorProfile) {
    return await db('mentorprofiles')
        .where({ id })
        .update({
            user_id: mentorProfile.user_id,
            deleted: mentorProfile.deleted
        });
}

async function deleteMentorProfile(id) {
    return await db('mentorprofiles')
        .where({ id })
        .update({ deleted: true });
}

async function removeMentorProfile(id) {
    return await db('mentorprofiles')
        .where({ id })
        .del();
}
