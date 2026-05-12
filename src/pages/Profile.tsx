import { User } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { Wallet, Globe, Calendar, Moon, ShieldCheck, Download, Trash2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import React from 'react';

interface ProfileProps {
  user: User;
  updateSettings: (settings: Partial<User>) => void;
  wipeData: () => void;
}

export default function Profile({ user, updateSettings, wipeData }: ProfileProps) {
  const handleWipe = () => {
    if (confirm('Are you SURE you want to wipe all your data? This cannot be undone.')) {
      wipeData();
      toast.error('All data has been cleared');
    }
  };

  const handleUpdateBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      updateSettings({ monthlyBudget: val });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-12">
        <h2 className="text-3xl font-black text-on-surface">Account Settings</h2>
        <p className="text-on-surface-variant font-medium">Manage your profile, budget, and application preferences.</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-3xl card-shadow border border-outline-variant/30 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-on-primary text-4xl font-black mb-6 shadow-xl shadow-primary/20">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-2xl font-black">{user.name}</h3>
            <p className="text-sm font-medium text-outline mt-1">{user.email}</p>

            <div className="grid grid-cols-2 w-full gap-4 mt-8">
               <div className="bg-surface-container-low p-4 rounded-2xl text-center">
                  <span className="block text-[10px] font-bold text-outline uppercase tracking-wider">Total Spent</span>
                  <span className="block text-sm font-bold text-primary mt-1">{formatCurrency(user.totalSpent)}</span>
               </div>
               <div className="bg-surface-container-low p-4 rounded-2xl text-center">
                  <span className="block text-[10px] font-bold text-outline uppercase tracking-wider">Expenses</span>
                  <span className="block text-sm font-bold text-primary mt-1">{user.transactionCount}</span>
               </div>
            </div>

            <button className="w-full mt-8 py-3 px-6 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all active:scale-95">
              Edit Public Profile
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl card-shadow border border-outline-variant/30">
            <h4 className="text-lg font-bold mb-6">Financial Health</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-on-surface-variant">Monthly Budget</span>
                  <span className="font-black text-primary">{formatCurrency(user.monthlyBudget)}</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-1000" 
                    style={{ width: `${Math.min((user.totalSpent / user.monthlyBudget) * 100, 100)}%` }} 
                  />
                </div>
                <p className="text-[10px] font-bold text-outline mt-3 uppercase tracking-wider capitalize">
                  You have {formatCurrency(Math.max(user.monthlyBudget - user.totalSpent, 0))} remaining for April.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Preferences */}
          <div className="bg-white rounded-3xl card-shadow border border-outline-variant/30 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10">
              <h4 className="text-lg font-bold">Preferences</h4>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Monthly Budget</p>
                    <p className="text-xs font-medium text-outline">Total limit for all expenses</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black opacity-50">₹</span>
                  <input 
                    type="number"
                    value={user.monthlyBudget}
                    onChange={handleUpdateBudget}
                    className="w-24 bg-surface-container rounded-xl border border-outline-variant/50 px-4 py-2 font-bold text-right outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between opacity-50">
                <div className="flex gap-4 items-center">
                  <div className="bg-surface-container p-3 rounded-2xl text-outline">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Currency</p>
                    <p className="text-xs font-medium text-outline">Locked to your primary region</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-surface-container rounded-xl text-sm font-bold">₹ INR</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Date Format</p>
                    <p className="text-xs font-medium text-outline">DD/MM/YYYY vs MM/DD/YYYY</p>
                  </div>
                </div>
                <div className="flex bg-surface-container p-1 rounded-xl">
                    <button className="px-4 py-1.5 bg-white text-primary rounded-lg text-[10px] font-black shadow-sm tracking-widest uppercase">DD/MM/YY</button>
                    <button className="px-4 py-1.5 text-outline rounded-lg text-[10px] font-bold tracking-widest uppercase">MM/DD/YY</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Moon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Dark Mode</p>
                    <p className="text-xs font-medium text-outline">Switch to night-friendly interface</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.darkMode}
                    onChange={(e) => updateSettings({ darkMode: e.target.checked })}
                  />
                  <div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl card-shadow border border-outline-variant/30 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10">
              <h4 className="text-lg font-bold">Account Security</h4>
            </div>
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">New Password</label>
                    <input type="password" placeholder="Min 8 characters" className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm" />
                  </div>
               </div>
               <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => toast.success('Password updated successfully')}
                    className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all"
                  >
                    Update Password
                  </button>
               </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-3xl card-shadow border border-outline-variant/30 overflow-hidden">
             <div className="p-6 border-b border-outline-variant/10">
                <h4 className="text-lg font-bold">Data Management</h4>
             </div>
             <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all group">
                   <div>
                      <p className="font-bold">Export Transactions</p>
                      <p className="text-xs font-medium text-outline mt-1">Download your full history as CSV for Excel/Numbers</p>
                   </div>
                   <button className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 px-4 py-2.5 rounded-xl hover:bg-primary/20 transition-all active:scale-95">
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                   </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-error-container/5 rounded-2xl border border-error/5 hover:border-error/20 transition-all">
                   <div>
                      <p className="font-bold text-error">Clear All Data</p>
                      <p className="text-xs font-medium text-outline mt-1">Permanently delete all transaction history</p>
                   </div>
                   <button 
                    onClick={handleWipe}
                    className="text-error font-bold text-xs border border-error/30 px-6 py-2.5 rounded-xl hover:bg-error hover:text-white transition-all active:scale-95"
                   >
                      Wipe Account
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
