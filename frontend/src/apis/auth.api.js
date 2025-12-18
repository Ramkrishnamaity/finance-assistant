import axiosInstance from '../utils/axiosInstance';

export const authAPI = {
  register: async (data) => {
    return axiosInstance.post('/auth/register', data);
  },

  login: async (data) => {
    return axiosInstance.post('/auth/login', data);
  },

  getProfile: async () => {
    return axiosInstance.get('/auth/profile');
  }
};
