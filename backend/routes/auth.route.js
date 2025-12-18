const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authValidation = require('../common/schemas/auth.validate');
const { JWTUser } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login);

// Protected routes
router.get('/profile', JWTUser, authController.getProfile);

module.exports = router;
