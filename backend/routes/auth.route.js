import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';
import authValidation from '../utils/schemas/auth.validate.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

// Public routes
router.post('/register', authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login);

// Protected routes
router.get('/profile', JWTUser, authController.getProfile);

export default router;
