const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const categoryRoutes = require('./category.route');
const expenseRoutes = require('./expense.route');
const incomeRoutes = require('./income.route');
const statisticsRoutes = require('./statistics.route');

// Mount routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/expenses', expenseRoutes);
router.use('/incomes', incomeRoutes);
router.use('/statistics', statisticsRoutes);

module.exports = router;
