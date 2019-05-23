const router = require('express').Router();
const { filesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const imageUpload = require('../middleware/imageUpload');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage,
    fileSize: 5*1024*1024
});

router.route('/avatar')
    .post(authenticate, authorize(['ALL']), upload.single('avatar'), imageUpload.uploadToGCS, filesController.uploadAvatar);

router.route('/avatar/:id')
    .get(authenticate, authorize(['ALL']), filesController.getAvatar);

router.route('/logo')
    .post(authenticate, authorize(['ALL']), upload.single('logo'), imageUpload.uploadToGCS, filesController.uploadLogo);

router.route('/logo/:id')
    .post(authenticate, authorize(['ALL']), filesController.getLogo);

module.exports = router;