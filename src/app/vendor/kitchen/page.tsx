'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, ChefHat } from 'lucide-react';

const orders = [
  { id: 'K-01', items: ['Jollof Rice x2', 'Chapman x2'], customer: 'Table 3', time: '2 min ago', status: 'new' },
  { id: 'K-02', items: ['Pounded Yam & Egusi', 'Fresh Juice'], customer: 'Delivery - Adaeze', time: '5 min ago', status: 'cooking' },
  { id: 'K-03', items: ['Fried Rice', 'Puff Puff x3'], customer: 'Table 7', time: '8 min ago', status: 'cooking' },
  { id: 'K-04', items: ['Chapman x4'], customer: 'Table 1', time: '12 min ago', status: 'ready' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: 'text-secondary', bg: 'bg-secondary/10' },
  cooking: { label: 'Cooking', color: 'text-warning', bg: 'bg-warning/10' },
  ready: { label: 'Ready', color: 'text-accent', bg: 'bg-accent/10' },
};

export default function KitchenQueuePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><ChefHat size={24} /> Kitchen Queue</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        {['new', 'cooking', 'ready'].map((status) => (
          <div key={status}>
            <h2 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status === 'new' ? 'bg-secondary' : status === 'cooking' ? 'bg-warning' : 'bg-accent'}`} />
              {statusConfig[status].label} ({orders.filter(o => o.status === status).length})
            </h2>
            <div className="space-y-3">
              {orders.filter(o => o.status === status).map((order, i) => (
                <motion.div key={order.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-sm">{order.id}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{order.time}</span>
                  </div>
                  <ul className="text-sm space-y-0.5 mb-2">{order.items.map(i => <li key={i}>• {i}</li>)}</ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{order.customer}</span>
                    {status === 'new' && <button className="text-xs px-3 py-1 rounded-btn bg-warning text-white">Start</button>}
                    {status === 'cooking' && <button className="text-xs px-3 py-1 rounded-btn bg-accent text-white flex items-center gap-1"><CheckCircle size={10} /> Done</button>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
