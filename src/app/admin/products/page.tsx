import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

const mockProducts = [
  {
    id: 1,
    name: 'Faber Castell Kalem Seti',
    category: 'Kalemler',
    price: 149.99,
    stock: 50,
    status: 'active',
  },
  {
    id: 2,
    name: 'Moleskine Defter',
    category: 'Defterler',
    price: 199.99,
    stock: 30,
    status: 'active',
  },
  // Daha fazla ürün eklenebilir
];

export const AdminProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
        <Button>
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stok</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Durum</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-card-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">#{product.id}</p>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.category}</td>
                  <td className="p-4 text-muted-foreground">
                    {product.price.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    })}
                  </td>
                  <td className="p-4 text-muted-foreground">{product.stock}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 