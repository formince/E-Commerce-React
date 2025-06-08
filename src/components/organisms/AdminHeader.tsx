import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const AdminHeader: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Page Title */}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Hoş Geldiniz
          </h2>
          <p className="text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            {user?.email.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}; 