import Income from '../models/income.model.js';
import Category from '../models/category.model.js';
import StatusError from '../utils/helpers/statusError.helper.js';

const incomeService = {
  /**
   * Get all incomes for a user with filters
   */
  async getAllIncomes(userId, filters = {}) {
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

    const incomes = await Income.find(query)
      .populate('categoryId', 'name icon color type')
      .sort({ date: -1 });

    return incomes;
  },

  /**
   * Get income by ID
   */
  async getIncomeById(incomeId, userId) {
    const income = await Income.findOne({
      _id: incomeId,
      userId,
      freezed: 0
    }).populate('categoryId', 'name icon color type');

    if (!income) {
      throw new StatusError('Income not found', 404);
    }

    return income;
  },

  /**
   * Create new income
   */
  async createIncome(data, userId) {
    // Verify category exists and belongs to user
    const category = await Category.findOne({
      _id: data.categoryId,
      userId,
      type: 'income',
      freezed: 0
    });

    if (!category) {
      throw new StatusError('Invalid category or category not found', 400);
    }

    const incomeData = {
      ...data,
      userId
    };

    const income = await Income.create(incomeData);
    return await income.populate('categoryId', 'name icon color type');
  },

  /**
   * Update income
   */
  async updateIncome(incomeId, data, userId) {
    // If category is being updated, verify it
    if (data.categoryId) {
      const category = await Category.findOne({
        _id: data.categoryId,
        userId,
        type: 'income',
        freezed: 0
      });

      if (!category) {
        throw new StatusError('Invalid category or category not found', 400);
      }
    }

    const income = await Income.findOneAndUpdate(
      { _id: incomeId, userId, freezed: 0 },
      data,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name icon color type');

    if (!income) {
      throw new StatusError('Income not found', 404);
    }

    return income;
  },

  /**
   * Delete income (soft delete)
   */
  async deleteIncome(incomeId, userId) {
    const income = await Income.findOneAndUpdate(
      { _id: incomeId, userId, freezed: 0 },
      { freezed: 1 },
      { new: true }
    );

    if (!income) {
      throw new StatusError('Income not found', 404);
    }

    return income;
  }
};

export default incomeService;
