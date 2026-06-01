'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, DollarSign, PieChart } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Portfolio Value', value: '₦2.4M', icon: PieChart, color: '#6C2BD9' },
  { label: 'Total Returns', value: '+₦340K', icon: TrendingUp, color: '#10B981' },
  { label: 'Active Investments', value: '5', icon: Briefcase, color: '#2563EB' },
  { label: 'Avg. ROI', value: '18%', icon: DollarSign, color: '#F59E0B' },
];

export default function InvestorDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <motion.h1 className="text-2xl font-heading font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Investor Dashboard</motion.h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <s.icon size={18} style={{ color: s.color }} />
            <div className="text-xl font-heading font-bold mt-2">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/investor/browse" className="btn-primary text-sm">Browse Businesses</Link>
        <Link href="/investor/portfolio" className="px-4 py-2 rounded-btn border border-gray-300 dark:border-gray-600 text-sm">My Portfolio</Link>
        <Link href="/investor/deals" className="px-4 py-2 rounded-btn border border-gray-300 dark:border-gray-600 text-sm">Deal Flow</Link>
      </div>
    </div>
  );
}
