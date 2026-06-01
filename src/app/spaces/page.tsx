'use client';

import { motion } from 'framer-motion';
import { Warehouse, MapPin, Calendar, Thermometer } from 'lucide-react';

const spaces = [
  { id: '1', name: 'Lekki Cold Room A', type: 'Cold Storage', temp: '-18°C', price: '₦5,000/day', available: true, location: 'Lekki Phase 1' },
  { id: '2', name: 'Ikeja Warehouse B', type: 'Dry Storage', temp: '25°C', price: '₦3,000/day', available: true, location: 'Ikeja Industrial' },
  { id: '3', name: 'VI Cold Room C', type: 'Cold Storage', temp: '-5°C', price: '₦4,500/day', available: false, location: 'Victoria Island' },
  { id: '4', name: 'Surulere Storage D', type: 'Dry Storage', temp: '22°C', price: '₦2,500/day', available: true, location: 'Surulere' },
];

export default function SpacesPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Warehouse size={24} className="text-secondary" /> Book Storage Space</motion.h1>
        <p className="text-gray-500 text-sm">Reserve cold rooms and warehouse space for your products.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {spaces.map((s, i) => (
            <motion.div key={s.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold">{s.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${s.available ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>{s.available ? 'Available' : 'Full'}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-2"><MapPin size={12} />{s.location}</div>
                <div className="flex items-center gap-2"><Thermometer size={12} />{s.type} · {s.temp}</div>
                <div className="flex items-center gap-2"><Calendar size={12} />{s.price}</div>
              </div>
              {s.available && <button className="btn-primary text-sm px-4 py-2 mt-4 w-full">Book Now</button>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
