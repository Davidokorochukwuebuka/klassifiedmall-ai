'use client';

import { motion } from 'framer-motion';
import { Gift, Search, Heart } from 'lucide-react';

const giftItems = [
  { id: '1', name: 'Gift Basket - Premium', price: '₦15,000', image: '🎁' },
  { id: '2', name: 'Chocolate Box', price: '₦8,000', image: '🍫' },
  { id: '3', name: 'Flower Bouquet', price: '₦12,000', image: '💐' },
  { id: '4', name: 'Perfume Set', price: '₦20,000', image: '🧴' },
  { id: '5', name: 'Tech Gadget Bundle', price: '₦35,000', image: '📱' },
  { id: '6', name: 'Spa & Wellness Kit', price: '₦18,000', image: '🧖' },
];

export default function GiftPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-bold flex items-center justify-center gap-2"><Gift size={28} className="text-secondary" /> Send a Gift</h1>
          <p className="text-gray-500 mt-2">Surprise someone special with a thoughtful gift delivered to their door.</p>
        </motion.div>

        <form className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <h2 className="font-heading font-semibold">Recipient Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Recipient name" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
            <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
          </div>
          <input type="text" placeholder="Delivery address" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
          <textarea rows={2} placeholder="Personal message (optional)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary resize-none" />
        </form>

        <h2 className="font-heading font-semibold">Choose a Gift</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {giftItems.map((g, i) => (
            <motion.div key={g.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-4 text-center hover:shadow-glow transition-all cursor-pointer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="text-4xl mb-2">{g.image}</div>
              <h3 className="font-medium text-sm">{g.name}</h3>
              <p className="font-heading font-bold text-secondary mt-1">{g.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
