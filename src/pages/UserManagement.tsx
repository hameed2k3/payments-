import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowLeft, ChevronRight, UserPlus, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const MOCK_USERS = [
  { id: '1', name: 'Alisha Sharma', email: 'alisha@gmail.com', role: 'User', spent: 12450, joined: '12 Oct 2023', status: 'Active' },
  { id: '2', name: 'Varun Verma', email: 'varun.v@outlook.com', role: 'User', spent: 8900, joined: '10 Oct 2023', status: 'Pending' },
  { id: '3', name: 'Nisha Gupta', email: 'nisha.g@example.com', role: 'User', spent: 45000, joined: '05 Oct 2023', status: 'Active' },
  { id: '4', name: 'Rohan Mehta', email: 'rohan.m@gmail.com', role: 'Premium', spent: 125000, joined: '01 Oct 2023', status: 'Active' },
  { id: '5', name: 'Siddharth Rao', email: 'sid.r@example.com', role: 'User', spent: 4200, joined: '28 Sep 2023', status: 'Banned' },
  { id: '6', name: 'Ananya Iyer', email: 'ananya.iyer@gmail.com', role: 'Premium', spent: 56000, joined: '15 Sep 2023', status: 'Active' },
];

export default function UserManagement() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-outline-variant/30 card-shadow">
          <div className="flex items-center gap-6">
             <div className="relative w-72">
               <input 
                type="text" 
                placeholder="Search users..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-10 py-2.5 outline-none focus:border-primary text-sm font-medium"
               />
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
             </div>
             <button className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container transition-all">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
             </button>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 bg-primary/10 text-primary px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-primary/20 transition-all active:scale-95">
                <FileText className="w-4 h-4" />
                <span>Export Directory</span>
             </button>
             <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
                <UserPlus className="w-4 h-4" />
                <span>Add New Member</span>
             </button>
          </div>
      </div>

      <div className="bg-white rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                  <th className="px-8 py-5 text-[10px] font-black text-outline uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Joined On</th>
                  <th className="px-8 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Revenue</th>
                  <th className="px-8 py-5"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
               {filtered.map((user) => (
                 <tr key={user.id} className="group hover:bg-surface-container-low/30 transition-all">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary-container/50 text-secondary font-black flex items-center justify-center text-xs">
                             {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                             <p className="font-bold text-sm">{user.name}</p>
                             <p className="text-[10px] font-medium text-on-surface-variant">{user.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-xs font-bold px-3 py-1 bg-surface-container rounded-lg">{user.role}</span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">
                       {user.joined}
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                         "text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest",
                         user.status === 'Active' ? 'bg-primary/10 text-primary' : 
                         user.status === 'Pending' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' : 
                         'bg-error/10 text-error'
                       )}>
                          {user.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-sm font-bold">₹{user.spent.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2">
                          <Link to={`/admin/users/${user.id}`} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                             <ChevronRight className="w-5 h-5" />
                          </Link>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
         {filtered.length === 0 && (
           <div className="py-20 text-center">
              <p className="text-on-surface-variant font-medium">No users found in directory.</p>
           </div>
         )}
      </div>

      <div className="flex justify-between items-center py-4">
         <p className="text-xs font-medium text-on-surface-variant opacity-60">Showing {filtered.length} of {MOCK_USERS.length} total members</p>
         <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold disabled:opacity-30" disabled>Previous</button>
            <button className="px-4 py-2 border border-outline-variant bg-primary text-on-primary rounded-xl text-xs font-bold">1</button>
            <button className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold">2</button>
            <button className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold">Next</button>
         </div>
      </div>
    </div>
  );
}
