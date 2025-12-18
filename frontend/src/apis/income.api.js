import axiosInstance from '../utils/axiosInstance';

export const incomeAPI = {
  getAll: async (filters = {}) => {
    return axiosInstance.get('/incomes', { params: filters });
  },

  getById: async (id) => {
    return axiosInstance.get(`/incomes/${id}`);
  },

  create: async (data) => {
    return axiosInstance.post('/incomes', data);
  },

  update: async (id, data) => {
    return axiosInstance.put(`/incomes/${id}`, data);
  },

  delete: async (id) => {
    return axiosInstance.delete(`/incomes/${id}`);
  }
};
