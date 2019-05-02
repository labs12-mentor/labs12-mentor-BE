const router = require('express').Router();
const { mentorProfilesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(mentorProfilesController.getMentorProfiles)
    .post(mentorProfilesController.addMentorProfile);

router.route('/:id')
    .get(mentorProfilesController.getMentorProfile)
    .put(mentorProfilesController.updateMentorProfile)
    .delete(mentorProfilesController.deleteMentorProfile);

router.route('/:id/remove')
    .delete(mentorProfilesController.removeMentorProfile);

module.exports = router;
