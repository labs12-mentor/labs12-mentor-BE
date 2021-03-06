module.exports = {
    truncate,
    getAllUsers,
    getUserByUsername,
    getUserByEmail,
    getUserByGithubId,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    removeUser
};
const db = require('../dbConfig');

async function truncate() {
    await db('users').del();
    await db.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    return;
}

async function getAllUsers() {
    return await db
        .select('*')
        .from('users');
}

async function getUserByUsername(username) {
    return await db
        .select('*')
        .from('users')
        .where({ username })
        .first();
}

async function getUserByEmail(email) {
    return await db
        .select('*')
        .from('users')
        .where({ email })
        .first();
}

async function getUserById(id) {
    return await db
        .select('*')
        .from('users')
        .where({ id })
        .first();
}

async function getUserByGithubId(github_id, cb) {
    const user = await db
        .select('*')
        .from('users')
        .where({ github_id })
        .first();
    return cb(user);
}

async function insertUser(user) {
    return await db('users')
        .insert({
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            street: user.street,
            city: user.city,
            state: user.state,
            zipcode: user.zipcode,
            country: user.country,
            avatar_url: user.avatar_url,
            role: user.role,
            organization_id: user.organization_id,
            github_id: user.github_id,
            github_token: user.github_token
        })
        .returning('id')
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateUser(id, user) {
    return await db('users')
        .where({ id })
        .update({
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            street: user.street,
            city: user.city,
            state: user.state,
            zipcode: user.zipcode,
            country: user.country,
            avatar_url: user.avatar_url,
            role: user.role,
            organization_id: user.organization_id,
            deleted: user.deleted
        });
}

async function deleteUser(id) {
    return await db('users')
        .where({ id })
        .update({ deleted: true });
}

async function removeUser(id) {
    return await db('users')
        .where({ id })
        .del();
}
