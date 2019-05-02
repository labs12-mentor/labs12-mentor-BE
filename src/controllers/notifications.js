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
    try {
        const notifications = await Notifications.getNotifications();
        return await res.status(200).json(notifications);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addNotification(req, res){
    try {
        const notificationData = {
            content,
            user_id
        } = req.body;
        
        await Notifications.insertNotification(notificationData);
        return await res.status(200).json({ message: 'Notification successfully added!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getNotification(req, res){
    try {
        const notification = await Notifications.getNotificationById(req.params.id);
        if(notification === undefined || notification.deleted) return await res.status(404).json({ error: 'Notification not found!' });
        return await res.status(200).json(notification);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateNotification(req, res){
    try {
        const notification = await Notifications.getNotificationById(req.params.id);
        const notificationData = {
            content,
            user_id
        } = req.body;
        if(notification === undefined || notification.deleted) return await res.status(404).json({ error: 'Notification not found!' });
        await Notifications.updateNotification(req.params.id, notificationData);
        return await res.status(200).json({ message: 'Notification successfully updated!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function markNotification(req, res){
    try {
        const notification = await Notifications.getNotificationById(req.params.id);
        if(notification === undefined || notification.deleted) return await res.status(404).json({ error: 'Notification not found!' });
        await Notifications.markNotification(req.params.id);
        return await res.status(200).json({ message: 'Notification successfully marked as watched!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteNotification(req, res){
    try {
        const notification = await Notifications.getNotificationById(req.params.id);
        if(notification === undefined || notification.deleted) return await res.status(404).json({ error: 'Notification not found!' });
        await Notifications.deleteNotification(req.params.id);
        return await res.status(200).json({ message: 'Notification successfully deleted!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeNotification(req, res){
    try {
        const notification = await Notifications.getNotificationById(req.params.id);
        if(notification === undefined) return await res.status(404).json({ error: 'Notification not found!' });
        await Notifications.removeNotification(req.params.id);
        return await res.status(200).json({ message: 'Notification successfully removed!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
