import { get, post, put, del } from './api';
import { 
  ProductListDto, 
  ProductDetailDto, 
  ProductCreateUpdateDto,
  PaginatedResponse 
} from '../types';

const BASE_URL = '/products';

export const productService = {
  // Tüm ürünleri getir
  getAll: async (page: number = 1, pageSize: number = 10) => {
    return get<PaginatedResponse<ProductListDto>>(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
  },

  // Ürün detayını getir
  getById: async (id: number) => {
    return get<ProductDetailDto>(`${BASE_URL}/${id}`);
  },

  // Yeni ürün oluştur
  create: async (product: ProductCreateUpdateDto) => {
    return post<ProductDetailDto>(BASE_URL, product);
  },

  // Ürün güncelle
  update: async (id: number, product: ProductCreateUpdateDto) => {
    return put<ProductDetailDto>(`${BASE_URL}/${id}`, product);
  },

  // Ürün sil
  delete: async (id: number) => {
    return del<void>(`${BASE_URL}/${id}`);
  },

  // Kategoriye göre ürünleri getir
  getByCategory: async (categoryId: number, page: number = 1, pageSize: number = 10) => {
    return get<PaginatedResponse<ProductListDto>>(
      `${BASE_URL}/category/${categoryId}?page=${page}&pageSize=${pageSize}`
    );
  },

  // Ürün ara
  search: async (query: string, page: number = 1, pageSize: number = 10) => {
    return get<PaginatedResponse<ProductListDto>>(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
  }
}; 