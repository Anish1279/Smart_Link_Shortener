// Auth routes — register + login (public)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

const { checkAuth } = require('./checkAuthRoutes');
router.get('/check-auth', checkAuth);

module.exports = router;

