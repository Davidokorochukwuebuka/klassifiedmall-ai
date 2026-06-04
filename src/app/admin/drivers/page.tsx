'use client';

import { motion } from 'framer-motion';
import { Truck, Check, X, FileText } from 'lucide-react';

const drivers = [
  { id: '1', name: 'Emeka A.', vehicle: 'Toyota Corolla 2020', docs: 'Complete', status: 'Pending', city: 'Lagos' },
  { id: '2', name: 'Bola T.', vehicle: 'Honda Civic 2019', docs: 'Complete', status: 'Pending', city: 'Abuja' },
  { id: '3', name: 'Yusuf M.', vehicle: 'Kia Rio 2021', docs: 'Incomplete', status: 'Pending', city: 'Lagos' },
  { id: '4', name: 'Grace I.', vehicle: 'Toyota Camry 2018', docs: 'Complete', status: 'Approved', city: 'PH' },
];

export default function DriversAdminPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Truck size={24} /> Driver Verification</h1>

      <div className="space-y-3">
        {drivers.map((d, i) => (
          <motion.div key={d.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{d.name}</div>
              <div className="text-xs text-gray-500">{d.vehicle} · {d.city}</div>
              <span className={`text-xs px-2 py-0.5 rounded-pill mt-1 inline-block ${d.docs === 'Complete' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>{d.docs}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600 flex items-center gap-1"><FileText size={10} /> Docs</button>
              {d.status === 'Pending' && d.docs === 'Complete' && (
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

