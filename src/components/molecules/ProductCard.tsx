import React from 'react';
import { cn } from '../../lib/utils';
import { Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <div className="block w-full group">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-card backdrop-blur-xl",
          "border border-border/50",
          "shadow-sm transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "hover:border-primary/20"
        )}
      >
        {/* Image Container */}
        <div className="relative h-[320px] overflow-hidden bg-accent/10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onQuickView();
          }}
          className={cn(
            "absolute top-3 right-3",
            "p-2 rounded-full",
            "bg-background/80 backdrop-blur-md",
            "opacity-0 group-hover:opacity-100 transition-all duration-300",
            "hover:bg-background/90"
          )}
        >
          <Eye className="w-4 h-4 text-foreground" />
        </button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-primary">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-card-foreground leading-snug tracking-tight line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 tracking-tight">
                {product.description}
              </p>
            </div>
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-primary/10",
                "backdrop-blur-md",
                "group-hover:bg-primary/20",
                "transition-colors duration-300"
              )}
            >
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 