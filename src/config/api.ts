// API Base URL'i environment variable'dan al
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7100';

// API endpoint'leri
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/api/Auth/login`,
  },

  // Admin endpoints
  admin: {
    products: {
      list: `${API_BASE_URL}/api/Admin/products`,
      detail: (id: number) => `${API_BASE_URL}/api/Admin/products/${id}`,
      create: `${API_BASE_URL}/api/Admin/products`,
      update: (id: number) => `${API_BASE_URL}/api/Admin/products/${id}`,
      delete: (id: number) => `${API_BASE_URL}/api/Admin/products/${id}`,
    },
    categories: {
      list: `${API_BASE_URL}/api/Admin/categories`,
      detail: (id: number) => `${API_BASE_URL}/api/Admin/categories/${id}`,
      create: `${API_BASE_URL}/api/Admin/categories`,
      update: (id: number) => `${API_BASE_URL}/api/Admin/categories/${id}`,
      delete: (id: number) => `${API_BASE_URL}/api/Admin/categories/${id}`,
    },
  },

  // Public endpoints
  public: {
    products: {
      list: `${API_BASE_URL}/api/products`,
      detail: (id: number) => `${API_BASE_URL}/api/products/${id}`,
    },
    categories: {
      list: `${API_BASE_URL}/api/categories`,
    },
  },
}; 