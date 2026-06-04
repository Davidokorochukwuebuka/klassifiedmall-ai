'use client';

import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Circle } from 'lucide-react';

const checklist = [
  { label: 'Complete business profile', done: true },
  { label: 'Upload financial records (3 months)', done: true },
  { label: 'Minimum 50 completed orders', done: true },
  { label: 'Average rating above 4.0', done: true },
  { label: 'Business plan uploaded', done: false },
  { label: 'Pitch deck ready', done: false },
  { label: 'KYC verification complete', done: true },
  { label: 'Revenue above ₦500K/month', done: false },
];

export default function InvestmentReadinessPage() {
  const completed = checklist.filter(c => c.done).length;
  const pct = Math.round((completed / checklist.length) * 100);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><TrendingUp size={24} /> Investment Readiness</h1>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-heading font-bold">{pct}%</div>
            <div className="text-sm text-gray-500">{completed}/{checklist.length} completed</div>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
            <span className="text-lg font-heading font-bold text-primary">{pct}%</span>
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </motion.div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
        <h2 className="font-heading font-semibold mb-4">Checklist</h2>
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <motion.div key={item.label} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              {item.done ? <CheckCircle size={18} className="text-accent shrink-0" /> : <Circle size={18} className="text-gray-300 shrink-0" />}
              <span className={`text-sm ${item.done ? 'text-gray-600 dark:text-gray-400' : 'font-medium'}`}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

