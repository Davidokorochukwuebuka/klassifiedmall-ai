'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const history = [
  { date: 'May 30', deliveries: 6, earned: '₦8,500' },
  { date: 'May 29', deliveries: 8, earned: '₦11,200' },
  { date: 'May 28', deliveries: 5, earned: '₦7,000' },
  { date: 'May 27', deliveries: 7, earned: '₦9,800' },
  { date: 'May 26', deliveries: 4, earned: '₦5,600' },
];

export default function EarningsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><DollarSign size={24} /> Earnings</h1>

      <div className="grid grid-cols-3 gap-4">
        <motion.div className="p-4 rounded-card bg-gradient-to-br from-accent to-secondary text-white shadow-glow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-sm opacity-80">This Week</div>
          <div className="text-2xl font-heading font-bold">₦42,100</div>
        </motion.div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-sm text-gray-500">This Month</div>
          <div className="text-xl font-heading font-bold">₦168,400</div>
        </div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-sm text-gray-500">Total Trips</div>
          <div className="text-xl font-heading font-bold">142</div>
        </div>
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2"><Calendar size={16} /> Daily History</h2>
        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.date} className="flex items-center justify-between py-2 border-b dark:border-gray-800 last:border-0">
              <div><div className="text-sm font-medium">{h.date}</div><div className="text-xs text-gray-500">{h.deliveries} deliveries</div></div>
              <span className="font-heading font-bold text-accent">{h.earned}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

