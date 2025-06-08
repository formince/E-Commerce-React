export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
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