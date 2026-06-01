'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const initialItems = [
  { id: '1', name: 'Smart Watch', price: '₦25,000', vendor: 'TechHub', image: '⌚' },
  { id: '2', name: 'Running Shoes', price: '₦18,000', vendor: 'SportZone', image: '👟' },
  { id: '3', name: 'Bluetooth Speaker', price: '₦15,000', vendor: 'TechHub', image: '🔊' },
  { id: '4', name: 'Skincare Set', price: '₦12,500', vendor: 'HealthFirst', image: '🧴' },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Heart size={24} className="text-error" /> Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div key={item.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="h-28 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl mb-3">{item.image}</div>
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.vendor}</p>
              <p className="font-heading font-bold text-primary mt-1">{item.price}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-btn bg-primary text-white hover:bg-primary-dark" aria-label="Add to cart">
                  <ShoppingCart size={12} /> Add
                </button>
                <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="p-2 rounded-btn text-gray-400 hover:text-error hover:bg-error/10" aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
