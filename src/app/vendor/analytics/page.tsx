'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, ShoppingCart, Eye } from 'lucide-react';

const metrics = [
  { label: 'Total Revenue', value: '₦1.2M', change: '+12%', icon: TrendingUp },
  { label: 'Store Views', value: '8,420', change: '+24%', icon: Eye },
  { label: 'Customers', value: '342', change: '+18%', icon: Users },
  { label: 'Orders', value: '156', change: '+8%', icon: ShoppingCart },
];

const topProducts = [
  { name: 'Organic Honey', sales: 45, revenue: '₦202,500' },
  { name: 'Wireless Earbuds', sales: 32, revenue: '₦384,000' },
  { name: 'Smart Watch', sales: 18, revenue: '₦450,000' },
  { name: 'Vitamin C Serum', sales: 28, revenue: '₦190,400' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><BarChart3 size={24} /> Analytics & Reports</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <m.icon size={18} className="text-primary mb-2" />
            <div className="text-xl font-heading font-bold">{m.value}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{m.label}</span>
              <span className="text-xs text-accent">{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart placeholder */}
      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="font-heading font-semibold mb-4">Revenue (Last 7 Days)</h2>
        <div className="flex items-end gap-2 h-40">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.1 }}>
              <div className="w-full bg-primary rounded-t" style={{ height: '60%' }} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
        </div>
      </motion.div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h2 className="font-heading font-semibold mb-4">Top Products</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700"><th className="pb-2">Product</th><th className="pb-2">Sales</th><th className="pb-2">Revenue</th></tr></thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.name} className="border-b dark:border-gray-800 last:border-0">
                <td className="py-3 font-medium">{p.name}</td>
                <td className="py-3">{p.sales}</td>
                <td className="py-3 font-heading font-semibold">{p.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
