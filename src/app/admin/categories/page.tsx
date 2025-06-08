import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { categoryService } from '../../../services/categoryService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';

interface Category {
  id: number;
  name: string;
}

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    type: 'create' | 'edit';
    category?: Category;
  }>({ open: false, type: 'create' });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; categoryId: number | null }>({
    open: false,
    categoryId: null,
  });
  const [formData, setFormData] = useState({ name: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      loadCategories();
      return;
    }
    
    try {
      const results = await categoryService.searchCategories(value);
      setCategories(results);
    } catch (error) {
      console.error('Arama yapılırken hata oluştu:', error);
    }
  };

  const handleOpenForm = (type: 'create' | 'edit', category?: Category) => {
    setFormData({ name: category?.name || '' });
    setFormError('');
    setFormDialog({ open: true, type, category });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setFormError('Kategori adı zorunludur');
      return;
    }

    setIsSubmitting(true);
    try {
      if (formDialog.type === 'create') {
        await categoryService.createCategory(formData);
      } else if (formDialog.category) {
        await categoryService.updateCategory(formDialog.category.id, formData);
      }
      loadCategories();
      setFormDialog({ open: false, type: 'create' });
    } catch (error) {
      console.error('Kategori kaydedilirken hata oluştu:', error);
      setFormError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.categoryId) return;

    try {
      await categoryService.deleteCategory(deleteDialog.categoryId);
      setDeleteDialog({ open: false, categoryId: null });
      loadCategories();
    } catch (error) {
      console.error('Kategori silinirken hata oluştu:', error);
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
          <h2 className="text-3xl font-bold tracking-tight">Kategoriler</h2>
          <p className="text-muted-foreground">
            Ürün kategorilerini yönetin
          </p>
        </div>
        <Button onClick={() => handleOpenForm('create')}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Kategori
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Kategori ara..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Kategori Adı</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4 text-muted-foreground">#{category.id}</td>
                  <td className="p-4">
                    <p className="font-medium text-card-foreground">{category.name}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenForm('edit', category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, categoryId: category.id })}
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

      {/* Form Dialog */}
      <Dialog open={formDialog.open} onOpenChange={(open) => !isSubmitting && setFormDialog({ open, type: 'create' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formDialog.type === 'create' ? 'Yeni Kategori' : 'Kategori Düzenle'}
            </DialogTitle>
            <DialogDescription>
              {formDialog.type === 'create' 
                ? 'Yeni bir kategori eklemek için aşağıdaki formu doldurun.'
                : 'Kategori bilgilerini güncellemek için formu düzenleyin.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Kategori Adı
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ name: e.target.value });
                  setFormError('');
                }}
                placeholder="Örn: Kalemler"
              />
              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormDialog({ open: false, type: 'create' })}
              disabled={isSubmitting}
            >
              İptal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Kaydediliyor...
                </div>
              ) : (
                'Kaydet'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, categoryId: null })}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <DialogTitle>Kategori Sil</DialogTitle>
                <DialogDescription>
                  Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, categoryId: null })}
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