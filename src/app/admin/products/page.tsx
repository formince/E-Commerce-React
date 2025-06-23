import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { productService } from '../../../services/productService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';

export const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; productId: number | null }>({
    open: false,
    productId: null,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      loadProducts();
      return;
    }
    
    try {
      const results = await productService.searchProducts(value);
      setProducts(results);
    } catch (error) {
      console.error('Arama yapılırken hata oluştu:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.productId) return;

    try {
      await productService.deleteProduct(deleteDialog.productId);
      setDeleteDialog({ open: false, productId: null });
      loadProducts();
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error);
    }
  };

  const handleStatusToggle = async (id: number) => {
    try {
      await productService.toggleProductStatus(id);
      loadProducts();
    } catch (error) {
      console.error('Ürün durumu değiştirilirken hata oluştu:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ürünler</h2>
          <p className="text-muted-foreground">
            Ürünlerinizi yönetin ve düzenleyin
          </p>
        </div>
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Ürün
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrele
        </Button>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ürün</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Kategori</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fiyat</th>
                {/* <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stok</th> */}
                {/* stok bilgisi gizlendi şu anda */}
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Durum</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-card-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">#{product.id}</p>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.categoryName}</td>
                  <td className="p-4 text-muted-foreground">
                       
                    {product.price.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    })}

                  </td>
                 {/* <td className="p-4 text-muted-foreground">{product.stock}</td> */}   {/* stock kısmı yok şu anda */}
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(product.id)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                      }`}
                    >
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, productId: product.id })}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, productId: null })}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <DialogTitle>Ürünü Sil</DialogTitle>
                <DialogDescription>
                  Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, productId: null })}
            >
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 