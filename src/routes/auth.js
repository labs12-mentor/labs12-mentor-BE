const router = require('express').Router();
const { authController } = require('../controllers');
const passport = require('passport');

router.route('/login')
    .post(passport.authenticate('local'), authController.loginUser);

router.route('/register')
    .post(authController.register);

router.route('/github')
    .get(passport.authenticate('github'));

router.route('/github/callback')
    .get(passport.authenticate('github'), authController.githubAuth);

module.exports = router;