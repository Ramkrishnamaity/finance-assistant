import { controller } from '../utils/helpers/controller.helper.js';
import incomeService from '../services/income.service.js';

const incomeController = {
  /**
   * Get all incomes
   */
  getAllIncomes: controller(async (req, res) => {
    const { categoryId, startDate, endDate } = req.query;
    const filters = { categoryId, startDate, endDate };

    const incomes = await incomeService.getAllIncomes(req.user.userId, filters);

    res.json({
      status: true,
      message: 'Incomes fetched successfully',
      data: incomes
    });
  }),

  /**
   * Get income by ID
   */
  getIncomeById: controller(async (req, res) => {
    const income = await incomeService.getIncomeById(
      req.params.id,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Income fetched successfully',
      data: income
    });
  }),

  /**
   * Create new income
   */
  createIncome: controller(async (req, res) => {
    const income = await incomeService.createIncome(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      status: true,
      message: 'Income created successfully',
      data: income
    });
  }),

  /**
   * Update income
   */
  updateIncome: controller(async (req, res) => {
    const income = await incomeService.updateIncome(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Income updated successfully',
      data: income
    });
  }),

  /**
   * Delete income
   */
  deleteIncome: controller(async (req, res) => {
    await incomeService.deleteIncome(req.params.id, req.user.userId);

    res.json({
      status: true,
      message: 'Income deleted successfully',
      data: null
    });
  })
};

export default incomeController;
