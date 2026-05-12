import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
  onAddExpense: () => void;
  isAdmin?: boolean;
}

export default function Layout({ children, onAddExpense, isAdmin }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar onAddExpense={onAddExpense} isAdmin={isAdmin} />
      <TopBar />
      <main className="ml-[240px] pt-20 h-screen overflow-y-auto hide-scrollbar scroll-smooth">
        <div className="max-w-[1200px] mx-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
