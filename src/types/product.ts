export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  price: number;
}

// Eski Product interface'i (backward compatibility için)
export interface ProductLegacy {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryName: string;
  description: string;
  stock: number;
  createdAt: string;
}

export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
} 