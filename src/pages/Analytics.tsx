import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';
import { CATEGORIES, COLORS } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import { Utensils, Home, Car, Film, ShoppingBag, Receipt, MoreHorizontal, Zap } from 'lucide-react';

interface AnalyticsProps {
  transactions: Transaction[];
}

export default function Analytics({ transactions }) {
  const categoryData = CATEGORIES.map(cat => ({
    name: cat.name,
    value: transactions
      .filter(t => t.category === cat.id && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0),
    color: cat.color
  })).filter(d => d.value > 0);

  const totalSpend = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  const dailyTrendData = [
    { name: '1 Oct', amount: 500 },
    { name: '2 Oct', amount: 1200 },
    { name: '5 Oct', amount: 3000 },
    { name: '10 Oct', amount: 800 },
    { name: '15 Oct', amount: 4500 },
    { name: '20 Oct', amount: 1500 },
    { name: '25 Oct', amount: 1240 },
  ];

  const topExpenses = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Monthly Spend', value: totalSpend, change: '↑ 12%', changeType: 'neg' },
          { label: 'Week to Date', value: 8420, change: '↓ 4%', changeType: 'pos' },
          { label: "Today's Spend", value: 1240 },
          { label: 'Avg Daily Burn', value: 1428 },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl card-shadow border border-outline-variant/30">
            <p className="text-xs font-bold text-on-surface-variant mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-on-surface">{formatCurrency(stat.value)}</h3>
              {stat.change && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.changeType === 'pos' ? "bg-primary/10 text-primary" : "bg-error/10 text-error"
                )}>
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <h4 className="text-xl font-bold mb-8">Category Split</h4>
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-x-0 bottom-0 top-[110px] m-auto flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black">100%</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Expenses</span>
            </div>
          </div>
          <div className="space-y-3">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-semibold text-on-surface-variant">{cat.name}</span>
                </div>
                <span className="text-xs font-bold">{Math.round((cat.value / totalSpend) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold">Daily Spend Trend</h4>
            <select className="bg-surface text-xs font-bold py-2 px-4 rounded-xl focus:ring-0 outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrendData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#6d7a73' }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#00694c" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <h4 className="text-xl font-bold mb-8">Top Expenses</h4>
          <div className="space-y-6">
            {topExpenses.map((t) => {
              const Icon = getCategoryIcon(t.category);
              return (
                <div key={t.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.merchant}</p>
                      <p className="text-xs text-on-surface-variant font-medium">{CATEGORIES.find(c => c.id === t.category)?.name} • {t.date}</p>
                    </div>
                  </div>
                  <span className="font-bold text-on-surface">{formatCurrency(t.amount)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <h4 className="text-xl font-bold mb-8">Comparison (vs Sep)</h4>
          <div className="space-y-8">
            {[
              { label: 'Food & Dining', val: 75, change: '+₹1,200', type: 'neg' },
              { label: 'Entertainment', val: 40, change: '-₹800', type: 'pos' },
              { label: 'Transport', val: 60, change: 'Stable', type: 'neu' },
              { label: 'Shopping', val: 85, change: '+₹3,400', type: 'neg' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface-variant">{item.label}</span>
                  <span className={cn(
                    "text-xs font-bold",
                    item.type === 'neg' ? "text-error" : item.type === 'pos' ? "text-primary" : "text-outline"
                  )}>{item.change}</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      item.type === 'neg' ? "bg-error/30" : "bg-primary/30"
                    )}
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
