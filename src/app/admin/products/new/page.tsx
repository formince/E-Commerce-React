import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '../../../../components/organisms/ProductForm';
import { Button } from '../../../../components/ui/button';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // API çağrısı burada yapılacak
      console.log('Yeni ürün:', data);
      
      // Başarılı olduğunda ürünler sayfasına yönlendir
      navigate('/admin/products');
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <h2 className="text-3xl font-bold tracking-tight">Yeni Ürün Ekle</h2>
          </div>
          <p className="text-muted-foreground ml-14">
            Yeni bir ürün eklemek için aşağıdaki formu doldurun
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6">
        <ProductForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}; 