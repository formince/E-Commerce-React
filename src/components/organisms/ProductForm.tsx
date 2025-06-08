import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ProductFormData {
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: number;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

const categories = [
  { id: 1, name: 'Kalemler' },
  { id: 2, name: 'Defterler' },
  { id: 3, name: 'Dosyalar' },
  { id: 4, name: 'Boyalar' },
];

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
    categoryId: 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name) newErrors.name = 'Ürün adı zorunludur';
    if (!formData.description) newErrors.description = 'Ürün açıklaması zorunludur';
    if (!formData.imageUrl) newErrors.imageUrl = 'Görsel URL zorunludur';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stok miktarı 0\'dan küçük olamaz';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stockQuantity' ? parseInt(value) || 0 : value
    }));
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
          <label htmlFor="categoryId" className="block text-sm font-medium text-card-foreground mb-1">
            Kategori
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          İptal
        </Button>
        <Button type="submit" disabled={isLoading}>
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