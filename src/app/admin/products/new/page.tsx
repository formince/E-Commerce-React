import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { ProductForm } from '../../../../components/organisms/ProductForm';
import { Button } from '../../../../components/ui/button';
import { productService } from '../../../../services/productService';

interface ErrorState {
  message: string;
  details?: string;
  type: 'error' | 'success';
}

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Gönderilen veri:', data);
      
      const newProduct = await productService.createProduct(data);
      console.log('Yeni ürün başarıyla oluşturuldu:', newProduct);
      
      // Başarı mesajı göster
      setError({
        message: 'Ürün başarıyla eklendi!',
        type: 'success'
      });
      
      // 2 saniye sonra ürünler sayfasına yönlendir
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
      
    } catch (error: any) {
      console.error('Ürün eklenirken hata oluştu:', error);
      
      let errorMessage = 'Ürün eklenirken beklenmeyen bir hata oluştu.';
      let errorDetails = '';
      
      if (error.response) {
        // API'den gelen hata
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
          case 400:
            errorMessage = 'Form verilerinde hata var.';
            if (data.errors) {
              errorDetails = Object.values(data.errors).flat().join(', ');
            } else if (data.message) {
              errorDetails = data.message;
            }
            break;
          case 401:
            errorMessage = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
            break;
          case 403:
            errorMessage = 'Bu işlem için yetkiniz bulunmuyor.';
            break;
          case 404:
            errorMessage = 'İstenen kaynak bulunamadı.';
            break;
          case 409:
            errorMessage = 'Bu ürün adı zaten kullanılıyor.';
            break;
          case 422:
            errorMessage = 'Gönderilen veriler geçersiz.';
            if (data.errors) {
              errorDetails = Object.values(data.errors).flat().join(', ');
            }
            break;
          case 500:
            errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
            break;
          default:
            errorMessage = data.message || `HTTP ${status} hatası oluştu.`;
        }
      } else if (error.request) {
        // Network hatası
        errorMessage = 'Sunucuya bağlanılamıyor.';
        errorDetails = 'Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';
      } else if (error.message) {
        // Diğer hatalar
        errorMessage = error.message;
      }
      
      setError({
        message: errorMessage,
        details: errorDetails,
        type: 'error'
      });
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

      {/* Hata/Success Mesajı */}
      {error && (
        <div className={`rounded-lg border p-4 ${
          error.type === 'error' 
            ? 'border-destructive/50 bg-destructive/10' 
            : 'border-green-500/50 bg-green-500/10'
        }`}>
          <div className="flex items-start gap-3">
            {error.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${
                error.type === 'error' ? 'text-destructive' : 'text-green-600'
              }`}>
                {error.message}
              </p>
              {error.details && (
                <p className="text-sm text-muted-foreground mt-1">
                  {error.details}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

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