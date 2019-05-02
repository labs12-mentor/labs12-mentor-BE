const router = require('express').Router();
const { notificationsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), notificationsController.getNotifications)
    .post(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), notificationsController.addNotification);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), notificationsController.getNotification)
    .put(authenticate, authorize(['ALL']), notificationsController.updateNotification)
    .patch(authenticate, authorize(['ALL']), notificationsController.markNotification)
    .delete(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), notificationsController.deleteNotification);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), notificationsController.removeNotification);

module.exports = router;
