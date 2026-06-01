'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactions = [
  { desc: 'Platform commission - ORD-201', amount: '+₦900', type: 'credit', date: 'May 30' },
  { desc: 'Vendor payout - FreshFarms', amount: '-₦50,000', type: 'debit', date: 'May 29' },
  { desc: 'Platform commission - ORD-200', amount: '+₦1,200', type: 'credit', date: 'May 29' },
  { desc: 'Subscription - TechHub (Growth)', amount: '+₦5,000', type: 'credit', date: 'May 28' },
  { desc: 'Vendor payout - Chef Amara', amount: '-₦30,000', type: 'debit', date: 'May 28' },
];

export default function FinancePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><DollarSign size={24} /> Platform Finance</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div className="p-4 rounded-card bg-gradient-to-br from-accent to-secondary text-white shadow-glow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}><div className="text-sm opacity-80">Revenue (MTD)</div><div className="text-2xl font-heading font-bold">₦4.5M</div></motion.div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-sm text-gray-500">Commissions</div><div className="text-xl font-heading font-bold">₦680K</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-sm text-gray-500">Subscriptions</div><div className="text-xl font-heading font-bold">₦320K</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-sm text-gray-500">Payouts</div><div className="text-xl font-heading font-bold text-error">₦3.2M</div></div>
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {transactions.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-accent/10' : 'bg-error/10'}`}>
                  {t.type === 'credit' ? <ArrowDownLeft size={14} className="text-accent" /> : <ArrowUpRight size={14} className="text-error" />}
                </div>
                <div><div className="text-sm">{t.desc}</div><div className="text-xs text-gray-500">{t.date}</div></div>
              </div>
              <span className={`font-heading font-semibold text-sm ${t.type === 'credit' ? 'text-accent' : 'text-error'}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
