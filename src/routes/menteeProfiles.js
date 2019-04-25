const router = require('express').Router();
const { menteeProfilesController } = require('../controllers');

router.route('/')
    .get(menteeProfilesController.getMenteeProfiles)
    .post(menteeProfilesController.addMenteeProfile);

router.route('/:id')
    .get(menteeProfilesController.getMenteeProfile)
    .put(menteeProfilesController.updateMenteeProfile)
    .delete(menteeProfilesController.deleteMenteeProfile);

router.route('/:id/remove')
    .delete(menteeProfilesController.removeMenteeProfile);

module.exports = router;
