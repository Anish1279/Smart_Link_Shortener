// Link routes — CRUD + analytics (protected)
const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, linkController.createLink);
router.get('/', protect, linkController.getMyLinks);
router.get('/:id/analytics', protect, linkController.getLinkAnalytics);

module.exports = router;
