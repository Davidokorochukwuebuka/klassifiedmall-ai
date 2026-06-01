'use client';

import { motion } from 'framer-motion';
import { Package, Heart, ShoppingCart, Bell, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Orders', value: '12', icon: Package, color: '#6C2BD9', href: '/orders' },
  { label: 'Wishlist', value: '8', icon: Heart, color: '#EC4899', href: '/wishlist' },
  { label: 'Cart Items', value: '3', icon: ShoppingCart, color: '#2563EB', href: '/cart' },
  { label: 'Notifications', value: '5', icon: Bell, color: '#F59E0B', href: '/notifications' },
];

const recentOrders = [
  { id: 'ORD-001', item: 'Wireless Earbuds', status: 'Delivered', date: 'May 28', amount: '₦12,000' },
  { id: 'ORD-002', item: 'Organic Honey x2', status: 'In Transit', date: 'May 27', amount: '₦9,000' },
  { id: 'ORD-003', item: 'Ankara Dress', status: 'Processing', date: 'May 26', amount: '₦8,500' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-accent/10 text-accent',
  'In Transit': 'bg-secondary/10 text-secondary',
  Processing: 'bg-warning/10 text-warning',
};

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold">Welcome back! 👋</h1>
        <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with your account.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={s.href} className="block p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold flex items-center gap-2"><Clock size={18} /> Recent Orders</h2>
          <Link href="/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((o) => (
            <Link key={o.id} href={`/orders/${o.id}`} className="flex items-center justify-between p-3 rounded-btn hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div>
                <div className="font-medium text-sm">{o.item}</div>
                <div className="text-xs text-gray-500">{o.id} · {o.date}</div>
              </div>
              <div className="text-right">
                <div className="font-heading font-semibold text-sm">{o.amount}</div>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${statusColor[o.status]}`}>{o.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="rounded-card bg-gradient-to-r from-primary/10 to-secondary/10 p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="font-heading font-semibold mb-3 flex items-center gap-2"><TrendingUp size={18} /> Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-primary text-sm px-4 py-2">Browse Products</Link>
          <Link href="/orders" className="btn-secondary text-sm px-4 py-2 !text-gray-700 dark:!text-gray-200 !border-gray-300">Track Orders</Link>
          <Link href="/messages" className="btn-secondary text-sm px-4 py-2 !text-gray-700 dark:!text-gray-200 !border-gray-300">Messages</Link>
        </div>
      </motion.div>
    </div>
  );
}
