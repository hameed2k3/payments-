import { ShoppingBag, Utensils, Home, Car, Film, Receipt, MoreHorizontal, TrendingUp, Wallet } from 'lucide-react';
import { Transaction, User } from '../types';
import { CATEGORIES } from '../constants';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';

interface DashboardProps {
  transactions: Transaction[];
  user: User;
}

export default function Dashboard({ transactions, user }: DashboardProps) {
  const recentTransactions = transactions.slice(0, 5);

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

  const chartData = [
    { name: 'Day 1', value: 400 },
    { name: 'Day 2', value: 300 },
    { name: 'Day 3', value: 200 },
    { name: 'Day 4', value: 500 },
    { name: 'Day 5', value: 600 },
    { name: 'Day 6', value: 400 },
    { name: 'Day 7', value: 700 },
  ];

  const categoryTotals = CATEGORIES.map(cat => ({
    ...cat,
    amount: transactions
      .filter(t => t.category === cat.id)
      .reduce((acc, curr) => acc + curr.amount, 0)
  })).sort((a, b) => b.amount - a.amount);

  const totalSpent = user.totalSpent;
  const budgetProgress = Math.min((totalSpent / user.monthlyBudget) * 100, 100);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-on-surface">Good morning, {user.name.split(' ')[0]} 👋</h2>
        <p className="text-on-surface-variant font-medium">Wednesday, {formatDate(new Date().toISOString())}</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Card */}
        <div className="col-span-12 lg:col-span-8 bg-primary p-12 rounded-3xl text-on-primary card-shadow relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Available Balance</p>
                <h3 className="text-6xl font-black mt-2">{formatCurrency(user.monthlyBudget - totalSpent)}</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <Wallet className="w-10 h-10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Monthly Income</p>
                <p className="text-2xl font-bold mt-1">₹85,000</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Monthly Spends</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalSpent)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-wide">
                <span>Monthly Budget Progress</span>
                <span>{budgetProgress.toFixed(1)}% used</span>
              </div>
              <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary-container transition-all duration-1000 ease-out rounded-full" 
                  style={{ width: `${budgetProgress}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="absolute -right-12 -bottom-12 opacity-10 rotate-12 transition-transform duration-500 group-hover:scale-110">
            <TrendingUp className="w-80 h-80" />
          </div>
        </div>

        {/* Trend Card */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold">Spending Trend</h4>
            <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-1 rounded-full">+12% vs last week</span>
          </div>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-on-surface text-white px-3 py-1 rounded-lg text-xs font-bold">
                          ₹{payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#00694c' : '#a0f3d4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Link 
            to="/analytics"
            className="w-full mt-6 py-3 font-bold text-sm text-primary border border-primary rounded-xl hover:bg-primary/5 transition-colors text-center"
          >
            View Detailed Report
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold">Recent Spends</h4>
            <Link to="/history" className="text-xs font-bold text-primary hover:underline">View All</Link>
          </div>
          
          <div className="space-y-6">
            {recentTransactions.map((t) => {
              const Icon = getCategoryIcon(t.category);
              const category = CATEGORIES.find(c => c.id === t.category);
              return (
                <div key={t.id} className="flex items-center gap-4 group">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm truncate">{t.merchant}</p>
                    <p className="text-xs text-on-surface-variant font-medium">{t.time} • {category?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-error">-{formatCurrency(t.amount)}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{t.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Summary */}
        <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <h4 className="text-xl font-bold mb-8">Top Categories</h4>
          <div className="space-y-8">
            {categoryTotals.slice(0, 4).map((cat) => {
              const percentage = Math.min((cat.amount / totalSpent) * 100, 100);
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </span>
                    <span className="text-on-surface-variant">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full" 
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: cat.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
