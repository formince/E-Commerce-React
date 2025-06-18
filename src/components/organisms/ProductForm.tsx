import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CategoryCombobox } from '../molecules/CategoryCombobox';
import { categoryService } from '../../services/categoryService';

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: number;
  price: number;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ProductFormData>(initialData || {
    name: '',
    description: '',
    imageUrl: '',
    stockQuantity: 1,
    categoryId: 0,
    price: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  // Kategorileri API'den yükle
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
        
        // Eğer initial data varsa, kategori adını bul
        if (initialData?.categoryId) {
          const category = categoriesData.find(cat => cat.id === initialData.categoryId);
          if (category) {
            setSelectedCategoryName(category.name);
          }
        }
      } catch (error) {
        console.error('Kategoriler yüklenirken hata oluştu:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name) newErrors.name = 'Ürün adı zorunludur';
    if (!formData.description) newErrors.description = 'Ürün açıklaması zorunludur';
    if (!formData.imageUrl) newErrors.imageUrl = 'Görsel URL zorunludur';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stok miktarı 0\'dan küçük olamaz';
    if (!formData.categoryId) newErrors.categoryId = 'Kategori seçimi zorunludur';
    if (formData.price <= 0) newErrors.price = 'Fiyat 0\'dan büyük olmalıdır';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('ProductForm - Form verileri:', formData);
      console.log('ProductForm - Seçilen kategori ID:', formData.categoryId);
      console.log('ProductForm - Seçilen kategori adı:', selectedCategoryName);
      onSubmit(formData);
    } else {
      console.log('ProductForm - Form validasyonu başarısız:', errors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stockQuantity' || name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    
    if (categoryName) {
      const category = categories.find(cat => cat.name === categoryName);
      if (category) {
        setFormData(prev => ({
          ...prev,
          categoryId: category.id
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        categoryId: 0
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Ürün Adı */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
            Ürün Adı
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Faber Castell Kurşun Kalem"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Ürün Görseli URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-card-foreground mb-1">
            Görsel URL
          </label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-destructive">{errors.imageUrl}</p>
          )}
        </div>

        {/* Ürün Açıklaması */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-1">
            Ürün Açıklaması
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ürün özellikleri ve detayları..."
            rows={4}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1">
            Kategori
          </label>
          {isLoadingCategories ? (
            <div className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              Kategoriler yükleniyor...
            </div>
          ) : (
            <CategoryCombobox
              categories={categories}
              selectedCategory={selectedCategoryName}
              onCategoryChange={handleCategoryChange}
              placeholder="Kategori Seçin"
            />
          )}
          {errors.categoryId && (
            <p className="mt-1 text-sm text-destructive">{errors.categoryId}</p>
          )}
        </div>

        {/* Stok Miktarı */}
        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-card-foreground mb-1">
            Stok Miktarı
          </label>
          <Input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            min={0}
          />
          {errors.stockQuantity && (
            <p className="mt-1 text-sm text-destructive">{errors.stockQuantity}</p>
          )}
        </div>

        {/* Fiyat */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-card-foreground mb-1">
            Fiyat (₺)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            min={0}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-destructive">{errors.price}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          İptal
        </Button>
        <Button type="submit" disabled={isLoading || isLoadingCategories}>
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Kaydediliyor...
            </div>
          ) : (
            'Kaydet'
          )}
        </Button>
      </div>
    </form>
  );
}; 