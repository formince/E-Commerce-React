import httpClient from './httpClient';
import { API_ENDPOINTS } from '../config/api';
import { 
  ProductListDto, 
  ProductDetailDto, 
  ProductCreateUpdateDto,
  PaginatedResponse 
} from '../types';
import { AxiosError } from 'axios';

const BASE_URL = '/products';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: number;
  price: number;
  status: 'active' | 'inactive';
}

interface CreateProductDto {
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: number;
  price: number;
}

interface UpdateProductDto extends Partial<CreateProductDto> {
  status?: 'active' | 'inactive';
}

// Mock data
let products: Product[] = [
  {
    id: 1,
    name: 'Faber Castell Kalem Seti',
    description: 'Premium kalem seti',
    imageUrl: 'https://example.com/kalem.jpg',
    categoryId: 1,
    stockQuantity: 50,
    price: 149.99,
    status: 'active',
  },
  {
    id: 2,
    name: 'Moleskine Defter',
    description: 'Sert kapaklı not defteri',
    imageUrl: 'https://example.com/defter.jpg',
    categoryId: 2,
    stockQuantity: 30,
    price: 199.99,
    status: 'active',
  },
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Tüm ürünleri getir
  getAll: async (page: number = 1, pageSize: number = 10) => {
    return httpClient.get<PaginatedResponse<ProductListDto>>(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
  },

  // Ürün detayını getir
  getById: async (id: number) => {
    return httpClient.get<ProductDetailDto>(`${BASE_URL}/${id}`);
  },

  // Yeni ürün oluştur
  create: async (product: ProductCreateUpdateDto) => {
    return httpClient.post<ProductDetailDto>(BASE_URL, product);
  },

  // Ürün güncelle
  update: async (id: number, product: ProductCreateUpdateDto) => {
    return httpClient.put<ProductDetailDto>(`${BASE_URL}/${id}`, product);
  },

  // Ürün sil
  delete: async (id: number) => {
    return httpClient.delete<void>(`${BASE_URL}/${id}`);
  },

  // Kategoriye göre ürünleri getir
  getByCategory: async (categoryId: number, page: number = 1, pageSize: number = 10) => {
    return httpClient.get<PaginatedResponse<ProductListDto>>(
      `${BASE_URL}/category/${categoryId}?page=${page}&pageSize=${pageSize}`
    );
  },

  // Ürün ara
  search: async (query: string, page: number = 1, pageSize: number = 10) => {
    return httpClient.get<PaginatedResponse<ProductListDto>>(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
  },

  // Tüm ürünleri getir
  async getProducts(): Promise<Product[]> {
    const response = await httpClient.get(API_ENDPOINTS.admin.products.list);
    return response.data;
  },

  // Tek bir ürün getir
  async getProduct(id: number): Promise<Product | null> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.admin.products.detail(id));
      return response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },

  // Yeni ürün ekle
  async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await httpClient.post(API_ENDPOINTS.admin.products.create, data);
    return response.data;
  },

  // Ürün güncelle
  async updateProduct(id: number, data: UpdateProductDto): Promise<Product | null> {
    try {
      const response = await httpClient.put(API_ENDPOINTS.admin.products.update(id), data);
      return response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },

  // Ürün sil
  async deleteProduct(id: number): Promise<boolean> {
    try {
      await httpClient.delete(API_ENDPOINTS.admin.products.delete(id));
      return true;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return false;
      throw error;
    }
  },

  // Ürün durumunu değiştir (aktif/pasif)
  async toggleProductStatus(id: number): Promise<Product | null> {
    const product = await this.getProduct(id);
    if (!product) return null;

    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    return this.updateProduct(id, { status: newStatus });
  },

  // Kategoriye göre ürünleri filtrele
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    await delay(300);
    return products.filter(p => p.categoryId === categoryId);
  },

  // Ürün ara
  async searchProducts(query: string): Promise<Product[]> {
    const response = await httpClient.get(`${API_ENDPOINTS.admin.products.list}?search=${encodeURIComponent(query)}`);
    return response.data;
  }
}; 