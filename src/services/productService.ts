import { get, post, put, del } from './api';
import { 
  ProductListDto, 
  ProductDetailDto, 
  ProductCreateUpdateDto,
  PaginatedResponse 
} from '../types';

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
  },

  // Tüm ürünleri getir
  async getProducts(): Promise<Product[]> {
    await delay(500); // Simulate API delay
    return products;
  },

  // Tek bir ürün getir
  async getProduct(id: number): Promise<Product | null> {
    await delay(300);
    const product = products.find(p => p.id === id);
    if (!product) return null;
    return product;
  },

  // Yeni ürün ekle
  async createProduct(data: CreateProductDto): Promise<Product> {
    await delay(800);
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      ...data,
      status: 'active',
    };
    products.push(newProduct);
    return newProduct;
  },

  // Ürün güncelle
  async updateProduct(id: number, data: UpdateProductDto): Promise<Product | null> {
    await delay(600);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      ...data,
    };
    products[index] = updatedProduct;
    return updatedProduct;
  },

  // Ürün sil
  async deleteProduct(id: number): Promise<boolean> {
    await delay(500);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products = products.filter(p => p.id !== id);
    return true;
  },

  // Ürün durumunu değiştir (aktif/pasif)
  async toggleProductStatus(id: number): Promise<Product | null> {
    await delay(400);
    const product = products.find(p => p.id === id);
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
    await delay(300);
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    );
  }
}; 