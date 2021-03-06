module.exports = {
    truncate,
    getMentorProfiles,
    getMentorProfileById,
    getMentorProfileByUserId,
    insertMentorProfile,
    updateMentorProfile,
    deleteMentorProfile,
    removeMentorProfile
};
const db = require('../dbConfig');

async function truncate() {
    await db('mentorprofiles').del();
    await db.raw('ALTER SEQUENCE mentorprofiles_id_seq RESTART WITH 1');
    return;
}

async function getMentorProfiles() {
    return await db.select('*').from('mentorprofiles');
}

async function getMentorProfileById(id) {
    return await db
        .select('*')
        .from('mentorprofiles')
        .where({ id })
        .first();
}

async function getMentorProfileByUserId(user_id) {
    return await db
        .select('*')
        .from('mentorprofiles')
        .where({ user_id })
        .first();
}

async function insertMentorProfile(mentorProfile) {
    return await db('mentorprofiles')
        .insert({
            user_id: mentorProfile.user_id,
            status: 'AVAILABLE'
        })
        .returning('id')
        .then((response) => {
            return {
                id: response[0]
            };
        });
}

async function updateMentorProfile(id, mentorProfile) {
    return await db('mentorprofiles')
        .where({ id })
        .update({
            user_id: mentorProfile.user_id,
            status: mentorProfile.status,
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
