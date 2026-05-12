import { Users, UserCheck, UserX, UserPlus, Zap, BarChart2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SystemStats } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  stats: SystemStats;
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const adminMetrics = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-primary' },
    { label: 'Active Today', value: stats.activeUsers.toLocaleString(), icon: UserCheck, color: 'text-secondary' },
    { label: 'New This Month', value: `+${stats.newThisMonth}`, icon: UserPlus, color: 'text-primary' },
    { label: 'System Uptime', value: stats.uptime, icon: Zap, color: 'text-tertiary' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminMetrics.map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl card-shadow border border-outline-variant/30 relative overflow-hidden group">
            <div className="relative z-10">
              <div className={cn("p-3 rounded-2xl bg-surface-container w-fit mb-6", m.color)}>
                <m.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-on-surface">{m.value}</h3>
              <p className="text-xs font-bold text-outline mt-1 uppercase tracking-widest">{m.label}</p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-5 transition-transform duration-500 group-hover:scale-110">
              <m.icon className="w-32 h-32" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
               <h4 className="text-xl font-bold">Recent Signups</h4>
               <p className="text-sm font-medium text-on-surface-variant">Verify and manage latest platform registrations.</p>
            </div>
            <Link to="/admin/users" className="text-xs font-bold text-primary hover:underline">View All Users</Link>
          </div>

          <div className="space-y-6">
             {[
               { id: '1', name: 'Alisha Sharma', email: 'alisha@gmail.com', date: '2 min ago', status: 'verified' },
               { id: '2', name: 'Varun Verma', email: 'varun.v@outlook.com', date: '12 min ago', status: 'pending' },
               { id: '3', name: 'Nisha Gupta', email: 'nisha.g@example.com', date: '45 min ago', status: 'verified' },
               { id: '4', name: 'Rohan Mehta', email: 'rohan.m@gmail.com', date: '1 hr ago', status: 'verified' },
             ].map((user) => (
               <div key={user.id} className="flex items-center justify-between p-4 bg-surface rounded-2xl hover:bg-surface-container-high transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center">
                        {user.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div>
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">{user.email}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                        <p className="text-xs font-bold">{user.date}</p>
                        <span className={cn(
                          "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                          user.status === 'verified' ? 'bg-primary/10 text-primary' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                        )}>
                          {user.status}
                        </span>
                     </div>
                     <Link to={`/admin/users/${user.id}`} className="p-2 bg-white rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-all text-on-surface-variant">
                        <ArrowUpRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
           <div className="bg-primary p-8 rounded-3xl text-on-primary card-shadow">
              <ShieldCheck className="w-12 h-12 mb-6 opacity-80" />
              <h4 className="text-xl font-bold">Security Audit</h4>
              <p className="text-sm text-white/70 font-medium mt-2 leading-relaxed">System scan completed 4 hours ago. No vulnerabilities detected in core financial endpoints.</p>
              <button className="w-full mt-8 py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all">
                Run Full Audit
              </button>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 card-shadow flex-1">
              <h4 className="text-lg font-bold mb-6">Traffic Analysis</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Cloud Load', val: 72 },
                   { label: 'API Latency', val: 12 },
                   { label: 'Database Health', val: 94 },
                 ].map((item, i) => (
                   <div key={i}>
                      <div className="flex justify-between font-bold text-xs mb-3">
                         <span className="text-on-surface-variant">{item.label}</span>
                         <span className="text-primary">{item.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
