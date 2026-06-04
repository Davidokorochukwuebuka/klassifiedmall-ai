'use client';

import { motion } from 'framer-motion';
import { Users, Store, DollarSign, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,450', icon: Users, color: '#6C2BD9', change: '+340' },
  { label: 'Active Vendors', value: '1,280', icon: Store, color: '#2563EB', change: '+52' },
  { label: 'Revenue (MTD)', value: '₦45.2M', icon: DollarSign, color: '#10B981', change: '+12%' },
  { label: 'Orders (MTD)', value: '8,920', icon: ShoppingCart, color: '#F59E0B', change: '+8%' },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <motion.h1 className="text-2xl font-heading font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Platform Overview</motion.h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <s.icon size={18} style={{ color: s.color }} />
            <div className="text-xl font-heading font-bold mt-2">{s.value}</div>
            <div className="flex items-center justify-between"><span className="text-xs text-gray-500">{s.label}</span><span className="text-xs text-accent">{s.change}</span></div>
          </motion.div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-card bg-white dark:bg-card-dark shadow-soft">
          <h2 className="font-heading font-semibold mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-warning" /> Pending Actions</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Vendor approvals</span><span className="font-bold text-warning">8</span></li>
            <li className="flex justify-between"><span>Open disputes</span><span className="font-bold text-error">3</span></li>
            <li className="flex justify-between"><span>Driver verifications</span><span className="font-bold text-secondary">5</span></li>
            <li className="flex justify-between"><span>Content reports</span><span className="font-bold text-warning">12</span></li>
          </ul>
        </div>
        <div className="p-5 rounded-card bg-white dark:bg-card-dark shadow-soft">
          <h2 className="font-heading font-semibold mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-accent" /> Growth</h2>
          <div className="flex items-end gap-1 h-24">
            {[30, 45, 35, 60, 50, 75, 65].map((h, i) => (
              <motion.div key={i} className="flex-1 bg-primary/20 rounded-t" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + i * 0.1 }}>
                <div className="w-full bg-primary rounded-t h-3/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

