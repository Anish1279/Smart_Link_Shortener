// Redirect route — public GET /:code (uses 302, not 301, for click tracking)
const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');

router.get('/:code', redirectController.handleRedirect);

module.exports = router;
