const router = require('express').Router();
const controllers = require('../controllers');

router
    .route('/')
        .get(controllers.apiController.rootRoute);

module.exports = router;