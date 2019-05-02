module.exports = {
    truncate,
    getMeetings,
    getMeetingById,
    insertMeeting,
    updateMeeting,
    deleteMeeting,
    removeMeeting
};
const db = require('../dbConfig');

async function truncate() {
    await db('meetings').del();
    await db.raw('ALTER SEQUENCE meetings_id_seq RESTART WITH 1');
    return;
}

async function getMeetings() {
    return await db
        .select('*')
        .from('meetings');
}

async function getMeetingById(id) {
    return await db
        .select('*')
        .from('meetings')
        .where({ id })
        .first();
}

async function insertMeeting(meeting) {
    return await db('meetings')
        .insert({
            match_id: meeting.match_id,
            content: meeting.content
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateMeeting(id, meeting) {
    return await db('meetings')
        .where({ id })
        .update({
            match_id: meeting.match_id,
            content: meeting.content,
            deleted: meeting.deleted
        });
}

async function deleteMeeting(id) {
    return await db('meetings')
        .where({ id })
        .update({ deleted: true });
}

async function removeMeeting(id) {
    return await db('meetings')
        .where({ id })
        .del();
}
