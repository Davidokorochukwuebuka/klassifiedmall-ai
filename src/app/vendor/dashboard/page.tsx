'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  { label: 'Revenue', value: '₦1.2M', change: '+12%', icon: DollarSign, color: '#10B981' },
  { label: 'Orders', value: '156', change: '+8%', icon: ShoppingCart, color: '#2563EB' },
  { label: 'Products', value: '42', change: '+3', icon: Package, color: '#6C2BD9' },
  { label: 'Conversion', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: '#F59E0B' },
];

const recentOrders = [
  { id: 'ORD-201', customer: 'Adaeze N.', items: 2, total: '₦24,000', status: 'New' },
  { id: 'ORD-200', customer: 'Chidi O.', items: 1, total: '₦8,500', status: 'Processing' },
  { id: 'ORD-199', customer: 'Fatima B.', items: 3, total: '₦15,200', status: 'Shipped' },
];

export default function VendorDashboard() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <motion.h1 className="text-2xl font-heading font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Vendor Dashboard</motion.h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <span className="text-xs text-accent flex items-center gap-0.5"><ArrowUpRight size={12} />{s.change}</span>
            </div>
            <div className="text-xl font-heading font-bold">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="font-heading font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700"><th className="pb-2">Order</th><th className="pb-2">Customer</th><th className="pb-2">Items</th><th className="pb-2">Total</th><th className="pb-2">Status</th></tr></thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b dark:border-gray-800 last:border-0">
                  <td className="py-3 font-medium">{o.id}</td>
                  <td className="py-3">{o.customer}</td>
                  <td className="py-3">{o.items}</td>
                  <td className="py-3 font-heading font-semibold">{o.total}</td>
                  <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-pill bg-primary/10 text-primary">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
