'use client';

import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';

const deals = [
  { id: '1', business: 'FreshFarms NG', amount: '₦1M', status: 'Active', date: 'May 15', returns: '₦200K earned' },
  { id: '2', business: 'TechHub Lagos', amount: '₦500K', status: 'Active', date: 'Apr 20', returns: '₦80K earned' },
  { id: '3', business: 'Chef Amara', amount: '₦300K', status: 'Pending', date: 'May 28', returns: 'Awaiting confirmation' },
  { id: '4', business: 'QuickMart', amount: '₦200K', status: 'Declined', date: 'May 10', returns: 'Business not eligible' },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; style: string }> = {
  Active: { icon: CheckCircle, style: 'bg-accent/10 text-accent' },
  Pending: { icon: Clock, style: 'bg-warning/10 text-warning' },
  Declined: { icon: XCircle, style: 'bg-error/10 text-error' },
};

export default function DealsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Briefcase size={24} /> Deal Flow</h1>

      <div className="space-y-3">
        {deals.map((d, i) => {
          const cfg = statusConfig[d.status];
          return (
            <motion.div key={d.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-heading font-semibold">{d.business}</div>
                  <div className="text-xs text-gray-500">{d.date} · {d.amount}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-pill flex items-center gap-1 ${cfg.style}`}><cfg.icon size={10} />{d.status}</span>
              </div>
              <p className="text-xs text-gray-500">{d.returns}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
