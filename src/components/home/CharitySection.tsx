'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Gift, ShoppingCart, UtensilsCrossed, Banknote, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/lib/WalletContext';

const giftOptions = [
  {
    icon: ShoppingCart,
    title: 'Buy Groceries',
    description: 'Send groceries to someone who needs them',
    type: 'grocery' as const,
    color: 'from-green-400 to-emerald-600',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    suggestedAmounts: [2000, 5000, 10000, 20000],
  },
  {
    icon: UtensilsCrossed,
    title: 'Send Food',
    description: 'Buy a meal for someone special',
    type: 'food' as const,
    color: 'from-orange-400 to-red-500',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    suggestedAmounts: [1000, 2500, 5000, 10000],
  },
  {
    icon: Banknote,
    title: 'Send Funds',
    description: 'Send money directly to help someone out',
    type: 'funds' as const,
    color: 'from-blue-400 to-indigo-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    suggestedAmounts: [1000, 5000, 10000, 50000],
  },
];

const campaigns = [
  { title: 'School Supplies for 100 Kids', raised: 320000, goal: 500000, donors: 84 },
  { title: 'Feed the Community', raised: 180000, goal: 250000, donors: 56 },
  { title: 'Medical Aid for Mama Nkechi', raised: 450000, goal: 600000, donors: 120 },
];

export default function CharitySection() {
  const { sendGift, isLoading, totalBalance } = useWallet();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedGiftType, setSelectedGiftType] = useState<'grocery' | 'food' | 'funds'>('grocery');
  const [giftAmount, setGiftAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [giftSuccess, setGiftSuccess] = useState(false);

  const openGiftModal = (type: 'grocery' | 'food' | 'funds') => {
    setSelectedGiftType(type);
    setShowGiftModal(true);
    setGiftSuccess(false);
    setGiftAmount('');
    setRecipientName('');
    setRecipientId('');
    setGiftMessage('');
  };

  const handleSendGift = async () => {
    const amount = parseFloat(giftAmount);
    if (!amount || amount <= 0 || !recipientName.trim()) return;
    if (amount > totalBalance) return;

    await sendGift(selectedGiftType, amount, recipientId || 'anonymous', recipientName, giftMessage);
    setGiftSuccess(true);
  };

  const currentGiftOption = giftOptions.find((g) => g.type === selectedGiftType);

  return (
    <section className="section-padding bg-gradient-to-br from-pink-50 to-orange-50 dark:from-[#1a0a1e] dark:to-[#1a1005]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Make Someone&apos;s Day <Heart className="inline text-error" size={28} />
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Fund a need, send a gift, change a life.</p>
        </motion.div>

        {/* Personal Tipping & Funding Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-heading font-semibold mb-1 flex items-center justify-center gap-2">
              <Gift size={20} className="text-secondary" /> Send a Gift
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Buy someone groceries, send them food, or fund their needs directly
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {giftOptions.map((option, i) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button onClick={() => openGiftModal(option.type)} className="w-full text-left">
                  <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 hover:shadow-3d transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl ${option.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <option.icon size={24} className={option.iconColor} />
                    </div>
                    <h4 className="font-heading font-bold text-lg mb-1">{option.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{option.description}</p>
                    <span className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${option.color} text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-shadow`}>
                      Send Now →
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Donation Campaigns */}
        <div className="mb-4">
          <h3 className="text-xl font-heading font-semibold mb-6 text-center">Active Campaigns</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <motion.div
                key={c.title}
                className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <h3 className="font-heading font-semibold mb-3">{c.title}</h3>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mb-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-error to-warning" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>₦{(c.raised / 1000).toFixed(0)}K raised</span>
                  <span>{pct}%</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users size={12} /> {c.donors} donors
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/charity" className="btn-primary inline-flex items-center gap-2">
            <Gift size={18} /> Browse Campaigns
          </Link>
        </div>
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGiftModal(false)}
          >
            <motion.div
              className="w-full max-w-md bg-white dark:bg-card-dark rounded-3xl p-6 space-y-5"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!giftSuccess ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                      {currentGiftOption && <currentGiftOption.icon size={20} className={currentGiftOption.iconColor} />}
                      {currentGiftOption?.title}
                    </h3>
                    <button onClick={() => setShowGiftModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Recipient Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Who are you sending to?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Phone or Username (optional)</label>
                    <input
                      type="text"
                      value={recipientId}
                      onChange={(e) => setRecipientId(e.target.value)}
                      placeholder="Phone number or @username"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Amount (₦)</label>
                    <input
                      type="number"
                      value={giftAmount}
                      onChange={(e) => setGiftAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-lg font-bold focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Quick amounts */}
                  <div className="flex gap-2 flex-wrap">
                    {currentGiftOption?.suggestedAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setGiftAmount(String(amt))}
                        className="px-3 py-1.5 rounded-pill text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Message (optional)</label>
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Add a kind message..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  <div className="text-xs text-gray-400">
                    Wallet Balance: ₦{totalBalance.toLocaleString()}
                  </div>

                  <button
                    onClick={handleSendGift}
                    disabled={isLoading || !giftAmount || !recipientName.trim() || parseFloat(giftAmount) > totalBalance}
                    className={`w-full py-3.5 rounded-2xl text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${currentGiftOption?.color}`}
                  >
                    {isLoading ? 'Sending...' : `Send ₦${parseFloat(giftAmount || '0').toLocaleString()} ${currentGiftOption?.title}`}
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                  >
                    <CheckCircle size={64} className="mx-auto text-accent mb-4" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl mb-2">Gift Sent! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Your {selectedGiftType} gift of ₦{parseFloat(giftAmount).toLocaleString()} has been sent to {recipientName}.
                  </p>
                  <button
                    onClick={() => setShowGiftModal(false)}
                    className="btn-primary px-6"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

