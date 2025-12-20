import express from 'express';
const router = express.Router();
import incomeController from '../controllers/income.controller.js';
import incomeValidation from '../utils/schemas/income.validate.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

// All routes require authentication
router.use(JWTUser);

// Get all incomes (with optional filters: categoryId, startDate, endDate)
router.get('/', incomeController.getAllIncomes);

// Get income by ID
router.get('/:id', incomeValidation.incomeIdParam, incomeController.getIncomeById);

// Create new income
router.post('/', incomeValidation.createIncome, incomeController.createIncome);

// Update income
router.put('/:id', incomeValidation.incomeIdParam, incomeValidation.updateIncome, incomeController.updateIncome);

// Delete income
router.delete('/:id', incomeValidation.incomeIdParam, incomeController.deleteIncome);

export default router;
