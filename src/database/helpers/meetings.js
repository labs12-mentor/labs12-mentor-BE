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
    return await db('meetings').truncate();
}

async function getMeetings() {
    return await db
        .select('*')
        .from('meetings');
}

async function getMeetingById(id) {
    return await db
        .select('id', 'match_id', 'meeting_date', 'location', 'notes', 'rating', 'deleted')
        .from('meetings')
        .where({ id })
        .first();
}

async function insertMeeting(meeting) {
    return await db('meetings')
        .insert({
            match_id: meeting.match_id,
            meeting_date: meeting.meeting_date,
            location: meeting.location,
            notes: meeting.notes,
            rating: meeting.rating,
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
            meeting_date: meeting.meeting_date,
            location: meeting.location,
            notes: meeting.notes,
            rating: meeting.rating,
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
