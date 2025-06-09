import httpClient from './httpClient';
import { API_ENDPOINTS } from '../config/api';
import { AxiosError } from 'axios';
import { CategoryDto } from '../types';

const BASE_URL = '/categories';

interface Category {
  id: number;
  name: string;
}

interface CreateCategoryDto {
  name: string;
}

// Mock data
let categories: Category[] = [
  { id: 1, name: 'Kalemler' },
  { id: 2, name: 'Defterler' },
  { id: 3, name: 'Dosyalar' },
  { id: 4, name: 'Boyalar' },
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  // Tüm kategorileri getir
  async getCategories(): Promise<Category[]> {
    const response = await httpClient.get(API_ENDPOINTS.admin.categories.list);
    return response.data;
  },

  // Tek bir kategori getir
  async getCategory(id: number): Promise<Category | null> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.admin.categories.detail(id));
      return response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },

  // Yeni kategori ekle
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const response = await httpClient.post(API_ENDPOINTS.admin.categories.create, data);
    return response.data;
  },

  // Kategori güncelle
  async updateCategory(id: number, data: CreateCategoryDto): Promise<Category | null> {
    try {
      const response = await httpClient.put(API_ENDPOINTS.admin.categories.update(id), data);
      return response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },

  // Kategori sil
  async deleteCategory(id: number): Promise<boolean> {
    try {
      await httpClient.delete(API_ENDPOINTS.admin.categories.delete(id));
      return true;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return false;
      throw error;
    }
  },

  // Kategori ara
  async searchCategories(query: string): Promise<Category[]> {
    const response = await httpClient.get(`${API_ENDPOINTS.admin.categories.list}?search=${encodeURIComponent(query)}`);
    return response.data;
  }
}; 