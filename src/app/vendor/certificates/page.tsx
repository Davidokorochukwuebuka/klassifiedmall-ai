'use client';

import { motion } from 'framer-motion';
import { Award, Plus, Download } from 'lucide-react';

const templates = [
  { id: '1', name: 'Classic Gold', issued: 85, course: 'Digital Marketing 101' },
  { id: '2', name: 'Modern Blue', issued: 42, course: 'Business Finance Basics' },
];

export default function CertificatesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Award size={24} className="text-warning" /> Certificates</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> New Template</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((t, i) => (
          <motion.div key={t.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="h-32 bg-gradient-to-br from-warning/20 to-primary/20 flex items-center justify-center">
              <Award size={48} className="text-warning/60" />
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold">{t.name}</h3>
              <p className="text-xs text-gray-500">{t.course} · {t.issued} issued</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded-btn bg-primary/10 text-primary">Edit</button>
                <button className="text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600 flex items-center gap-1"><Download size={10} /> Preview</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
