const router = require('express').Router();
const { menteeProfilesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), menteeProfilesController.getMenteeProfiles)
    .post(authenticate, authorize(['ALL']), menteeProfilesController.addMenteeProfile);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), menteeProfilesController.getMenteeProfile)
    .put(authenticate, authorize(['ALL']), menteeProfilesController.updateMenteeProfile)
    .delete(authenticate, authorize(['ALL']), menteeProfilesController.deleteMenteeProfile);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), menteeProfilesController.removeMenteeProfile);

module.exports = router;
