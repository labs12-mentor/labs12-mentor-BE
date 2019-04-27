const router = require('express').Router();
const { authController } = require('../controllers');

router.route('/login')
    .post(authController.loginUser);

router.route('/register')
    .post(authController.registerUser);

router.route('/admin/login')
    .post(authController.loginAdministrator);

router.route('/admin/register')
    .post(authController.registerAdministrator);

router.route('/owner/login')
    .post(authController.loginOwner);

router.route('/owner/register')
    .post(authController.registerOwner);

module.exports = router;
