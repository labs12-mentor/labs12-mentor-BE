const router = require('express').Router();
const { experiencesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(experiencesController.getExperiences)
    .post(experiencesController.addExperience);

router.route('/:id')
    .get(experiencesController.getExperience)
    .put(experiencesController.updateExperience)
    .delete(experiencesController.deleteExperience);

router.route('/:id/remove')
    .delete(experiencesController.removeExperience);

module.exports = router;
