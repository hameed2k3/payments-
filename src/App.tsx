import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppData } from './lib/useAppData';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import UserDetail from './pages/UserDetail';
import AddExpenseModal from './components/AddExpenseModal';
import { Toaster, toast } from 'sonner';

export default function App() {
  const { transactions, user, systemStats, addTransaction, deleteTransaction, updateSettings, wipeData } = useAppData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simple mock auth

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout onAddExpense={() => setIsAddModalOpen(true)} isAdmin={user.role === 'admin'}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard transactions={transactions} user={user} />} />
          <Route path="/history" element={<History transactions={transactions} onDelete={deleteTransaction} />} />
          <Route path="/analytics" element={<Analytics transactions={transactions} />} />
          <Route path="/profile" element={<Profile user={user} updateSettings={updateSettings} wipeData={wipeData} />} />
          
          {user.role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminDashboard stats={systemStats} />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/:id" element={<UserDetail />} />
            </>
          )}

          <Route path="/login" element={<Auth onLogin={() => setIsAuthenticated(true)} logout />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>

      {isAddModalOpen && (
        <AddExpenseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(expense) => {
            addTransaction(expense);
            toast.success('Expense added successfully');
            setIsAddModalOpen(false);
          }}
        />
      )}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
