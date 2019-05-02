module.exports = {
    truncate,
    getNotifications,
    getNotificationById,
    insertNotification,
    updateNotification,
    markNotification,
    deleteNotification,
    removeNotification
};
const db = require('../dbConfig');

async function truncate() {
    await db('notifications').del();
    await db.raw('ALTER SEQUENCE notifications_id_seq RESTART WITH 1');
    return;
}

async function getNotifications() {
    return await db
        .select('*')
        .from('notifications');
}

async function getNotificationById(id) {
    return await db
        .select('id', 'user_id', 'content', 'watched', 'deleted')
        .from('notifications')
        .where({ id })
        .first();
}

async function insertNotification(notification) {
    return await db('notifications')
        .insert({
            user_id: notification.user_id,
            content: notification.content,
            watched: notification.watched
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateNotification(id, notification) {
    return await db('notifications')
        .where({ id })
        .update({
            user_id: notification.user_id,
            content: notification.content,
            watched: notification.watched,
            deleted: notification.deleted
        });
}

async function markNotification(id) {
    return await db('notifications')
        .where({ id })
        .update({ watched: true });
}

async function deleteNotification(id) {
    return await db('notifications')
        .where({ id })
        .update({ deleted: true });
}

async function removeNotification(id) {
    return await db('notifications')
        .where({ id })
        .del();
}
