module.exports = {
    getNotifications,
    addNotification,
    getNotification,
    updateNotification,
    markNotification,
    deleteNotification,
    removeNotification
}
const Notifications = require('../database/helpers/notifications');

async function getNotifications(req, res){
    res.status(200).json({ message: 'get notifications API OK' });
}

async function addNotification(req, res){
    res.status(200).json({ message: 'add notification API OK' });
}

async function getNotification(req, res){
    res.status(200).json({ message: 'get notification API OK' });
}

async function updateNotification(req, res){
    res.status(200).json({ message: 'update notification API OK' });
}

async function markNotification(req, res){
    res.status(200).json({ message: 'mark notification API OK' });
}

async function deleteNotification(req, res){
    res.status(200).json({ message: 'delete notification API OK' });
}

async function removeNotification(req, res){
    res.status(200).json({ message: 'remove notification API OK' });
}
