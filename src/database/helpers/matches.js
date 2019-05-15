module.exports = {
    truncate,
    getAvailableMentors,
    getMatches,
    getMatchById,
    getMatchByMentorAndMentee,
    insertMatch,
    updateMatch,
    deleteMatch,
    removeMatch
};
const db = require('../dbConfig');

async function truncate() {
    await db('matches').del();
    await db.raw('ALTER SEQUENCE matches_id_seq RESTART WITH 1');
    return;
}

async function getAvailableMentors() {
    return await db
        .select(
        "matches.mentor_id",
        "matches.status",
        "mentorprofiles.user_id",
        "users.first_name",
        "users.last_name",
        "users.id",
        "users.zipcode"
      )
      .from("matches")
    .innerJoin("mentorprofiles", "matches.mentor_id", "mentorprofiles.id")
    .innerJoin("users", "mentorprofiles.id", "users.id")
    .whereraw(matches.status="AVAILABLE");
}

console.log(getAvailableMentors())

async function getMatches() {
    return await db
        .select('*')
        .from('matches');
}

async function getMatchById(id) {
    return await db
        .select('*')
        .from('matches')
        .where({ id })
        .first();
}

async function getMatchByMentorAndMentee(mentor_id, mentee_id) {
    return await db
        .select('*')
        .from('matches')
        .where({ mentor_id })
        .where({ mentee_id})
        .first();
}

async function insertMatch(match) {
    return await db('matches')
        .insert({
            mentor_id: match.mentor_id,
            mentee_id: match.mentee_id,
            status: match.status
        })
        .returning('id')
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateMatch(id, match) {
    return await db('matches')
        .where({ id })
        .update({
            mentor_id: match.mentor_id,
            mentee_id: match.mentee_id,
            status: match.status,
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
