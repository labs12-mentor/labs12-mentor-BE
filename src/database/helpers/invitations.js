module.exports = {
    truncate,
    getInvitations,
    getInvitationById,
    insertInvitation,
    deleteInvitation,
    removeInvitation
};
const db = require('../dbConfig');

async function truncate() {
    await db('invitations').del();
    await db.raw('ALTER SEQUENCE invitations_id_seq RESTART WITH 1');
    return;
}

async function getInvitations() {
    return await db
        .select('*')
        .from('invitations');
}

async function getInvitationById(id) {
    return await db
        .select('*')
        .from('invitations')
        .where({ id })
        .first();
}

async function insertInvitation(invitation) {
    return await db('invitations')
        .insert({
            user_id: invitation.user_id,
            organization_id: invitation.organization_id,
            role: invitation.role
        })
        .returning('id')
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function deleteInvitation(id) {
    return await db('invitations')
        .where({ id })
        .update({ deleted: true });
}

async function removeInvitation(id) {
    return await db('invitations')
        .where({ id })
        .del();
}
