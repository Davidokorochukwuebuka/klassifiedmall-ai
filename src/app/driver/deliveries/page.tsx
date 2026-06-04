'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const deliveries = [
  { id: '1', pickup: 'FreshFarms, Lekki', dropoff: '123 Main St, VI', distance: '4.2 km', pay: '₦1,500', time: '15 min' },
  { id: '2', pickup: 'TechHub, Ikeja', dropoff: '45 Allen Ave', distance: '2.8 km', pay: '₦1,200', time: '10 min' },
  { id: '3', pickup: 'Chef Amara, Surulere', dropoff: '78 Bode Thomas', distance: '1.5 km', pay: '₦800', time: '8 min' },
  { id: '4', pickup: 'StyleBox, Yaba', dropoff: '22 Herbert Macaulay', distance: '3.1 km', pay: '₦1,300', time: '12 min' },
];

export default function DeliveriesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold">Available Deliveries</h1>

      <div className="space-y-3">
        {deliveries.map((d, i) => (
          <motion.div key={d.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-accent" />{d.pickup}</div>
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-error" />{d.dropoff}</div>
              </div>
              <span className="font-heading font-bold text-accent">{d.pay}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={10} />{d.distance}</span>
                <span className="flex items-center gap-1"><Clock size={10} />{d.time}</span>
              </div>
              <button className="text-xs px-4 py-1.5 rounded-btn bg-primary text-white">Accept</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

