import axios from 'axios';

// Axios instance oluştur
const httpClient = axios.create({
  timeout: 10000, // 10 saniye timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Token varsa ekle
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Token expired veya invalid token
      if (error.response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
      }
      
      // Validation errors
      if (error.response.status === 400) {
        return Promise.reject({
          message: error.response.data.message || 'Validation error',
          errors: error.response.data.errors,
        });
      }

      // Server errors
      if (error.response.status >= 500) {
        return Promise.reject({
          message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
        });
      }
    }

    // Network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.',
      });
    }

    return Promise.reject(error);
  }
);

export default httpClient; 