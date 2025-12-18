const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const expenseValidation = require('../common/schemas/expense.validate');
const { JWTUser } = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(JWTUser);

// Get all expenses (with optional filters: categoryId, startDate, endDate)
router.get('/', expenseController.getAllExpenses);

// Get expense by ID
router.get('/:id', expenseValidation.expenseIdParam, expenseController.getExpenseById);

// Create new expense
router.post('/', expenseValidation.createExpense, expenseController.createExpense);

// Update expense
router.put('/:id', expenseValidation.expenseIdParam, expenseValidation.updateExpense, expenseController.updateExpense);

// Delete expense
router.delete('/:id', expenseValidation.expenseIdParam, expenseController.deleteExpense);

module.exports = router;
