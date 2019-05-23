const router = require('express').Router();
const { filesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/avatar')
    .post(authenticate, authorize(['ALL']), upload.single('avatar'), filesController.uploadAvatar);

router.route('/avatar/:id')
    .get(authenticate, authorize(['ALL']), filesController.getAvatar);

router.route('/logo')
    .post(authenticate, authorize(['ALL']), upload.single('logo'), filesController.uploadLogo);

module.exports = router;