import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    email: string;
    role: string;
  } | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');

    if (token && user) {
      setState({
        isAuthenticated: true,
        isLoading: false,
        user: JSON.parse(user),
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Bu kısımda gerçek API çağrısı yapılacak
    // Şimdilik mock data kullanıyoruz
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = { email, role: 'admin' };
      const token = 'mock_token'; // Bu gerçek bir JWT token olacak

      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));

      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');

    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  return {
    ...state,
    login,
    logout,
  };
}; 