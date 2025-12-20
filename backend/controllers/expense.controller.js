import { controller } from '../utils/helpers/controller.helper.js';
import expenseService from '../services/expense.service.js';

const expenseController = {
  /**
   * Get all expenses
   */
  getAllExpenses: controller(async (req, res) => {
    const { categoryId, startDate, endDate } = req.query;
    const filters = { categoryId, startDate, endDate };

    const expenses = await expenseService.getAllExpenses(req.user.userId, filters);

    res.json({
      status: true,
      message: 'Expenses fetched successfully',
      data: expenses
    });
  }),

  /**
   * Get expense by ID
   */
  getExpenseById: controller(async (req, res) => {
    const expense = await expenseService.getExpenseById(
      req.params.id,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Expense fetched successfully',
      data: expense
    });
  }),

  /**
   * Create new expense
   */
  createExpense: controller(async (req, res) => {
    const expense = await expenseService.createExpense(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      status: true,
      message: 'Expense created successfully',
      data: expense
    });
  }),

  /**
   * Update expense
   */
  updateExpense: controller(async (req, res) => {
    const expense = await expenseService.updateExpense(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Expense updated successfully',
      data: expense
    });
  }),

  /**
   * Delete expense
   */
  deleteExpense: controller(async (req, res) => {
    await expenseService.deleteExpense(req.params.id, req.user.userId);

    res.json({
      status: true,
      message: 'Expense deleted successfully',
      data: null
    });
  })
};

export default expenseController;
