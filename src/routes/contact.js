const router = require('express').Router();
const { contactController } = require('../controllers');

router.route('/sendemail')
    .post(contactController.sendEmailViaContactForm);

module.exports = router;