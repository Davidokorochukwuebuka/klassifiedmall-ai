'use client';

import { motion } from 'framer-motion';
import { Car, FileText, Upload, CheckCircle, Clock } from 'lucide-react';

const documents = [
  { name: "Driver's License", status: 'Verified', expiry: 'Dec 2025' },
  { name: 'Vehicle Registration', status: 'Verified', expiry: 'Mar 2025' },
  { name: 'Insurance Certificate', status: 'Pending', expiry: 'Jun 2025' },
  { name: 'Profile Photo', status: 'Verified', expiry: '' },
];

export default function DriverProfilePage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Car size={24} /> Vehicle & Documents</h1>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-semibold">Vehicle Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" defaultValue="Toyota Corolla" placeholder="Vehicle make/model" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="text" defaultValue="2020" placeholder="Year" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="text" defaultValue="LAG-234-XY" placeholder="Plate number" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="text" defaultValue="White" placeholder="Color" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
        </div>
        <button className="btn-primary text-sm">Save Changes</button>
      </motion.div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2"><FileText size={18} /> Documents</h2>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between p-3 rounded-btn bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                {doc.status === 'Verified' ? <CheckCircle size={16} className="text-accent" /> : <Clock size={16} className="text-warning" />}
                <div><div className="text-sm font-medium">{doc.name}</div>{doc.expiry && <div className="text-xs text-gray-500">Expires: {doc.expiry}</div>}</div>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600 flex items-center gap-1"><Upload size={10} /> Upload</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

