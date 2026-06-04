'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Check, X } from 'lucide-react';

const negotiations = [
  { id: '1', customer: 'Adaeze N.', product: 'Smart Watch', original: '₦25,000', offered: '₦20,000', status: 'Pending' },
  { id: '2', customer: 'Chidi O.', product: 'Wireless Earbuds x5', original: '₦60,000', offered: '₦50,000', status: 'Pending' },
  { id: '3', customer: 'Fatima B.', product: 'Ankara Dress x3', original: '₦25,500', offered: '₦22,000', status: 'Accepted' },
  { id: '4', customer: 'Emeka A.', product: 'Organic Honey x10', original: '₦45,000', offered: '₦35,000', status: 'Rejected' },
];

const statusStyle: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  Accepted: 'bg-accent/10 text-accent',
  Rejected: 'bg-error/10 text-error',
};

export default function NegotiationsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MessageSquare size={24} /> Negotiations</h1>

      <div className="space-y-3">
        {negotiations.map((n, i) => (
          <motion.div key={n.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium text-sm">{n.customer}</div>
                <div className="text-xs text-gray-500">{n.product}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-pill ${statusStyle[n.status]}`}>{n.status}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 line-through">{n.original}</span>
              <span className="font-heading font-bold text-primary">{n.offered}</span>
            </div>
            {n.status === 'Pending' && (
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-btn bg-accent text-white"><Check size={12} /> Accept</button>
                <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-btn bg-error/10 text-error"><X size={12} /> Reject</button>
                <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600">Counter</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

