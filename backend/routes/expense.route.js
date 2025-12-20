import express from 'express';
const router = express.Router();
import expenseController from '../controllers/expense.controller.js';
import expenseValidation from '../utils/schemas/expense.validate.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

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

export default router;
