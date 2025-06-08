import { get, post, put, del } from './api';
import { CategoryDto } from '../types';

const BASE_URL = '/categories';

export const categoryService = {
  // Tüm kategorileri getir
  getAll: async () => {
    return get<CategoryDto[]>(BASE_URL);
  },

  // Kategori detayını getir
  getById: async (id: number) => {
    return get<CategoryDto>(`${BASE_URL}/${id}`);
  },

  // Yeni kategori oluştur
  create: async (name: string) => {
    return post<CategoryDto>(BASE_URL, { name });
  },

  // Kategori güncelle
  update: async (id: number, name: string) => {
    return put<CategoryDto>(`${BASE_URL}/${id}`, { name });
  },

  // Kategori sil
  delete: async (id: number) => {
    return del<void>(`${BASE_URL}/${id}`);
  }
}; 