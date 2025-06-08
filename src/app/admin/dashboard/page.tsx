import React from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';

const stats = [
  {
    title: 'Toplam Ürün',
    value: '156',
    change: '+12%',
    icon: TrendingUp,
  },
  {
    title: 'Aktif Kullanıcılar',
    value: '1,234',
    change: '+5%',
    icon: Users,
  },
  {
    title: 'Ortalama Ürün Fiyatı',
    value: '₺250',
    change: '+2%',
    icon: DollarSign,
  },
];

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Mağazanızın genel durumuna genel bir bakış
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold text-card-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center rounded-full bg-emerald-500/10 px-2 py-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="ml-1 text-sm font-medium text-emerald-500">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">son 30 gün</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="border-b border-border/50 p-6">
          <h3 className="text-lg font-semibold">Son Aktiviteler</h3>
        </div>
        <div className="p-6">
          {/* Activity items will go here */}
          <p className="text-muted-foreground">Henüz aktivite bulunmuyor.</p>
        </div>
      </div>
    </div>
  );
}; 