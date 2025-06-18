// Product Types
export interface ProductListDto {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  price: number;
}

export interface ProductDetailDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryName: string;
  price: number;
}

export interface ProductCreateUpdateDto {
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: number;
}

// Category Types
export interface CategoryDto {
  id: number;
  name: string;
}

// Admin Types
export interface AdminLoginDto {
  username: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

// Form Types
export interface ProductFormData extends Omit<ProductCreateUpdateDto, 'id'> {}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    username: string;
  } | null;
} 