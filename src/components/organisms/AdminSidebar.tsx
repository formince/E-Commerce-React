import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    title: 'Ürünler',
    icon: Package,
    href: '/admin/products',
  },
  {
    title: 'Kullanıcılar',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Ayarlar',
    icon: Settings,
    href: '/admin/settings',
  },
];

export const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-card/80 backdrop-blur-xl border-r border-border/50">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'hover:bg-primary/10',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-card-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border/50">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </aside>
  );
}; 