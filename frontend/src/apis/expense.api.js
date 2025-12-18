import axiosInstance from '../utils/axiosInstance';

export const expenseAPI = {
  getAll: async (filters = {}) => {
    return axiosInstance.get('/expenses', { params: filters });
  },

  getById: async (id) => {
    return axiosInstance.get(`/expenses/${id}`);
  },

  create: async (data) => {
    return axiosInstance.post('/expenses', data);
  },

  update: async (id, data) => {
    return axiosInstance.put(`/expenses/${id}`, data);
  },

  delete: async (id) => {
    return axiosInstance.delete(`/expenses/${id}`);
  }
};
