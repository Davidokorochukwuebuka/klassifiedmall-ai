'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const disputes = [
  { id: 'DSP-01', buyer: 'Adaeze N.', seller: 'TechHub', reason: 'Item not as described', amount: '₦12,000', status: 'Open', date: 'May 29' },
  { id: 'DSP-02', buyer: 'Chidi O.', seller: 'StyleBox', reason: 'Never received', amount: '₦8,500', status: 'Open', date: 'May 28' },
  { id: 'DSP-03', buyer: 'Fatima B.', seller: 'FreshFarms', reason: 'Damaged on arrival', amount: '₦4,500', status: 'Resolved', date: 'May 25' },
];

export default function DisputesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><AlertTriangle size={24} className="text-warning" /> Dispute Resolution</h1>

      <div className="space-y-3">
        {disputes.map((d, i) => (
          <motion.div key={d.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-heading font-semibold text-sm">{d.id}</div>
              <span className={`text-xs px-2 py-0.5 rounded-pill ${d.status === 'Open' ? 'bg-error/10 text-error' : 'bg-accent/10 text-accent'}`}>{d.status}</span>
            </div>
            <p className="text-sm">{d.reason}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
              <span>Buyer: {d.buyer}</span><span>Seller: {d.seller}</span><span>Amount: {d.amount}</span><span>{d.date}</span>
            </div>
            {d.status === 'Open' && (
              <div className="flex gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded-btn bg-primary text-white">Resolve</button>
                <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600">Refund Buyer</button>
                <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600">Side with Seller</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

