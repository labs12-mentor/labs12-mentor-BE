module.exports = {
    getNotifications,
    addNotification,
    getNotification,
    updateNotification,
    markNotification,
    deleteNotification,
    removeNotification
};
const Notifications = require('../database/helpers/notifications');
const Users = require('../database/helpers/users');

async function getNotifications(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_notifications = await Notifications.getNotifications();
        if (current_user.role !== 'ADMINISTRATOR') {
            const notifications = all_notifications.filter(
                (elem) => elem.user_id === current_user.id
            );
            return await res.status(200).json(notifications);
        }
        return await res.status(200).json(all_notifications);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addNotification(req, res) {
    try {
        const notificationData = ({ content, user_id } = req.body);

        const id = await Notifications.insertNotification(notificationData);
        return await res.status(201).json({ id, ...notificationData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getNotification(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const notification = await Notifications.getNotificationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (notification === undefined)
                return await res.status(404).json({ error: 'Notification not found!' });
        } else {
            if (
                notification === undefined ||
                notification.deleted ||
                notification.user_id !== current_user.id
            )
                return await res.status(404).json({ error: 'Notification not found!' });
        }

        return await res.status(200).json(notification);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateNotification(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const notification = await Notifications.getNotificationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (notification === undefined)
                return await res.status(404).json({ error: 'Notification not found!' });
        } else {
            if (
                notification === undefined ||
                notification.deleted ||
                notification.user_id !== current_user.id
            )
                return await res.status(404).json({ error: 'Notification not found!' });
        }

        const notificationData = ({ content, user_id } = req.body);

        await Notifications.updateNotification(req.params.id, notificationData);
        return await res.status(200).json({ id: req.params.id, ...notificationData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function markNotification(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const notification = await Notifications.getNotificationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (notification === undefined)
                return await res.status(404).json({ error: 'Notification not found!' });
        } else {
            if (
                notification === undefined ||
                notification.deleted ||
                notification.user_id !== current_user.id
            )
                return await res.status(404).json({ error: 'Notification not found!' });
        }

        await Notifications.markNotification(req.params.id);
        return await res.status(200).json({ ...notification, watched: true });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteNotification(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const notification = await Notifications.getNotificationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (notification === undefined)
                return await res.status(404).json({ error: 'Notification not found!' });
        } else {
            if (
                notification === undefined ||
                notification.deleted ||
                notification.user_id !== current_user.id
            )
                return await res.status(404).json({ error: 'Notification not found!' });
        }

        await Notifications.deleteNotification(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeNotification(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const notification = await Notifications.getNotificationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (notification === undefined)
                return await res.status(404).json({ error: 'Notification not found!' });
        } else {
            if (
                notification === undefined ||
                notification.deleted ||
                notification.user_id !== current_user.id
            )
                return await res.status(404).json({ error: 'Notification not found!' });
        }

        await Notifications.removeNotification(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
