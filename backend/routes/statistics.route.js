import express from 'express';
const router = express.Router();
import statisticsController from '../controllers/statistics.controller.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

// All routes require authentication
router.use(JWTUser);

// Get financial summary
router.get('/summary', statisticsController.getSummary);

// Get expenses by category
router.get('/expenses-by-category', statisticsController.getExpensesByCategory);

// Get incomes by category
router.get('/incomes-by-category', statisticsController.getIncomesByCategory);

// Get monthly trend
router.get('/monthly-trend', statisticsController.getMonthlyTrend);

// Get recent transactions
router.get('/recent-transactions', statisticsController.getRecentTransactions);

export default router;
