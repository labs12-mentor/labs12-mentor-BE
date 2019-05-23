const router = require('express').Router();
const { filesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/avatar')
    .post(authenticate, authorize(['ALL']), filesController.uploadAvatar);

router.route('/logo')
    .post(authenticate, authorize(['ALL']), filesController.uploadLogo);

module.exports = router;