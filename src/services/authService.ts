import httpClient from './httpClient';
import { API_ENDPOINTS } from '../config/api';
import { AxiosError } from 'axios';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<string> {
    console.log('Login attempt:', credentials);
    console.log('Login URL:', API_ENDPOINTS.auth.login);
    
    try {
      const response = await httpClient.post<LoginResponse>(
        API_ENDPOINTS.auth.login,
        credentials
      );

      console.log('Login response:', response.data);

      // Token'ı localStorage'a kaydet
      const token = response.data.token;
      localStorage.setItem('admin_token', token);

      return token;
    } catch (error) {
      console.error('Login error:', error);
      
      const axiosError = error as AxiosError;
      console.error('Error response:', axiosError.response);
      console.error('Error status:', axiosError.response?.status);
      console.error('Error data:', axiosError.response?.data);

      if (axiosError?.response?.status === 401) {
        throw new Error('Geçersiz kullanıcı adı veya şifre');
      }
      if (axiosError?.response?.status === 400) {
        throw new Error('Lütfen tüm alanları doldurun');
      }
      if (axiosError?.response?.status === 429) {
        throw new Error('Çok fazla deneme yaptınız. Lütfen bir süre bekleyin');
      }
      if (axiosError?.code === 'ERR_NETWORK') {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      }
      if (axiosError?.code === 'ECONNREFUSED') {
        throw new Error('Sunucu yanıt vermiyor. Lütfen sunucunun çalıştığından emin olun.');
      }
      
      throw new Error(`Giriş yapılırken bir hata oluştu: ${axiosError?.message || 'Bilinmeyen hata'}`);
    }
  },

  logout(): void {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  },

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }
}; 