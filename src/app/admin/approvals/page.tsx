'use client';

import { motion } from 'framer-motion';
import { CheckSquare, Check, X } from 'lucide-react';

const pending = [
  { id: '1', name: 'QuickMart', type: 'Vendor', category: 'Groceries', submitted: 'May 28', docs: 'Complete' },
  { id: '2', name: 'SpeedRider', type: 'Driver', category: 'Logistics', submitted: 'May 29', docs: 'Complete' },
  { id: '3', name: 'LearnHub', type: 'Coach', category: 'Education', submitted: 'May 30', docs: 'Incomplete' },
  { id: '4', name: 'FoodieNG', type: 'Vendor', category: 'Food', submitted: 'May 30', docs: 'Complete' },
];

export default function ApprovalsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><CheckSquare size={24} /> Vendor Approvals</h1>

      <div className="space-y-3">
        {pending.map((p, i) => (
          <motion.div key={p.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500">{p.type} · {p.category} · Submitted {p.submitted}</div>
              <span className={`text-xs px-2 py-0.5 rounded-pill mt-1 inline-block ${p.docs === 'Complete' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>Docs: {p.docs}</span>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white" aria-label="Approve"><Check size={16} /></button>
              <button className="w-9 h-9 rounded-full bg-error/10 flex items-center justify-center text-error hover:bg-error hover:text-white" aria-label="Reject"><X size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

