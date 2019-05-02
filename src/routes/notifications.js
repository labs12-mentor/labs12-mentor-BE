const router = require('express').Router();
const { notificationsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(notificationsController.getNotifications)
    .post(notificationsController.addNotification);

router.route('/:id')
    .get(notificationsController.getNotification)
    .put(notificationsController.updateNotification)
    .patch(notificationsController.markNotification)
    .delete(notificationsController.deleteNotification);

router.route('/:id/remove')
    .delete(notificationsController.removeNotification);

module.exports = router;
