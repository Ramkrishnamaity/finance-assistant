const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');
const incomeValidation = require('../common/schemas/income.validate');
const { JWTUser } = require('../middlewares/auth.middleware');

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

module.exports = router;
