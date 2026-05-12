import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../constants';
import { CategoryId } from '../types';
import React, { useState } from 'react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: { amount: number; category: CategoryId; merchant: string; date: string; time: string; type: 'expense' | 'income' }) => void;
}

export default function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'food' as CategoryId,
    merchant: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.merchant) return;

    onAdd({
      amount: parseFloat(formData.amount),
      category: formData.category,
      merchant: formData.merchant,
      date: formData.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'expense',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface p-8 rounded-3xl card-shadow border border-outline-variant"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-on-surface">Add New Expense</h3>
            <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase tracking-wider">Amount (₹)</label>
              <input
                autoFocus
                required
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full text-4xl font-bold bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all placeholder:text-outline/30"
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-primary outline-none text-sm appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">Date</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-primary outline-none text-sm appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase tracking-wider">Merchant / Description</label>
              <input
                required
                type="text"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-primary outline-none text-sm transition-all"
                placeholder="e.g. Starbucks"
              />
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-outline-variant text-on-surface-variant py-4 rounded-xl font-bold hover:bg-surface-container transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Save Expense
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
