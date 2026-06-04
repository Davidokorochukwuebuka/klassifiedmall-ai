'use client';

import { motion } from 'framer-motion';
import { Navigation, Phone, MessageCircle, CheckCircle } from 'lucide-react';

export default function ActiveDeliveryPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <motion.h1 className="text-2xl font-heading font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Active Delivery</motion.h1>

      {/* Map placeholder */}
      <motion.div className="h-48 rounded-card bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Navigation size={48} className="text-primary/40" />
      </motion.div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-pill bg-warning/10 text-warning font-medium">In Progress</span>
          <span className="text-sm font-heading font-bold text-accent">₦1,500</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-accent" /> Pickup: FreshFarms, Lekki</div>
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-error" /> Dropoff: 123 Main St, Victoria Island</div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <div className="text-sm font-medium">Customer: Adaeze N.</div>
          <div className="flex gap-2 mt-2">
            <button className="flex items-center gap-1 text-xs px-3 py-2 rounded-btn border border-gray-300 dark:border-gray-600"><Phone size={12} /> Call</button>
            <button className="flex items-center gap-1 text-xs px-3 py-2 rounded-btn border border-gray-300 dark:border-gray-600"><MessageCircle size={12} /> Message</button>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-primary flex-1 flex items-center justify-center gap-2"><Navigation size={14} /> Navigate</button>
          <button className="flex-1 py-3 rounded-btn bg-accent text-white font-medium text-sm flex items-center justify-center gap-2"><CheckCircle size={14} /> Mark Delivered</button>
        </div>
      </motion.div>
    </div>
  );
}

