import axiosInstance from '../utils/axiosInstance';

export const statisticsAPI = {
  getSummary: async (filters = {}) => {
    return axiosInstance.get('/statistics/summary', { params: filters });
  },

  getExpensesByCategory: async (filters = {}) => {
    return axiosInstance.get('/statistics/expenses-by-category', { params: filters });
  },

  getIncomesByCategory: async (filters = {}) => {
    return axiosInstance.get('/statistics/incomes-by-category', { params: filters });
  },

  getMonthlyTrend: async (months = 6) => {
    return axiosInstance.get('/statistics/monthly-trend', { params: { months } });
  },

  getRecentTransactions: async (limit = 10) => {
    return axiosInstance.get('/statistics/recent-transactions', { params: { limit } });
  }
};
