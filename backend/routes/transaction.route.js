import express from 'express';
const router = express.Router();
import transactionController from '../controllers/transaction.controller.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

// All routes require authentication
router.use(JWTUser);

// Get all transactions (with optional filters: type, categoryId, startDate, endDate)
router.get('/', transactionController.getAllTransactions);

export default router;
