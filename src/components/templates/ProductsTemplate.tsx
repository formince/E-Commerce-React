import React, { useState, useMemo, useEffect } from 'react';
import { ProductListDto } from '../../types';
import { cn } from '../../lib/utils';
import { SortSelect } from '../molecules/SortSelect';
import { QuickViewModal } from '../molecules/QuickViewModal';
import { Package2, ShoppingCart, Search, Eye, ArrowUpRight, Loader2 } from 'lucide-react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { CategoryCombobox } from '../molecules/CategoryCombobox';
import { Link, useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';

export const ProductsTemplate: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductListDto | null>(null);
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const productsPerPage = 8;

  // API'den ürünleri yükle
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let productsData: ProductListDto[];
        
        console.log('ProductsTemplate - Yükleme başladı:', { searchQuery, selectedCategory, selectedCategoryId });
        
        if (searchQuery && selectedCategoryId) {
          // Hem arama hem kategori seçili
          console.log('ProductsTemplate - Arama + kategori yapılıyor:', { searchQuery, selectedCategoryId });
          productsData = await productService.searchPublicProductsWithCategory(searchQuery, selectedCategoryId);
        } else if (searchQuery) {
          // Sadece arama yapılıyorsa
          console.log('ProductsTemplate - Arama yapılıyor:', searchQuery);
          productsData = await productService.searchPublicProducts(searchQuery);
        } else if (selectedCategoryId) {
          // Sadece kategori seçiliyse
          console.log('ProductsTemplate - Kategori filtreleniyor:', selectedCategoryId);
          productsData = await productService.getPublicProductsByCategory(selectedCategoryId);
        } else {
          // Tüm ürünleri getir
          console.log('ProductsTemplate - Tüm ürünler yükleniyor');
          productsData = await productService.getPublicProducts();
        }
        
        setProducts(productsData);
        console.log('ProductsTemplate - Yüklenen ürünler:', productsData);
      } catch (error: any) {
        console.error('ProductsTemplate - Ürünler yüklenirken hata:', error);
        setError('Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, selectedCategoryId]);

  // Kategorileri yükle
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Ürünlerden benzersiz kategorileri çıkar
        const uniqueCategories = Array.from(
          new Set(products.map(product => product.categoryName))
        ).map((name, index) => ({ id: index + 1, name }));
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    if (products.length > 0) {
      loadCategories();
    }
  }, [products]);

  // Update search params when search query changes
  const handleSearchChange = (value: string) => {
    console.log('ProductsTemplate - Arama değişti:', value);
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1); // Reset to first page on search
  };

  // Kategori değişikliği
  const handleCategoryChange = (categoryName: string | null) => {
    console.log('ProductsTemplate - Kategori değişti:', categoryName);
    setSelectedCategory(categoryName);
    
    if (categoryName) {
      // Kategori adından ID'yi bul
      const category = categories.find(cat => cat.name === categoryName);
      if (category) {
        setSelectedCategoryId(category.id);
      }
    } else {
      setSelectedCategoryId(null);
    }
    
    setCurrentPage(1); // Reset to first page on category change
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply sorting
    switch (sortBy) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, sortBy]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ürünlerimiz</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Kaliteli kırtasiye ürünleri uygun fiyatlarla burada
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto hide-scrollbar">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Kategoriler
                  </label>
                  <CategoryCombobox
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Search and Sort */}
              <div className="sticky top-20 z-10 bg-white/50 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-white/10">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300"
                    />
                  </div>
                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Ürünler yükleniyor...</p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="text-center py-12">
                  <Package2 className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Hata Oluştu</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Tekrar Dene
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {!isLoading && !error && currentProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onQuickView={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}

              {/* No Products State */}
              {!isLoading && !error && currentProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package2 className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Ürün Bulunamadı</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir arama yapmayı deneyin.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!isLoading && !error && totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'px-4 py-2 rounded-md transition-all duration-300',
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

interface ProductCardProps {
  product: ProductListDto;
  onQuickView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <Link to={`/products/${product.id}`} className="block w-full group">
      <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
        {/* Image Container */}
        <div className="relative h-[320px] overflow-hidden bg-accent/10">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

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
        <div className="p-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-border/30">
          <div className="space-y-2">
            <span className="text-sm font-medium text-primary/90">
              {product.categoryName}
            </span>
            <h3 className="text-lg font-semibold text-foreground leading-snug tracking-tight line-clamp-2">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-foreground">
              ₺{product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}; 