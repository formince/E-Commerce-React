import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { authService } from '../../../services/authService';
import { API_BASE_URL } from '../../../config/api';

export const AdminLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    // Eğer zaten authenticate edilmişse dashboard'a yönlendir
    if (authService.isAuthenticated()) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) {
      return;
    }

    setError('');

    // Form validasyonu
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      const token = await authService.login(formData);
      
      // Hard redirect - React Router kullanmak yerine
      window.location.href = '/admin/dashboard';
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black dark:text-white">Admin Girişi</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Devam etmek için giriş yapın</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">API: {API_BASE_URL}</p>
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-800 text-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-black dark:text-white">
                Kullanıcı Adı
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  setError('');
                }}
                placeholder="Kullanıcı adınızı girin"
                required
                className="w-full"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
                Şifre
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setError('');
                }}
                placeholder="••••••••"
                required
                className="w-full"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
              onClick={handleButtonClick}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Giriş Yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 