import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/product';
import { cn } from '../../lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Ürün Detayı</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-accent/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-primary/80 font-medium">
                {product.category}
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-1">
                {product.name}
              </h3>
            </div>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {product.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </span>
                <span className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  product.stock > 0
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                )}>
                  {product.stock > 0 ? `${product.stock} adet stokta` : 'Tükendi'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 