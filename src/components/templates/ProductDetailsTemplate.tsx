import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { mockProducts } from '../../data/mockProducts';
import { cn } from '../../lib/utils';
import { ArrowLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductDetailsTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Ürün bulunamadı</h1>
        <Link 
          to="/products" 
          className="flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ürünlere Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with same style as products page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black">
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-950/30 blur-[100px] animate-float" />
          <div className="absolute top-3/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-950/20 blur-[80px] animate-float-delay" />
          <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] rounded-full bg-slate-800/30 mix-blend-soft-light blur-[120px] animate-float" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[90px] animate-float-delay" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[70px] animate-float" />
        </div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/products" 
              className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ürünlere Geri Dön
            </Link>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              {/* Category */}
              <div className="inline-block px-3 py-1 rounded-full text-sm bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300">
                {product.category}
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <p className="text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm",
                  product.stock > 0
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}>
                  {product.stock > 0 ? `${product.stock} adet stokta` : 'Tükendi'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-white">
                  {product.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Ürün Detayları</h3>
                <dl className="space-y-4">
                  <div className="flex">
                    <dt className="w-1/4 text-gray-400">Kategori</dt>
                    <dd className="w-3/4 text-white">{product.category}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/4 text-gray-400">Stok Durumu</dt>
                    <dd className="w-3/4 text-white">{product.stock} adet</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/4 text-gray-400">Ürün Kodu</dt>
                    <dd className="w-3/4 text-white">{product.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 