const router = require('express').Router();
const { experiencesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), experiencesController.getExperiences)
    .post(authenticate, authorize(['ALL']), experiencesController.addExperience);

router.route('/user/:id')
    .get(authenticate, authorize(['ALL']), experiencesController.getExperiencesByUserId);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), experiencesController.getExperience)
    .put(authenticate, authorize(['ALL']), experiencesController.updateExperience)
    .delete(authenticate, authorize(['ALL']), experiencesController.deleteExperience);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ALL']), experiencesController.removeExperience);

module.exports = router;
