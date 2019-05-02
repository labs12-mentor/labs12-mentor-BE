const router = require('express').Router();
const { meetingsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(meetingsController.getMeetings)
    .post(meetingsController.addMeeting);

router.route('/:id')
    .get(meetingsController.getMeeting)
    .put(meetingsController.updateMeeting)
    .delete(meetingsController.deleteMeeting);

router.route('/:id/remove')
    .delete(meetingsController.removeMeeting);

module.exports = router;
