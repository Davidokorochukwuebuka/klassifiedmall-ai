'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, ShoppingCart, TrendingUp, CheckCircle, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { useWallet } from '@/lib/WalletContext';

interface GroupBuyItem {
  id: string;
  title: string;
  description: string;
  image: string;
  unitPrice: number;
  groupPrice: number;
  minParticipants: number;
  currentParticipants: number;
  maxParticipants: number;
  deadline: string;
  category: string;
  vendor: string;
  status: 'open' | 'filled' | 'completed' | 'expired';
}

const groupBuyItems: GroupBuyItem[] = [
  {
    id: 'GB-001', title: 'Premium Rice (50kg Bag)', description: 'Grade A long-grain rice. Buy in group to get wholesale price.',
    image: '🌾', unitPrice: 45000, groupPrice: 38000, minParticipants: 10, currentParticipants: 7, maxParticipants: 20,
    deadline: '2026-06-15', category: 'Grains', vendor: 'FreshFarms', status: 'open',
  },
  {
    id: 'GB-002', title: 'Frozen Turkey (Full Carton)', description: '10kg carton of premium frozen turkey. Perfect for events.',
    image: '🦃', unitPrice: 35000, groupPrice: 28000, minParticipants: 15, currentParticipants: 15, maxParticipants: 30,
    deadline: '2026-06-10', category: 'Protein', vendor: 'MeatHub', status: 'filled',
  },
  {
    id: 'GB-003', title: 'Palm Oil (25L Jerrycan)', description: 'Pure red palm oil direct from mill. Bulk discount.',
    image: '🫒', unitPrice: 28000, groupPrice: 22000, minParticipants: 8, currentParticipants: 5, maxParticipants: 15,
    deadline: '2026-06-20', category: 'Cooking Essentials', vendor: 'OilDirect', status: 'open',
  },
  {
    id: 'GB-004', title: 'Yam Tubers (100 pieces)', description: 'Fresh yam from Benue. Group buy for best price per tuber.',
    image: '🍠', unitPrice: 3500, groupPrice: 2500, minParticipants: 20, currentParticipants: 18, maxParticipants: 50,
    deadline: '2026-06-12', category: 'Tubers', vendor: 'FarmConnect', status: 'open',
  },
  {
    id: 'GB-005', title: 'Semovita (10kg x 5 bags)', description: 'Bulk semovita purchase. Split among group members.',
    image: '🥣', unitPrice: 8500, groupPrice: 6800, minParticipants: 5, currentParticipants: 5, maxParticipants: 10,
    deadline: '2026-06-08', category: 'Swallow', vendor: 'FoodMart', status: 'filled',
  },
  {
    id: 'GB-006', title: 'Dried Catfish (Wholesale)', description: 'Premium dried catfish. 5kg minimum per person in group.',
    image: '🐟', unitPrice: 12000, groupPrice: 9000, minParticipants: 10, currentParticipants: 3, maxParticipants: 20,
    deadline: '2026-06-25', category: 'Protein', vendor: 'FishMarket', status: 'open',
  },
];

export default function GroupBuyPage() {
  const { createEscrow, totalBalance, isLoading } = useWallet();
  const [selectedItem, setSelectedItem] = useState<GroupBuyItem | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const handleJoinGroup = async () => {
    if (!selectedItem) return;
    const totalCost = selectedItem.groupPrice * quantity;
    if (totalCost > totalBalance) return;

    // Create escrow for the group buy
    await createEscrow(
      totalCost,
      'NGN',
      selectedItem.vendor,
      selectedItem.id,
      `Group Buy: ${selectedItem.title} x${quantity}`
    );
    setJoinSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-surface-dark">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white text-center">
          <motion.h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Group Buy <Users className="inline" size={28} />
          </motion.h1>
          <motion.p className="text-white/80 max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Buy in bulk with others at wholesale prices. Your funds are held in escrow until the group is complete and delivery is confirmed.
          </motion.p>
        </section>

        {/* How it works */}
        <section className="py-8 px-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Join a Group', desc: 'Pick a product and join', icon: '🎯' },
              { step: '2', title: 'Funds Held in Escrow', desc: 'Your money is safe', icon: '🔒' },
              { step: '3', title: 'Group Fills Up', desc: 'Wait for minimum members', icon: '👥' },
              { step: '4', title: 'Delivery & Release', desc: 'Confirm & funds released', icon: '✅' },
            ].map((s) => (
              <div key={s.step} className="text-center p-4 rounded-2xl bg-white dark:bg-card-dark shadow-soft">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <h4 className="font-heading font-bold text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Group Buy Items */}
        <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <h2 className="text-xl font-heading font-bold mb-6">Active Group Buys</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {groupBuyItems.map((item, i) => {
              const progress = Math.round((item.currentParticipants / item.minParticipants) * 100);
              const savings = Math.round(((item.unitPrice - item.groupPrice) / item.unitPrice) * 100);
              const isFilled = item.status === 'filled';

              return (
                <motion.div
                  key={item.id}
                  className="rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="h-28 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center relative">
                    <span className="text-4xl">{item.image}</span>
                    {isFilled && (
                      <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-accent text-white text-[10px] font-bold">FILLED</span>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-error/90 text-white text-[10px] font-bold">
                      Save {savings}%
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs text-gray-400 line-through">₦{item.unitPrice.toLocaleString()}</span>
                        <span className="ml-2 font-heading font-bold text-primary">₦{item.groupPrice.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.vendor}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>{item.currentParticipants}/{item.minParticipants} joined</span>
                        <span>{Math.min(progress, 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className={`h-full rounded-full transition-all ${isFilled ? 'bg-accent' : 'bg-primary'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> Ends {new Date(item.deadline).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => { setSelectedItem(item); setShowJoinModal(true); setJoinSuccess(false); setQuantity(1); }}
                        disabled={isFilled}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isFilled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                      >
                        {isFilled ? 'Full' : 'Join Group'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Join Modal */}
        <AnimatePresence>
          {showJoinModal && selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinModal(false)}
            >
              <motion.div
                className="w-full max-w-md bg-white dark:bg-card-dark rounded-3xl p-6 space-y-5"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {!joinSuccess ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-lg">Join Group Buy</h3>
                      <button onClick={() => setShowJoinModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <span className="text-3xl">{selectedItem.image}</span>
                      <div>
                        <h4 className="font-bold text-sm">{selectedItem.title}</h4>
                        <p className="text-xs text-gray-500">{selectedItem.vendor}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <p className="text-xs text-gray-500">Group Price</p>
                        <p className="font-heading font-bold text-accent">₦{selectedItem.groupPrice.toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                        <p className="text-xs text-gray-500">You Save</p>
                        <p className="font-heading font-bold text-error">₦{(selectedItem.unitPrice - selectedItem.groupPrice).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Quantity</label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold">-</button>
                        <span className="text-lg font-bold">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold">+</button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total (held in escrow)</span>
                        <span className="font-heading font-bold text-primary">₦{(selectedItem.groupPrice * quantity).toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Funds held safely until delivery is confirmed. Full refund if group doesn&apos;t fill.</p>
                    </div>

                    <div className="text-xs text-gray-400">Wallet Balance: ₦{totalBalance.toLocaleString()}</div>

                    <button
                      onClick={handleJoinGroup}
                      disabled={isLoading || (selectedItem.groupPrice * quantity) > totalBalance}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : `Join & Pay ₦${(selectedItem.groupPrice * quantity).toLocaleString()}`}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
                      <CheckCircle size={64} className="mx-auto text-accent mb-4" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-xl mb-2">You&apos;re In! 🎉</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Your ₦{(selectedItem.groupPrice * quantity).toLocaleString()} is held in escrow. You&apos;ll be notified when the group fills up and delivery begins.
                    </p>
                    <button onClick={() => setShowJoinModal(false)} className="btn-primary px-6">Done</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
