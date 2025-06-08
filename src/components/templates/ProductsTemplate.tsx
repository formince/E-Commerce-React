import React, { useState, useMemo } from 'react';
import { mockProducts } from '../../data/mockProducts';
import { Product } from '../../types/product';
import { cn } from '../../lib/utils';
import { SortSelect } from '../molecules/SortSelect';
import { QuickViewModal } from '../molecules/QuickViewModal';
import { Package2, ShoppingCart, Search, Eye, ArrowUpRight } from 'lucide-react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { CategoryCombobox } from '../molecules/CategoryCombobox';
import { Link, useSearchParams } from 'react-router-dom';

export const ProductsTemplate: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsPerPage = 8;

  // Update search params when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [mockProducts, selectedCategory, searchQuery, sortBy]);

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
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
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

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onQuickView={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package2 className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Ürün Bulunamadı</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir arama yapmayı deneyin.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
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
  product: Product;
  onQuickView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <Link to={`/products/${product.id}`} className="block w-full group">
      <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

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
              <span className="text-sm font-medium text-primary/90">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-white leading-snug tracking-tight line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-zinc-200 line-clamp-2 tracking-tight">
                {product.description}
              </p>
            </div>
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-white/10",
                "backdrop-blur-md",
                "group-hover:bg-white/20",
                "transition-colors duration-300"
              )}
            >
              <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 