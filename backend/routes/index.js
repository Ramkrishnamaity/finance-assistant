import express from 'express';
const router = express.Router();

import authRoutes from './auth.route.js';
import categoryRoutes from './category.route.js';
import expenseRoutes from './expense.route.js';
import incomeRoutes from './income.route.js';
import statisticsRoutes from './statistics.route.js';
import transactionRoutes from './transaction.route.js';

// Mount routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/expenses', expenseRoutes);
router.use('/incomes', incomeRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/transactions', transactionRoutes);

export default router;
