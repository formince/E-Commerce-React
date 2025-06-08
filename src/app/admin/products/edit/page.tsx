import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '../../../../components/organisms/ProductForm';
import { Button } from '../../../../components/ui/button';
import { productService } from '../../../../services/productService';

export const EditProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        const data = await productService.getProduct(parseInt(id));
        if (!data) {
          setError('Ürün bulunamadı');
          return;
        }
        setProduct(data);
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu');
      }
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (!id) return;
      await productService.updateProduct(parseInt(id), data);
      navigate('/admin/products');
    } catch (error) {
      console.error('Ürün güncellenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-destructive mb-4">{error}</p>
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          Ürünler Sayfasına Dön
        </Button>
      </div>
    );
  }

  if (!product) {
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
          <div className="flex items-center gap-4 mb-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin/products')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Ürün Düzenle</h2>
          </div>
          <p className="text-muted-foreground ml-14">
            Ürün bilgilerini güncellemek için formu düzenleyin
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6">
        <ProductForm 
          initialData={product}
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}; 