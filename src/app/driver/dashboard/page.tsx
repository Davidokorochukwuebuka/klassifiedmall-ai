'use client';

import { motion } from 'framer-motion';
import { Truck, DollarSign, MapPin, Star, Package } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Today\'s Earnings', value: '₦8,500', icon: DollarSign, color: '#10B981' },
  { label: 'Deliveries Today', value: '6', icon: Package, color: '#2563EB' },
  { label: 'Rating', value: '4.9', icon: Star, color: '#F59E0B' },
  { label: 'Online Hours', value: '5.2h', icon: MapPin, color: '#6C2BD9' },
];

export default function DriverDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Truck size={24} /> Driver Dashboard</h1>
        <span className="px-3 py-1 rounded-pill bg-accent/10 text-accent text-sm font-medium">Online</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <s.icon size={18} style={{ color: s.color }} />
            <div className="text-xl font-heading font-bold mt-2">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/driver/deliveries" className="btn-primary text-center">View Available Deliveries</Link>
        <Link href="/driver/active" className="btn-secondary text-center !text-gray-700 dark:!text-gray-200 !border-gray-300">Active Delivery</Link>
      </div>
    </div>
  );
}

