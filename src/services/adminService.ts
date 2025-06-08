import { post } from './api';
import { AdminLoginDto } from '../types';

const BASE_URL = '/admin';

export const adminService = {
  // Admin girişi
  login: async (credentials: AdminLoginDto) => {
    const response = await post<{ token: string }>(`${BASE_URL}/login`, credentials);
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  // Admin çıkışı
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  },

  // Token kontrolü
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
}; 