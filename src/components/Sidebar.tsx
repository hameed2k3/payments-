import { Link, useLocation } from 'react-router-dom';
import { Home, History, BarChart3, User, Plus, LogOut, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  onAddExpense: () => void;
  isAdmin?: boolean;
}

export default function Sidebar({ onAddExpense, isAdmin }: SidebarProps) {
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'History', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const adminItems = [
    { name: 'Admin Panel', path: '/admin', icon: Shield },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface border-r border-outline-variant flex flex-col py-8 shadow-sm z-50">
      <div className="px-6 mb-12">
        <h1 className="text-2xl font-black text-primary tracking-tight">MoneyLog</h1>
        <p className="text-[10px] font-bold text-outline uppercase tracking-widest opacity-70">Expense Tracker</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = path === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-secondary-container/30 text-primary border-l-4 border-primary" 
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-on-surface-variant group-hover:text-primary")} />
              <span className={cn("font-semibold text-sm", isActive ? "text-primary" : "text-on-surface-variant")}>{item.name}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-outline-variant/30">
            <p className="px-4 mb-2 text-[10px] font-bold text-outline uppercase tracking-widest opacity-50">Admin</p>
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  path.startsWith(item.path)
                    ? "bg-secondary-container/30 text-primary border-l-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                <item.icon className={cn("w-5 h-5", path.startsWith(item.path) ? "text-primary" : "text-on-surface-variant group-hover:text-primary")} />
                <span className={cn("font-semibold text-sm", path.startsWith(item.path) ? "text-primary" : "text-on-surface-variant")}>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <button
          onClick={onAddExpense}
          className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-primary/20 hover:bg-primary-container"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>

        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
