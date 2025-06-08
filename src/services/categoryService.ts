import { get, post, put, del } from './api';
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
    await delay(300);
    return categories;
  },

  // Tek bir kategori getir
  async getCategory(id: number): Promise<Category | null> {
    await delay(200);
    const category = categories.find(c => c.id === id);
    if (!category) return null;
    return category;
  },

  // Yeni kategori ekle
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    await delay(500);
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      ...data,
    };
    categories.push(newCategory);
    return newCategory;
  },

  // Kategori güncelle
  async updateCategory(id: number, data: CreateCategoryDto): Promise<Category | null> {
    await delay(400);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;

    const updatedCategory = {
      ...categories[index],
      ...data,
    };
    categories[index] = updatedCategory;
    return updatedCategory;
  },

  // Kategori sil
  async deleteCategory(id: number): Promise<boolean> {
    await delay(400);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;

    categories = categories.filter(c => c.id !== id);
    return true;
  },

  // Kategori ara
  async searchCategories(query: string): Promise<Category[]> {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return categories.filter(c => 
      c.name.toLowerCase().includes(searchTerm)
    );
  }
}; 