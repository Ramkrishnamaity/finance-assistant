import Expense from '../models/expense.model.js';
import Income from '../models/income.model.js';
import Category from '../models/category.model.js';

const statisticsService = {
  /**
   * Get financial summary statistics
   */
  async getSummary(userId, startDate = null, endDate = null) {
    const query = { userId, freezed: 0 };

    // Add date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Calculate total income
    const incomeResult = await Income.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

    // Calculate total expenses
    const expenseResult = await Expense.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = expenseResult.length > 0 ? expenseResult[0].total : 0;

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    // Get transaction counts
    const incomeCount = await Income.countDocuments(query);
    const expenseCount = await Expense.countDocuments(query);

    return {
      totalIncome,
      totalExpenses,
      balance,
      incomeCount,
      expenseCount
    };
  },

  /**
   * Get expenses by category
   */
  async getExpensesByCategory(userId, startDate = null, endDate = null) {
    const query = { userId, freezed: 0 };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expensesByCategory = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$categoryId',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          total: 1,
          count: 1,
          name: '$category.name',
          icon: '$category.icon',
          color: '$category.color'
        }
      },
      { $sort: { total: -1 } }
    ]);

    return expensesByCategory;
  },

  /**
   * Get incomes by category
   */
  async getIncomesByCategory(userId, startDate = null, endDate = null) {
    const query = { userId, freezed: 0 };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const incomesByCategory = await Income.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$categoryId',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          total: 1,
          count: 1,
          name: '$category.name',
          icon: '$category.icon',
          color: '$category.color'
        }
      },
      { $sort: { total: -1 } }
    ]);

    return incomesByCategory;
  },

  /**
   * Get monthly trend data
   */
  async getMonthlyTrend(userId, months = 6) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const query = { userId, freezed: 0, date: { $gte: startDate } };

    // Get monthly expenses
    const expensesTrend = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get monthly incomes
    const incomesTrend = await Income.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Combine data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trend = [];

    // Create a map for expenses
    const expensesMap = new Map();
    expensesTrend.forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      expensesMap.set(key, item.total);
    });

    // Create a map for incomes
    const incomesMap = new Map();
    incomesTrend.forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      incomesMap.set(key, item.total);
    });

    // Generate trend data for each month
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      trend.push({
        month: monthNames[month - 1],
        year,
        expenses: expensesMap.get(key) || 0,
        income: incomesMap.get(key) || 0
      });
    }

    return trend;
  },

  /**
   * Get recent transactions
   */
  async getRecentTransactions(userId, limit = 10) {
    const query = { userId, freezed: 0 };

    const expenses = await Expense.find(query)
      .populate('categoryId', 'name icon color')
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    const incomes = await Income.find(query)
      .populate('categoryId', 'name icon color')
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    // Add type field
    expenses.forEach(exp => exp.type = 'expense');
    incomes.forEach(inc => inc.type = 'income');

    // Combine and sort
    const transactions = [...expenses, ...incomes]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    return transactions;
  }
};

export default statisticsService;
