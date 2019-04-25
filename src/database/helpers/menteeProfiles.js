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
    return await db('menteeprofiles').truncate();
}

async function getMenteeProfiles() {
    return await db
        .select('*')
        .from('menteeprofiles');
}

async function getMenteeProfileById(id) {
    return await db
        .select('id', 'user_id', 'desired_zip', 'lambda_week', 'experience', 'interests', 'application_answers', 'wanted_mentor', 'deleted')
        .from('menteeprofiles')
        .where({ id })
        .first();
}

async function insertMenteeProfile(menteeProfile) {
    return await db('menteeprofiles')
        .insert({
            user_id: menteeProfile.user_id,
            desired_zip: menteeProfile.desired_zip,
            lambda_week: menteeProfile.lambda_week,
            experience: menteeProfile.experience,
            interests: menteeProfile.interests,
            application_answers: menteeProfile.application_answers,
            wanted_mentor: menteeProfile.wanted_mentor
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateMenteeProfile(id, menteeProfile) {
    return await db('menteeprofiles')
        .where({ id })
        .update({
            user_id: menteeProfile.user_id,
            desired_zip: menteeProfile.desired_zip,
            lambda_week: menteeProfile.lambda_week,
            experience: menteeProfile.experience,
            interests: menteeProfile.interests,
            application_answers: menteeProfile.application_answers,
            wanted_mentor: menteeProfile.wanted_mentor,
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
