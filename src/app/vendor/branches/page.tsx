'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const initialBranches = [
  { id: '1', name: 'Main Store', address: '123 Lekki Phase 1, Lagos', phone: '+234 801 234 5678', active: true },
  { id: '2', name: 'Ikeja Branch', address: '45 Allen Avenue, Ikeja', phone: '+234 802 345 6789', active: true },
  { id: '3', name: 'Abuja Branch', address: '10 Wuse Zone 5, Abuja', phone: '+234 803 456 7890', active: false },
];

export default function BranchesPage() {
  const [branches] = useState(initialBranches);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MapPin size={24} /> Branches</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Add Branch</button>
      </div>

      {showAdd && (
        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <input type="text" placeholder="Branch name" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Address" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <button className="btn-primary text-sm" onClick={() => setShowAdd(false)}>Save Branch</button>
        </motion.div>
      )}

      <div className="space-y-3">
        {branches.map((b, i) => (
          <motion.div key={b.id} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MapPin size={16} className="text-primary" /></div>
              <div>
                <div className="font-medium text-sm flex items-center gap-2">{b.name} {b.active ? <span className="w-2 h-2 rounded-full bg-accent" /> : <span className="text-xs text-gray-400">Inactive</span>}</div>
                <div className="text-xs text-gray-500">{b.address}</div>
                <div className="text-xs text-gray-400">{b.phone}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-primary" aria-label="Edit"><Edit2 size={14} /></button>
              <button className="text-gray-400 hover:text-error" aria-label="Delete"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
