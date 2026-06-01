'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Send, Plus, Eye, EyeOff, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useWallet, WalletTransaction } from '@/lib/WalletContext';

function TransactionItem({ tx }: { tx: WalletTransaction }) {
  const isCredit = tx.type === 'credit';
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isCredit ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
        {isCredit ? <ArrowDownLeft size={18} className="text-green-600" /> : <ArrowUpRight size={18} className="text-red-500" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{tx.description}</p>
        <p className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${isCredit ? 'text-green-600' : 'text-red-500'}`}>
          {isCredit ? '+' : '-'}₦{tx.amount.toLocaleString()}
        </p>
        <div className="flex items-center gap-1 justify-end">
          {tx.status === 'completed' && <CheckCircle size={10} className="text-green-500" />}
          {tx.status === 'pending' && <Clock size={10} className="text-yellow-500" />}
          {tx.status === 'failed' && <XCircle size={10} className="text-red-500" />}
          <span className="text-[10px] text-gray-400 capitalize">{tx.status}</span>
        </div>
      </div>
    </div>
  );
}

export default function WalletPage() {
  const { balances, transactions, totalBalance, fundWallet, isLoading } = useWallet();
  const [showBalance, setShowBalance] = useState(true);
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [fundMethod, setFundMethod] = useState('card');

  const handleFund = async () => {
    const amount = parseFloat(fundAmount);
    if (amount > 0) {
      await fundWallet(amount, 'NGN', fundMethod);
      setShowFundModal(false);
      setFundAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Wallet Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 3D gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#2B4F7E] to-[#6EC1E4]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(97,206,112,0.3)_0%,_transparent_60%)]" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wallet size={20} className="text-white/80" />
                <span className="text-white/80 text-sm font-medium">My Wallet</span>
              </div>
              <button onClick={() => setShowBalance(!showBalance)} className="text-white/60 hover:text-white transition-colors" aria-label="Toggle balance visibility">
                {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="mb-6">
              <p className="text-white/60 text-xs mb-1">Total Balance</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                {showBalance ? `₦${totalBalance.toLocaleString()}` : '₦••••••'}
              </h2>
            </div>

            {/* Currency breakdown */}
            <div className="flex gap-4 flex-wrap">
              {balances.map((b) => (
                <div key={b.currency} className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
                  <p className="text-[10px] text-white/60">{b.currency}</p>
                  <p className="text-sm font-bold text-white">
                    {showBalance ? `${b.currency === 'NGN' ? '₦' : b.currency === 'USD' ? '$' : '£'}${b.available.toLocaleString()}` : '••••'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Plus, label: 'Fund', color: '#61CE70', action: () => setShowFundModal(true) },
            { icon: ArrowUpRight, label: 'Withdraw', color: '#EF4444', action: () => {} },
            { icon: Send, label: 'Transfer', color: '#6EC1E4', action: () => {} },
            { icon: TrendingUp, label: 'Invest', color: '#8B5CF6', action: () => {} },
          ].map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-white dark:bg-card-dark shadow-soft p-5">
          <h3 className="font-heading font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-0">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        </div>

        {/* Fund Modal */}
        <AnimatePresence>
          {showFundModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFundModal(false)}
            >
              <motion.div
                className="w-full max-w-md bg-white dark:bg-card-dark rounded-3xl p-6 space-y-5"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-heading font-bold text-lg">Fund Wallet</h3>

                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Amount (₦)</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-lg font-bold focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2 flex-wrap">
                  {[1000, 5000, 10000, 25000, 50000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setFundAmount(String(amt))}
                      className="px-3 py-1.5 rounded-pill text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'card', label: 'Card', icon: '💳' },
                      { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                      { id: 'ussd', label: 'USSD', icon: '📱' },
                      { id: 'mobile', label: 'Mobile Money', icon: '📲' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setFundMethod(m.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm transition-all ${
                          fundMethod === m.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <span>{m.icon}</span>
                        <span className="font-medium">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleFund}
                  disabled={isLoading || !fundAmount}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Fund Wallet'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
