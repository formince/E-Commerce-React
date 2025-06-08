import React from 'react';
import { ProductListDto } from '../../types';
import { ProductCard } from '../molecules/ProductCard';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

interface ProductGridProps {
  products: ProductListDto[];
  onViewDetails: (id: number) => void;
  isLoading: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onViewDetails,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={() => onViewDetails(product.id)}
        />
      ))}
    </div>
  );
}; 