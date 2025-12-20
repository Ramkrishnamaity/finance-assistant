import Expense from '../models/expense.model.js';
import Category from '../models/category.model.js';
import StatusError from '../utils/helpers/statusError.helper.js';

const expenseService = {
  /**
   * Get all expenses for a user with filters
   */
  async getAllExpenses(userId, filters = {}) {
    const query = { userId, freezed: 0 };

    // Add category filter
    if (filters.categoryId) {
      query.categoryId = filters.categoryId;
    }

    // Add date range filter
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = new Date(filters.endDate);
      }
    }

    const expenses = await Expense.find(query)
      .populate('categoryId', 'name icon color type')
      .sort({ date: -1 });

    return expenses;
  },

  /**
   * Get expense by ID
   */
  async getExpenseById(expenseId, userId) {
    const expense = await Expense.findOne({
      _id: expenseId,
      userId,
      freezed: 0
    }).populate('categoryId', 'name icon color type');

    if (!expense) {
      throw new StatusError('Expense not found', 404);
    }

    return expense;
  },

  /**
   * Create new expense
   */
  async createExpense(data, userId) {
    // Verify category exists and belongs to user
    const category = await Category.findOne({
      _id: data.categoryId,
      userId,
      type: 'expense',
      freezed: 0
    });

    if (!category) {
      throw new StatusError('Invalid category or category not found', 400);
    }

    const expenseData = {
      ...data,
      userId
    };

    const expense = await Expense.create(expenseData);
    return await expense.populate('categoryId', 'name icon color type');
  },

  /**
   * Update expense
   */
  async updateExpense(expenseId, data, userId) {
    // If category is being updated, verify it
    if (data.categoryId) {
      const category = await Category.findOne({
        _id: data.categoryId,
        userId,
        type: 'expense',
        freezed: 0
      });

      if (!category) {
        throw new StatusError('Invalid category or category not found', 400);
      }
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId, freezed: 0 },
      data,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name icon color type');

    if (!expense) {
      throw new StatusError('Expense not found', 404);
    }

    return expense;
  },

  /**
   * Delete expense (soft delete)
   */
  async deleteExpense(expenseId, userId) {
    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId, freezed: 0 },
      { freezed: 1 },
      { new: true }
    );

    if (!expense) {
      throw new StatusError('Expense not found', 404);
    }

    return expense;
  }
};

export default expenseService;
