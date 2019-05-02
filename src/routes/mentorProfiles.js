const router = require('express').Router();
const { mentorProfilesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), mentorProfilesController.getMentorProfiles)
    .post(authenticate, authorize(['ALL']), mentorProfilesController.addMentorProfile);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), mentorProfilesController.getMentorProfile)
    .put(authenticate, authorize(['ALL']), mentorProfilesController.updateMentorProfile)
    .delete(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), mentorProfilesController.deleteMentorProfile);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), mentorProfilesController.removeMentorProfile);

module.exports = router;
