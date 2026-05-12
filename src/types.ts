export type CategoryId = 'food' | 'housing' | 'transport' | 'entertainment' | 'shopping' | 'bills' | 'other';

export interface Transaction {
  id: string;
  amount: number;
  category: CategoryId;
  merchant: string;
  date: string;
  time: string;
  note?: string;
  status: 'settled' | 'pending';
  type: 'expense' | 'income';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  totalSpent: number;
  transactionCount: number;
  monthlyBudget: number;
  currency: string;
  dateFormat: string;
  darkMode: boolean;
  joinedAt: string;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newThisMonth: number;
  uptime: string;
}
