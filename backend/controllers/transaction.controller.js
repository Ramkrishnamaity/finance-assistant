import Expense from '../models/expense.model.js';
import Income from '../models/income.model.js';

const transactionController = {
  // Get all transactions (expenses and incomes combined)
  getAllTransactions: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { type, categoryId, startDate, endDate } = req.query;

      // Build query
      const query = { userId, freezed: 0 };

      if (categoryId) {
        query.categoryId = categoryId;
      }

      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      let expenses = [];
      let incomes = [];

      // Fetch based on filter type
      if (!type || type === 'all' || type === 'expense') {
        expenses = await Expense.find(query)
          .populate('categoryId', 'name icon type')
          .sort({ date: -1 })
          .lean();

        // Add transaction type to each expense
        expenses = expenses.map(exp => ({ ...exp, transactionType: 'expense' }));
      }

      if (!type || type === 'all' || type === 'income') {
        incomes = await Income.find(query)
          .populate('categoryId', 'name icon type')
          .sort({ date: -1 })
          .lean();

        // Add transaction type to each income
        incomes = incomes.map(inc => ({ ...inc, transactionType: 'income' }));
      }

      // Combine and sort by date
      const transactions = [...expenses, ...incomes].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );

      res.status(200).json({
        status: true,
        message: 'Transactions fetched successfully',
        data: transactions
      });
    } catch (error) {
      next(error);
    }
  }
};

export default transactionController;
