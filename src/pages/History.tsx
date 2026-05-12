import { Trash2, Search, Filter, Download, Utensils, Home, Car, Film, ShoppingBag, Receipt, MoreHorizontal } from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { useState } from 'react';

interface HistoryProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function History({ transactions, onDelete }: HistoryProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = transactions.filter(t => {
    const matchesSearch = t.merchant.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'food': return Utensils;
      case 'housing': return Home;
      case 'transport': return Car;
      case 'entertainment': return Film;
      case 'shopping': return ShoppingBag;
      case 'bills': return Receipt;
      default: return MoreHorizontal;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-outline-variant rounded-2xl px-12 py-3 focus:outline-none focus:border-primary text-sm shadow-sm transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 md:flex-none bg-white border border-outline-variant rounded-2xl px-6 py-3 font-bold text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer shadow-sm"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="p-3 bg-white border border-outline-variant rounded-2xl hover:bg-surface-container transition-colors shadow-sm">
            <Download className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/50">
          <h3 className="font-bold">Transaction History</h3>
          <span className="text-xs font-bold text-outline uppercase tracking-widest">{filtered.length} Items</span>
        </div>

        <div className="divide-y divide-outline-variant/10">
          {filtered.length > 0 ? (
            filtered.map((t) => {
              const Icon = getCategoryIcon(t.category);
              const category = CATEGORIES.find(c => c.id === t.category);
              return (
                <div key={t.id} className="p-6 flex items-center gap-6 hover:bg-surface-container-low/30 transition-colors group">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{t.merchant}</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {formatDate(t.date)} • {category?.name}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <div>
                      <p className={cn("font-bold text-sm", t.type === 'expense' ? 'text-error' : 'text-primary')}>
                        {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 bg-primary-container/10 text-primary font-bold rounded-full uppercase tracking-wider">
                        {t.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => onDelete(t.id)}
                      className="p-2 text-on-surface-variant opacity-0 md:group-hover:opacity-100 hover:text-error hover:bg-error-container/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center">
              <p className="text-on-surface-variant font-medium">No transactions found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
