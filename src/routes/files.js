const router = require('express').Router();
const { filesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const imageUpload = require('../middleware/imageUpload');

router.route('/avatar')
    .post(authenticate, authorize(['ALL']), imageUpload.upload.single('avatar'), imageUpload.uploadToGCS, filesController.uploadAvatar);

router.route('/logo')
    .post(authenticate, authorize(['ALL']), imageUpload.upload.single('logo'), imageUpload.uploadToGCS, filesController.uploadLogo);

module.exports = router;