module.exports = {
    truncate,
    getMenteeProfiles,
    getMenteeProfileById,
    insertMenteeProfile,
    updateMenteeProfile,
    deleteMenteeProfile,
    removeMenteeProfile
};
const db = require('../dbConfig');

async function truncate() {
    await db('menteeprofiles').del();
    await db.raw('ALTER SEQUENCE menteeprofiles_id_seq RESTART WITH 1');
    return;
}

async function getMenteeProfiles() {
    return await db
        .select('*')
        .from('menteeprofiles');
}

async function getMenteeProfileById(id) {
    return await db
        .select('*')
        .from('menteeprofiles')
        .where({ id })
        .first();
}

async function insertMenteeProfile(menteeProfile) {
    return await db('menteeprofiles')
        .insert({
            user_id: menteeProfile.user_id,
            wanted_mentor_id: menteeProfile.wanted_mentor_id
        })
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateMenteeProfile(id, menteeProfile) {
    return await db('menteeprofiles')
        .where({ id })
        .update({
            user_id: menteeProfile.user_id,
            wanted_mentor_id: menteeProfile.wanted_mentor_id,
            deleted: menteeProfile.deleted
        });
}

async function deleteMenteeProfile(id) {
    return await db('menteeprofiles')
        .where({ id })
        .update({ deleted: true });
}

async function removeMenteeProfile(id) {
    return await db('menteeprofiles')
        .where({ id })
        .del();
}
