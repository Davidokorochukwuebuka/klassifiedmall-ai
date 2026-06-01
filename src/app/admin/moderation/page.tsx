'use client';

import { motion } from 'framer-motion';
import { Shield, Check, X, Eye } from 'lucide-react';

const reports = [
  { id: '1', type: 'Product', item: 'Suspicious Electronics Listing', reporter: 'System AI', reason: 'Potential counterfeit', severity: 'High' },
  { id: '2', type: 'Review', item: 'Spam review on FreshFarms', reporter: 'Adaeze N.', reason: 'Fake review', severity: 'Medium' },
  { id: '3', type: 'User', item: 'Offensive profile bio', reporter: 'Community', reason: 'Inappropriate content', severity: 'Low' },
  { id: '4', type: 'Product', item: 'Misleading product images', reporter: 'Chidi O.', reason: 'False advertising', severity: 'Medium' },
];

const sevStyle: Record<string, string> = { High: 'bg-error/10 text-error', Medium: 'bg-warning/10 text-warning', Low: 'bg-gray-200 text-gray-600' };

export default function ModerationPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Shield size={24} /> Content Moderation</h1>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <motion.div key={r.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium text-sm">{r.item}</div>
                <div className="text-xs text-gray-500">{r.type} · Reported by: {r.reporter} · {r.reason}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-pill ${sevStyle[r.severity]}`}>{r.severity}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-btn bg-error text-white"><X size={10} /> Remove</button>
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-btn bg-accent/10 text-accent"><Check size={10} /> Dismiss</button>
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600"><Eye size={10} /> View</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
