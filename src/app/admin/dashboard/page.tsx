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
    <div className="w-full min-h-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Mağazanızın genel durumuna genel bir bakış
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold text-black dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 text-blue-600 dark:text-blue-400">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-1">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="ml-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">son 30 gün</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">Son Aktiviteler</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">Henüz aktivite bulunmuyor.</p>
        </div>
      </div>
    </div>
  );
}; 