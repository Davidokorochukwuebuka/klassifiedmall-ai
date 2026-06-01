'use client';

import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import Link from 'next/link';

const orders = [
  { id: 'ORD-001', items: 'Wireless Earbuds', status: 'Delivered', date: '2024-05-28', amount: '₦12,000' },
  { id: 'ORD-002', items: 'Organic Honey x2', status: 'In Transit', date: '2024-05-27', amount: '₦9,000' },
  { id: 'ORD-003', items: 'Ankara Dress', status: 'Processing', date: '2024-05-26', amount: '₦8,500' },
  { id: 'ORD-004', items: 'Smart Watch', status: 'Delivered', date: '2024-05-20', amount: '₦25,000' },
  { id: 'ORD-005', items: 'Vitamin C Serum', status: 'Cancelled', date: '2024-05-18', amount: '₦6,800' },
];

const statusStyle: Record<string, string> = {
  Delivered: 'bg-accent/10 text-accent',
  'In Transit': 'bg-secondary/10 text-secondary',
  Processing: 'bg-warning/10 text-warning',
  Cancelled: 'bg-error/10 text-error',
};

export default function OrdersPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Package size={24} /> My Orders</h1>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
      </div>

      <div className="space-y-3">
        {orders.map((o, i) => (
          <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/orders/${o.id}`} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all">
              <div>
                <div className="font-medium">{o.items}</div>
                <div className="text-xs text-gray-500">{o.id} · {o.date}</div>
              </div>
              <div className="text-right">
                <div className="font-heading font-semibold">{o.amount}</div>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${statusStyle[o.status]}`}>{o.status}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
