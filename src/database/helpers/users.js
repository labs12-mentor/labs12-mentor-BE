module.exports = {
    truncate,
    getAllUsers,
    getUserByUsername,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    removeUser
};
const db = require('../dbConfig');

async function truncate() {
    return await db('users').truncate();
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
async function getUserById(id) {
    return await db
        .select('id', 'username')
        .from('users')
        .where({ id })
        .first();
}

async function insertUser(user) {
    return await db('users')
        .insert({
            username: user.username,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            country: user.country || '',
            state: user.state || '',
            city: user.city || '',
            zipcode: user.zipcode || '',
            role: user.role || 0,
            deleted: user.deleted || false
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateUser(id, user) {
    return await db('users')
        .where({ id })
        .update({ username: user.username, password: user.password });
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
