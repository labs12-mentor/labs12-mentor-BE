module.exports = {
    truncate,
    getMatches,
    getMatchById,
    insertMatch,
    updateMatch,
    deleteMatch,
    removeMatch
};
const db = require('../dbConfig');

async function truncate() {
    return await db('matches').truncate();
}

async function getMatches() {
    return await db
        .select('*')
        .from('matches');
}

async function getMatchById(id) {
    return await db
        .select('id', 'mentor_id', 'mentee_id', 'match_score', 'status', 'start_date', 'end_date', 'deleted')
        .from('matches')
        .where({ id })
        .first();
}

async function insertMatch(match) {
    return await db('matches')
        .insert({
            mentor_id: match.mentor_id,
            mentee_id: match.mentee_id,
            match_score: match.match_score,
            status: match.status,
            start_date: match.start_date,
            end_date: match.end_date,
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateMatch(id, match) {
    return await db('matches')
        .where({ id })
        .update({
            mentor_id: match.mentor_id,
            mentee_id: match.mentee_id,
            match_score: match.match_score,
            status: match.status,
            start_date: match.start_date,
            end_date: match.end_date,
            deleted: match.deleted
        });
}

async function deleteMatch(id) {
    return await db('matches')
        .where({ id })
        .update({ deleted: true });
}

async function removeMatch(id) {
    return await db('matches')
        .where({ id })
        .del();
}
