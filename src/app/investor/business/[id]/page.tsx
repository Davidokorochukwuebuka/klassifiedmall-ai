'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, Star, DollarSign, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function BusinessDetailPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/investor/browse" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft size={14} /> Back</Link>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">🏪</div>
          <div>
            <h1 className="text-xl font-heading font-bold">FreshFarms NG</h1>
            <p className="text-sm text-gray-500">Groceries · Lekki, Lagos · Since 2022</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1"><Star size={12} className="text-warning fill-warning" />4.9</span>
              <span className="flex items-center gap-1"><Users size={12} />342 customers</span>
              <span className="flex items-center gap-1 text-accent"><TrendingUp size={12} />+24% growth</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><DollarSign size={18} className="mx-auto text-accent mb-1" /><div className="font-heading font-bold">₦1.2M</div><div className="text-xs text-gray-500">Monthly Revenue</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><BarChart3 size={18} className="mx-auto text-primary mb-1" /><div className="font-heading font-bold">₦5M</div><div className="text-xs text-gray-500">Seeking Investment</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><TrendingUp size={18} className="mx-auto text-warning mb-1" /><div className="font-heading font-bold">22%</div><div className="text-xs text-gray-500">Projected ROI</div></div>
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading font-semibold mb-3">About</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">FreshFarms NG is a premium organic produce marketplace delivering fresh groceries directly from local farmers. With consistent 24% month-over-month growth and a loyal customer base of 342+ active buyers.</p>
      </motion.div>

      <button className="btn-primary w-full text-lg py-4">Invest in This Business</button>
    </div>
  );
}
