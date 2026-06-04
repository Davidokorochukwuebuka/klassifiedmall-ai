'use client';

import { motion } from 'framer-motion';
import { Heart, Check, X } from 'lucide-react';

const campaigns = [
  { id: '1', title: 'School Supplies for 100 Kids', organizer: 'NGO Hope', goal: '₦500K', status: 'Pending', docs: 'Verified' },
  { id: '2', title: 'Medical Aid for Mama Nkechi', organizer: 'Community Fund', goal: '₦600K', status: 'Approved', docs: 'Verified' },
  { id: '3', title: 'Build a Library', organizer: 'ReadNG', goal: '₦2M', status: 'Pending', docs: 'Under Review' },
];

export default function CharityAdminPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Heart size={24} className="text-error" /> Charity Verification</h1>

      <div className="space-y-3">
        {campaigns.map((c, i) => (
          <motion.div key={c.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{c.title}</div>
              <div className="text-xs text-gray-500">By: {c.organizer} · Goal: {c.goal} · Docs: {c.docs}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-pill ${c.status === 'Approved' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>{c.status}</span>
              {c.status === 'Pending' && (
                <>
                  <button className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent" aria-label="Approve"><Check size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error" aria-label="Reject"><X size={14} /></button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

