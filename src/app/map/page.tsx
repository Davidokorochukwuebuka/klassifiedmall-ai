'use client';

import { motion } from 'framer-motion';
import { MapPin, Search, Navigation } from 'lucide-react';

const nearby = [
  { name: 'FreshFarms NG', type: 'Groceries', distance: '0.5 km', rating: 4.9 },
  { name: 'Chef Amara', type: 'Food', distance: '1.2 km', rating: 4.7 },
  { name: 'TechHub Lagos', type: 'Electronics', distance: '2.1 km', rating: 4.8 },
  { name: 'StyleBox', type: 'Fashion', distance: '2.8 km', rating: 4.9 },
];

export default function MapPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MapPin size={24} className="text-secondary" /> Nearby</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search nearby vendors..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
        </div>

        {/* Map placeholder */}
        <div className="h-64 rounded-card bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <div className="text-center"><Navigation size={48} className="mx-auto text-primary/40 mb-2" /><p className="text-sm text-gray-500">Map loads here (Google Maps API)</p></div>
        </div>

        <h2 className="font-heading font-semibold">Nearby Vendors</h2>
        <div className="space-y-3">
          {nearby.map((v, i) => (
            <motion.div key={v.name} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div><div className="font-medium">{v.name}</div><div className="text-xs text-gray-500">{v.type} · ⭐ {v.rating}</div></div>
              <span className="text-sm text-accent font-medium">{v.distance}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

