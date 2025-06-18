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
    try {
      console.log('ProductService - Gönderilen veri:', data);
      console.log('ProductService - API Endpoint:', API_ENDPOINTS.admin.products.create);
      
      const response = await httpClient.post(API_ENDPOINTS.admin.products.create, data);
      console.log('ProductService - Başarılı response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Hata detayları:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      throw error;
    }
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
  async toggleProductStatus(id: number): Promise<ProductDetailDto | null> {
    const product = await this.getAdminProduct(id);
    if (!product) return null;

    // ProductDetailDto'da status yok, bu yüzden sadece ürünü döndürüyoruz
    // Status değişikliği için ayrı bir endpoint gerekebilir
    return product;
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
  },

  // Public ürünleri getir (user'lar için)
  async getPublicProducts(): Promise<ProductListDto[]> {
    try {
      console.log('ProductService - Public products çağrısı:', API_ENDPOINTS.public.products.list);
      const response = await httpClient.get(API_ENDPOINTS.public.products.list);
      console.log('ProductService - Public products response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Public products hatası:', error);
      throw error;
    }
  },

  // Kategoriye göre public ürünleri getir
  async getPublicProductsByCategory(categoryId: number): Promise<ProductListDto[]> {
    try {
      console.log('ProductService - Category products çağrısı:', API_ENDPOINTS.public.products.byCategory(categoryId));
      const response = await httpClient.get(API_ENDPOINTS.public.products.byCategory(categoryId));
      console.log('ProductService - Category products response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Category products hatası:', error);
      throw error;
    }
  },

  // Public ürün ara
  async searchPublicProducts(searchTerm: string): Promise<ProductListDto[]> {
    try {
      console.log('ProductService - Search products çağrısı:', API_ENDPOINTS.public.products.search(searchTerm));
      const response = await httpClient.get(API_ENDPOINTS.public.products.search(searchTerm));
      console.log('ProductService - Search products response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Search products hatası:', error);
      throw error;
    }
  },

  // Public ürün ara ve kategori filtrele
  async searchPublicProductsWithCategory(searchTerm: string, categoryId: number): Promise<ProductListDto[]> {
    try {
      console.log('ProductService - Search with category çağrısı:', API_ENDPOINTS.public.products.searchWithCategory(searchTerm, categoryId));
      const response = await httpClient.get(API_ENDPOINTS.public.products.searchWithCategory(searchTerm, categoryId));
      console.log('ProductService - Search with category response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('ProductService - Search with category hatası:', error);
      throw error;
    }
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