const router = require('express').Router();
const { authController } = require('../controllers');

router.route('/login')
    .post(authController.loginUser);

router.route('/register')
    .post(authController.register);

module.exports = router;
