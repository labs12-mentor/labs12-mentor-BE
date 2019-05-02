const router = require('express').Router();
const { meetingsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), meetingsController.getMeetings)
    .post(authenticate, authorize(['ALL']), meetingsController.addMeeting);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), meetingsController.getMeeting)
    .put(authenticate, authorize(['ALL']), meetingsController.updateMeeting)
    .delete(authenticate, authorize(['ALL']), meetingsController.deleteMeeting);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ALL']), meetingsController.removeMeeting);

module.exports = router;
