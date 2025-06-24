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

export const productService = {
  // Tüm ürünleri getir (Admin)
  async getProducts(): Promise<Product[]> {
    console.log('ProductService - Admin products çağrısı:', API_ENDPOINTS.admin.products.list);
    const response = await httpClient.get(API_ENDPOINTS.admin.products.list);
    console.log('ProductService - Admin products response:', response.data);
    return response.data;
  },

  // Tek bir ürün getir (public)
  async getProduct(id: number): Promise<ProductDetailDto | null> {
    try {
      console.log('ProductService - Public product detail çağrısı:', API_ENDPOINTS.public.products.detail(id));
      const response = await httpClient.get(API_ENDPOINTS.public.products.detail(id));
      console.log('ProductService - Public product detail response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Public product detail hatası:', error);
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },

  // Yeni ürün ekle
  async createProduct(data: CreateProductDto): Promise<Product> {
    console.log('ProductService - Gönderilen veri:', data);
    console.log('ProductService - API Endpoint:', API_ENDPOINTS.admin.products.create);
    
    const response = await httpClient.post(API_ENDPOINTS.admin.products.create, data);
    console.log('ProductService - Başarılı response:', response.data);
    return response.data;
  },

  // Ürün güncelle
  async updateProduct(id: number, data: UpdateProductDto): Promise<Product | null> {
    const response = await httpClient.put(API_ENDPOINTS.admin.products.update(id), data);
    return response.data;
  },

  // Ürün sil
  async deleteProduct(id: number): Promise<boolean> {
    await httpClient.delete(API_ENDPOINTS.admin.products.delete(id));
    return true;
  },

  // Ürün durumunu değiştir (aktif/pasif)
  async toggleProductStatus(id: number): Promise<ProductDetailDto | null> {
    const product = await this.getAdminProduct(id);
    if (!product) return null;
    return product;
  },

  // Ürün ara
  async searchProducts(query: string): Promise<Product[]> {
    const response = await httpClient.get(`${API_ENDPOINTS.admin.products.list}?search=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Public ürünleri getir (user'lar için)
  async getPublicProducts(): Promise<ProductListDto[]> {
    console.log('ProductService - Public products çağrısı:', API_ENDPOINTS.public.products.list);
    const response = await httpClient.get(API_ENDPOINTS.public.products.list);
    console.log('ProductService - Public products response:', response.data);
    return response.data;
  },

  // Kategoriye göre public ürünleri getir
  async getPublicProductsByCategory(categoryId: number): Promise<ProductListDto[]> {
    console.log('ProductService - Category products çağrısı:', API_ENDPOINTS.public.products.byCategory(categoryId));
    const response = await httpClient.get(API_ENDPOINTS.public.products.byCategory(categoryId));
    console.log('ProductService - Category products response:', response.data);
    return response.data;
  },

  // Public ürün ara
  async searchPublicProducts(searchTerm: string): Promise<ProductListDto[]> {
    console.log('ProductService - Search products çağrısı:', API_ENDPOINTS.public.products.search(searchTerm));
    const response = await httpClient.get(API_ENDPOINTS.public.products.search(searchTerm));
    console.log('ProductService - Search products response:', response.data);
    return response.data;
  },

  // Public ürün ara ve kategori filtrele
  async searchPublicProductsWithCategory(searchTerm: string, categoryId: number): Promise<ProductListDto[]> {
    console.log('ProductService - Search with category çağrısı:', API_ENDPOINTS.public.products.searchWithCategory(searchTerm, categoryId));
    const response = await httpClient.get(API_ENDPOINTS.public.products.searchWithCategory(searchTerm, categoryId));
    console.log('ProductService - Search with category response:', response.data);
    return response.data;
  },

  // Tek bir ürün getir (admin)
  async getAdminProduct(id: number): Promise<ProductDetailDto | null> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.admin.products.detail(id));
      return response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) return null;
      throw error;
    }
  },
}; 