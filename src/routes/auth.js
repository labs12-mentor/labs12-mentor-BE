const router = require('express').Router();
const controllers = require('../controllers');

router.route('/login')
    .post(controllers.authController.loginUser);

router.route('/register')
    .post(controllers.authController.registerUser);

module.exports = router;
