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
    console.log('HTTP Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    
    // Token varsa ekle
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token eklendi:', token.substring(0, 20) + '...');
    } else {
      console.log('Token bulunamadı');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    console.log('HTTP Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('HTTP Error Response:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response) {
      // Token expired veya invalid token
      if (error.response.status === 401) {
        console.log('401 Unauthorized - Token siliniyor ve login sayfasına yönlendiriliyor');
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