import { controller } from '../utils/helpers/controller.helper.js';
import statisticsService from '../services/statistics.service.js';

const statisticsController = {
  /**
   * Get financial summary
   */
  getSummary: controller(async (req, res) => {
    const { startDate, endDate } = req.query;
    const summary = await statisticsService.getSummary(
      req.user.userId,
      startDate,
      endDate
    );

    res.json({
      status: true,
      message: 'Summary fetched successfully',
      data: summary
    });
  }),

  /**
   * Get expenses by category
   */
  getExpensesByCategory: controller(async (req, res) => {
    const { startDate, endDate } = req.query;
    const data = await statisticsService.getExpensesByCategory(
      req.user.userId,
      startDate,
      endDate
    );

    res.json({
      status: true,
      message: 'Expenses by category fetched successfully',
      data
    });
  }),

  /**
   * Get incomes by category
   */
  getIncomesByCategory: controller(async (req, res) => {
    const { startDate, endDate } = req.query;
    const data = await statisticsService.getIncomesByCategory(
      req.user.userId,
      startDate,
      endDate
    );

    res.json({
      status: true,
      message: 'Incomes by category fetched successfully',
      data
    });
  }),

  /**
   * Get monthly trend
   */
  getMonthlyTrend: controller(async (req, res) => {
    const { months } = req.query;
    const trend = await statisticsService.getMonthlyTrend(
      req.user.userId,
      months ? parseInt(months) : 6
    );

    res.json({
      status: true,
      message: 'Monthly trend fetched successfully',
      data: trend
    });
  }),

  /**
   * Get recent transactions
   */
  getRecentTransactions: controller(async (req, res) => {
    const { limit } = req.query;
    const transactions = await statisticsService.getRecentTransactions(
      req.user.userId,
      limit ? parseInt(limit) : 10
    );

    res.json({
      status: true,
      message: 'Recent transactions fetched successfully',
      data: transactions
    });
  })
};

export default statisticsController;
