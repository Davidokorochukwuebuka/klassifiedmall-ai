'use client';

import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const transactions = [
  { id: '1', type: 'credit', desc: 'Order ORD-201 payment', amount: '+₦9,000', date: 'May 30' },
  { id: '2', type: 'debit', desc: 'Withdrawal to GTBank', amount: '-₦50,000', date: 'May 28' },
  { id: '3', type: 'credit', desc: 'Order ORD-200 payment', amount: '+₦12,000', date: 'May 27' },
  { id: '4', type: 'credit', desc: 'Order ORD-199 payment', amount: '+₦25,000', date: 'May 26' },
  { id: '5', type: 'debit', desc: 'Platform fee', amount: '-₦2,300', date: 'May 25' },
];

export default function WalletPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Wallet size={24} /> Wallet & Payouts</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div className="p-6 rounded-card bg-gradient-to-br from-primary to-secondary text-white shadow-glow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-sm opacity-80">Available Balance</div>
          <div className="text-3xl font-heading font-bold mt-1">₦243,700</div>
          <button className="mt-4 px-4 py-2 rounded-btn bg-white/20 text-sm hover:bg-white/30">Withdraw</button>
        </motion.div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-xl font-heading font-bold text-warning">₦46,000</div>
        </div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-sm text-gray-500">Total Earned</div>
          <div className="text-xl font-heading font-bold text-accent">₦1.2M</div>
        </div>
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2"><Clock size={16} /> Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2 border-b dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-accent/10' : 'bg-error/10'}`}>
                  {t.type === 'credit' ? <ArrowDownLeft size={14} className="text-accent" /> : <ArrowUpRight size={14} className="text-error" />}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.desc}</div>
                  <div className="text-xs text-gray-500">{t.date}</div>
                </div>
              </div>
              <span className={`font-heading font-semibold text-sm ${t.type === 'credit' ? 'text-accent' : 'text-error'}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

