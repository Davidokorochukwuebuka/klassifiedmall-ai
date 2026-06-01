'use client';

import { motion } from 'framer-motion';
import { Megaphone, Plus, Eye, MousePointer } from 'lucide-react';

const promos = [
  { id: '1', name: 'Summer Sale 20% Off', type: 'Discount', status: 'Active', views: 1240, clicks: 89, budget: '₦5,000' },
  { id: '2', name: 'New Arrivals Banner', type: 'Ad', status: 'Active', views: 3400, clicks: 210, budget: '₦10,000' },
  { id: '3', name: 'Free Delivery Weekend', type: 'Promo', status: 'Ended', views: 890, clicks: 45, budget: '₦3,000' },
];

export default function PromotionsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Megaphone size={24} /> Promotions & Ads</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Create</button>
      </div>

      <div className="space-y-3">
        {promos.map((p, i) => (
          <motion.div key={p.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.type} · Budget: {p.budget}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-pill ${p.status === 'Active' ? 'bg-accent/10 text-accent' : 'bg-gray-200 text-gray-500'}`}>{p.status}</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Eye size={12} /> {p.views} views</span>
              <span className="flex items-center gap-1"><MousePointer size={12} /> {p.clicks} clicks</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
