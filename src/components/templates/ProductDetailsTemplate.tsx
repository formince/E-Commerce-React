import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductDetailDto } from '../../types';
import { productService } from '../../services/productService';
import { cn } from '../../lib/utils';
import { ArrowLeft, Eye, Loader2, Package2 } from 'lucide-react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

export const ProductDetailsTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('ProductDetails - Ürün yükleniyor, ID:', id);
        const productData = await productService.getProduct(parseInt(id));
        
        if (!productData) {
          setError('Ürün bulunamadı');
          return;
        }
        
        setProduct(productData);
        console.log('ProductDetails - Yüklenen ürün:', productData);
      } catch (error: any) {
        console.error('ProductDetails - Ürün yüklenirken hata:', error);
        setError('Ürün yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Ürün yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package2 className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Ürün bulunamadı'}
            </h1>
            <Link 
              to="/products" 
              className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ürünlere Geri Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12 relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-blue-50 to-white dark:from-gray-900 dark:via-slate-900 dark:to-black">
            {/* Primary Orbs */}
            <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-100/30 dark:bg-indigo-950/30 blur-[100px] animate-float" />
            <div className="absolute top-3/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-50/20 dark:bg-blue-950/20 blur-[80px] animate-float-delay" />
            <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] rounded-full bg-slate-100/30 dark:bg-slate-800/30 mix-blend-soft-light blur-[120px] animate-float" />
            
            {/* Secondary Orbs */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/20 dark:bg-indigo-900/20 blur-[90px] animate-float-delay" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-slate-100/20 dark:bg-blue-900/20 blur-[70px] animate-float" />
          </div>
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/products" 
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
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
                  src={product.imageUrl}
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
              <div className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary">
                {product.categoryName}
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm",
                  product.stockQuantity > 0
                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                )}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} adet stokta` : 'Tükendi'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₺{product.price.toFixed(2)}
                </span>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ürün Detayları</h3>
                <dl className="space-y-4">
                  <div className="flex">
                    <dt className="w-1/4 text-gray-600 dark:text-gray-400">Kategori</dt>
                    <dd className="w-3/4 text-gray-900 dark:text-white">{product.categoryName}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/4 text-gray-600 dark:text-gray-400">Stok Durumu</dt>
                    <dd className="w-3/4 text-gray-900 dark:text-white">{product.stockQuantity} adet</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/4 text-gray-600 dark:text-gray-400">Ürün Kodu</dt>
                    <dd className="w-3/4 text-gray-900 dark:text-white">{product.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; 