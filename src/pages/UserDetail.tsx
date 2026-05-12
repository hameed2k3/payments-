import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, Shield, CreditCard, Ban, Trash2, CheckCircle2, History as HistoryIcon, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function UserDetail() {
  const { id } = useParams();

  // Mock data for a single user
  const user = {
    id: id || '1',
    name: 'Alisha Sharma',
    email: 'alisha@gmail.com',
    role: 'Premium',
    status: 'Active',
    joined: '12 Oct 2023',
    lastActive: '2 min ago',
    totalSpent: 12450,
    transactionCount: 42,
    avgTransaction: 296,
    region: 'Maharashtra, IN',
    compliance: 'KYC Verified'
  };

  const activity = [
    { type: 'login', date: 'Today, 04:30 PM', device: 'iPhone 13 • Mumbai, IN' },
    { type: 'transaction', date: 'Yesterday, 11:20 AM', amount: '₹1,240', merchant: 'Zomato' },
    { type: 'settings', date: '24 Oct, 09:12 AM', action: 'Support Ticket Raised' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center bg-white p-6 rounded-3xl border border-outline-variant/30 card-shadow">
          <div className="flex items-center gap-6">
             <Link to="/admin/users" className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-all">
                <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
             </Link>
             <div>
                <h3 className="text-2xl font-black">{user.name}</h3>
                <p className="text-sm font-medium text-on-surface-variant">System ID: {user.id}</p>
             </div>
          </div>
          <div className="flex gap-4">
             <button onClick={() => toast('User access has been suspended.')} className="flex items-center gap-2 bg-error-container/10 text-error px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-error/10 transition-all">
                <Ban className="w-4 h-4" />
                <span>Ban Account</span>
             </button>
             <button onClick={() => toast.success('Account privileges updated.')} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all">
                <Shield className="w-4 h-4" />
                <span>Elevate Privileges</span>
             </button>
          </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
               <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-secondary-container/50 text-secondary text-4xl font-black flex items-center justify-center mb-6">
                     {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
                     {user.role} Member
                  </span>
                  <div className="space-y-1">
                     <p className="font-bold flex items-center justify-center gap-2">
                        {user.email} <Mail className="w-3.5 h-3.5 text-outline" />
                     </p>
                     <p className="text-xs font-medium text-on-surface-variant">Last pinged {user.lastActive}</p>
                  </div>
               </div>

               <div className="mt-10 pt-10 border-t border-outline-variant/10 space-y-6">
                  <div className="flex items-center gap-4">
                     <Calendar className="w-5 h-5 text-outline" />
                     <div>
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Signed Up</p>
                        <p className="text-sm font-bold text-on-surface mt-1">{user.joined}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Shield className="w-5 h-5 text-outline" />
                     <div>
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Compliance</p>
                        <p className="text-sm font-bold text-primary mt-1 flex items-center gap-1.5">
                           <CheckCircle2 className="w-4 h-4" /> {user.compliance}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Mail className="w-5 h-5 text-outline" />
                     <div>
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-on-surface mt-1">{user.region}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                <h4 className="text-lg font-bold mb-6">Financial Overview</h4>
                <div className="space-y-8">
                   <div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Spending Profile</p>
                      <div className="flex items-baseline gap-2">
                         <h5 className="text-3xl font-black">₹{user.totalSpent.toLocaleString()}</h5>
                         <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded-full">+14% MoM</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-surface rounded-2xl">
                         <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Avg Order</p>
                         <p className="text-sm font-bold mt-1">₹{user.avgTransaction}</p>
                      </div>
                      <div className="p-4 bg-surface rounded-2xl">
                         <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Txs</p>
                         <p className="text-sm font-bold mt-1">{user.transactionCount}</p>
                      </div>
                   </div>
                   <button className="w-full flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
                      <BarChart3 className="w-4 h-4" />
                      <span>Detailed Analysis</span>
                   </button>
                </div>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-8 space-y-8">
             <div className="bg-white rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden">
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                   <h4 className="text-lg font-bold flex items-center gap-3">
                      <HistoryIcon className="w-5 h-5 text-primary" />
                      Administrative History
                   </h4>
                   <button className="text-xs font-bold text-primary hover:underline">View System Logs</button>
                </div>
                <div className="divide-y divide-outline-variant/10">
                   {activity.map((item, i) => (
                     <div key={i} className="p-6 flex gap-6 hover:bg-surface-container-low/30 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-outline group-hover:bg-primary-container/10 group-hover:text-primary transition-all">
                           {item.type === 'login' ? <Shield className="w-5 h-5" /> : 
                            item.type === 'transaction' ? <CreditCard className="w-5 h-5" /> : 
                            <HistoryIcon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <p className="font-bold text-sm">
                                 {item.type === 'login' ? 'System Login Successful' : 
                                  item.type === 'transaction' ? `New Spend: ${item.merchant}` : 
                                  item.action}
                              </p>
                              <span className="text-[10px] font-medium text-outline">{item.date}</span>
                           </div>
                           <p className="text-xs text-on-surface-variant font-medium mt-1">
                              {item.type === 'login' ? item.device : 
                               item.type === 'transaction' ? `Processed successfully for ${item.amount}` : 
                               'Changes detected in account parameters.'}
                           </p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                <h4 className="text-lg font-bold mb-8">Danger Zone</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-error-container/5 rounded-3xl border border-error/5 hover:border-error/20 transition-all flex flex-col justify-between h-48">
                      <div>
                         <p className="font-bold text-error leading-tight">Reset User Password</p>
                         <p className="text-[11px] font-medium text-outline mt-2 leading-relaxed">Sends a one-time link to {user.email} to reset their credentials.</p>
                      </div>
                      <button className="text-error font-bold text-[11px] uppercase tracking-widest border border-error/20 py-2.5 rounded-xl hover:bg-error hover:text-white transition-all">
                         Send Reset Link
                      </button>
                   </div>

                   <div className="p-6 bg-error-container/5 rounded-3xl border border-error/5 hover:border-error/20 transition-all flex flex-col justify-between h-48">
                      <div>
                         <p className="font-bold text-error leading-tight">Purge User Records</p>
                         <p className="text-[11px] font-medium text-outline mt-2 leading-relaxed">Permanently delete this member and all historical financial data.</p>
                      </div>
                      <button onClick={() => toast.error('Initiated user purge sequence.')} className="bg-error text-white font-bold text-[11px] uppercase tracking-widest py-2.5 rounded-xl shadow-lg shadow-error/20 hover:scale-105 active:scale-95 transition-all">
                         Purge User Data
                      </button>
                   </div>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
}
