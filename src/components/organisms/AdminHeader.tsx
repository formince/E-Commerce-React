import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const AdminHeader: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  console.log('AdminHeader: user data =', user);

  return (
    <header className="h-16 border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Page Title */}
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Hoş Geldiniz
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user?.username || 'Admin'}
          </p>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}; 