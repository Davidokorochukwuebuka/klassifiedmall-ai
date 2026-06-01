'use client';

import { motion } from 'framer-motion';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';

const investments = [
  { name: 'FreshFarms NG', invested: '₦1M', current: '₦1.2M', roi: '+20%', positive: true },
  { name: 'TechHub Lagos', invested: '₦500K', current: '₦580K', roi: '+16%', positive: true },
  { name: 'Chef Amara', invested: '₦300K', current: '₦390K', roi: '+30%', positive: true },
  { name: 'StyleBox', invested: '₦200K', current: '₦185K', roi: '-7.5%', positive: false },
];

export default function PortfolioPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><PieChart size={24} /> My Portfolio</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-gradient-to-br from-primary to-secondary text-white shadow-glow"><div className="text-sm opacity-80">Total Value</div><div className="text-2xl font-heading font-bold">₦2.35M</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-sm text-gray-500">Invested</div><div className="text-xl font-heading font-bold">₦2M</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-sm text-gray-500">Returns</div><div className="text-xl font-heading font-bold text-accent">+₦350K</div></div>
      </div>

      <div className="space-y-3">
        {investments.map((inv, i) => (
          <motion.div key={inv.name} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{inv.name}</div>
              <div className="text-xs text-gray-500">Invested: {inv.invested}</div>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold">{inv.current}</div>
              <span className={`text-xs flex items-center gap-0.5 justify-end ${inv.positive ? 'text-accent' : 'text-error'}`}>
                {inv.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{inv.roi}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
