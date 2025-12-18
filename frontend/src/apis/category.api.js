import axiosInstance from '../utils/axiosInstance';

export const categoryAPI = {
  getAll: async (type = null) => {
    const params = type ? { type } : {};
    return axiosInstance.get('/categories', { params });
  },

  getById: async (id) => {
    return axiosInstance.get(`/categories/${id}`);
  },

  create: async (data) => {
    return axiosInstance.post('/categories', data);
  },

  update: async (id, data) => {
    return axiosInstance.put(`/categories/${id}`, data);
  },

  delete: async (id) => {
    return axiosInstance.delete(`/categories/${id}`);
  }
};
