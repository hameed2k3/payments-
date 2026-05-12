import { useState, useEffect } from 'react';
import { Transaction, User, SystemStats } from '@/src/types';
import { CATEGORIES } from '@/src/constants';

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 320,
    category: 'food',
    merchant: 'Starbucks Coffee',
    date: '2023-10-25',
    time: '08:45 AM',
    status: 'settled',
    type: 'expense'
  },
  {
    id: '2',
    amount: 450,
    category: 'transport',
    merchant: 'Uber Ride',
    date: '2023-10-25',
    time: '10:15 AM',
    status: 'settled',
    type: 'expense'
  },
  {
    id: '3',
    amount: 470,
    category: 'bills',
    merchant: 'BigBasket Order',
    date: '2023-10-25',
    time: '11:30 AM',
    status: 'settled',
    type: 'expense'
  },
  {
    id: '4',
    amount: 18200,
    category: 'housing',
    merchant: 'Monthly Rent',
    date: '2023-10-01',
    time: '12:00 PM',
    status: 'settled',
    type: 'expense'
  },
  {
    id: '5',
    amount: 4250,
    category: 'food',
    merchant: 'Groceries - Zepto',
    date: '2023-10-12',
    time: '04:00 PM',
    status: 'settled',
    type: 'expense'
  }
];

const SEED_USER: User = {
  id: 'usr_1',
  name: 'Jayesh Deshmukh',
  email: 'jayesh.d@example.com',
  role: 'admin',
  totalSpent: 42850,
  transactionCount: 124,
  monthlyBudget: 50000,
  currency: 'INR',
  dateFormat: 'DD/MM/YY',
  darkMode: false,
  joinedAt: '2023-01-12'
};

export function useAppData() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('moneylog_transactions');
    return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('moneylog_user');
    return saved ? JSON.parse(saved) : SEED_USER;
  });

  const [systemStats] = useState<SystemStats>({
    totalUsers: 12842,
    activeUsers: 8921,
    inactiveUsers: 3921,
    newThisMonth: 1204,
    uptime: '99.9%'
  });

  useEffect(() => {
    localStorage.setItem('moneylog_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('moneylog_user', JSON.stringify(user));
  }, [user]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'status'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      status: 'settled'
    };
    setTransactions([newTransaction, ...transactions]);
    
    if (t.type === 'expense') {
      setUser(prev => ({
        ...prev,
        totalSpent: prev.totalSpent + t.amount,
        transactionCount: prev.transactionCount + 1
      }));
    }
  };

  const deleteTransaction = (id: string) => {
    const t = transactions.find(tx => tx.id === id);
    if (!t) return;
    setTransactions(transactions.filter(tx => tx.id !== id));
    if (t.type === 'expense') {
      setUser(prev => ({
        ...prev,
        totalSpent: prev.totalSpent - t.amount,
        transactionCount: prev.transactionCount - 1
      }));
    }
  };

  const updateSettings = (settings: Partial<User>) => {
    setUser(prev => ({ ...prev, ...settings }));
  };

  const wipeData = () => {
    setTransactions([]);
    setUser(prev => ({ ...prev, totalSpent: 0, transactionCount: 0 }));
  };

  return {
    transactions,
    user,
    systemStats,
    addTransaction,
    deleteTransaction,
    updateSettings,
    wipeData
  };
}
