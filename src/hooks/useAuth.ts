import { useState } from 'react';
import { authService } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    username: string;
    role: string;
  } | null;
}

export const useAuth = () => {
  // Lazy initial state - sadece ilk render'da localStorage kontrol et
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('admin_token');
    const isAuth = !!token;
    
    return {
      isAuthenticated: isAuth,
      isLoading: false,
      user: isAuth ? { username: 'admin', role: 'admin' } : null,
    };
  });

  const login = async (username: string, password: string) => {
    try {
      const token = await authService.login({ username, password });
      
      // State'i güncelle
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: { username, role: 'admin' },
      });
      
      return token;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}; 