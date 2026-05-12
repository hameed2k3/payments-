import { Search, Bell, HelpCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  const getTitle = () => {
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/history') return 'Transaction History';
    if (path === '/analytics') return 'Monthly Analytics';
    if (path === '/profile') return 'Account Settings';
    if (path === '/admin') return 'Admin Dashboard';
    if (path.startsWith('/admin/users')) return 'User Management';
    return 'MoneyLog';
  };

  return (
    <header className="fixed top-0 right-0 h-20 w-[calc(100%-240px)] bg-background/80 backdrop-blur-md flex justify-between items-center px-8 z-40 border-b border-outline-variant/30">
      <h2 className="text-xl font-bold text-on-surface">{getTitle()}</h2>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search records..."
            className="bg-surface-container-low border border-outline-variant rounded-full px-12 py-2.5 w-72 focus:outline-none focus:border-primary text-sm transition-all focus:w-80"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <Link to="/profile" className="flex items-center gap-3 ml-2 group">
             <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold border-2 border-primary-fixed shadow-sm group-hover:scale-105 transition-transform">
                JD
              </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Need to import Link
import { Link } from 'react-router-dom';
