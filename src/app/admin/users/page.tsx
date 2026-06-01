'use client';

import { motion } from 'framer-motion';
import { Users, Search, MoreVertical } from 'lucide-react';

const users = [
  { name: 'Adaeze N.', email: 'adaeze@email.com', type: 'Customer', status: 'Active', joined: 'May 2024' },
  { name: 'FreshFarms NG', email: 'info@freshfarms.ng', type: 'Vendor', status: 'Active', joined: 'Jan 2024' },
  { name: 'Emeka A.', email: 'emeka@email.com', type: 'Driver', status: 'Active', joined: 'Mar 2024' },
  { name: 'Chidi O.', email: 'chidi@email.com', type: 'Investor', status: 'Suspended', joined: 'Apr 2024' },
  { name: 'Grace I.', email: 'grace@email.com', type: 'Coach', status: 'Active', joined: 'Feb 2024' },
];

export default function AdminUsersPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Users size={24} /> User Management</h1>
      <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" /></div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><th className="p-4">User</th><th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4">Joined</th><th className="p-4"></th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <motion.tr key={u.email} className="border-b dark:border-gray-800 last:border-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="p-4"><div className="font-medium">{u.name}</div><div className="text-xs text-gray-500">{u.email}</div></td>
                <td className="p-4"><span className="text-xs px-2 py-0.5 rounded-pill bg-primary/10 text-primary">{u.type}</span></td>
                <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-pill ${u.status === 'Active' ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>{u.status}</span></td>
                <td className="p-4 text-gray-500">{u.joined}</td>
                <td className="p-4"><button className="text-gray-400 hover:text-gray-600" aria-label="Actions"><MoreVertical size={16} /></button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
