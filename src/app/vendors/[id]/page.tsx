'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, ShoppingCart, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

const vendorProducts = [
  { id: '1', name: 'Organic Honey', price: '₦4,500', image: '🍯' },
  { id: '2', name: 'Raw Shea Butter', price: '₦3,200', image: '🧈' },
  { id: '3', name: 'Palm Oil (5L)', price: '₦7,800', image: '🫒' },
  { id: '4', name: 'Dried Catfish', price: '₦5,500', image: '🐟' },
];

export default function VendorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl shrink-0">🏪</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-bold">FreshFarms NG</h1>
                <BadgeCheck size={18} className="text-primary" />
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> Lekki, Lagos</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1"><Star size={14} className="text-warning fill-warning" /><span className="text-sm font-medium">4.9</span><span className="text-xs text-gray-500">(128 reviews)</span></div>
                <span className="text-xs text-gray-500">· 42 products · Joined 2023</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">Premium organic produce delivered fresh to your door. We source directly from local farmers.</p>
            </div>
          </div>
        </motion.div>

        <h2 className="font-heading font-semibold text-lg">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vendorProducts.map((p, i) => (
            <motion.div key={p.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/products/${p.id}`}>
                <div className="h-28 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl mb-3">{p.image}</div>
                <h3 className="font-medium text-sm truncate">{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-heading font-bold text-primary text-sm">{p.price}</span>
                  <button className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center" aria-label="Add to cart"><ShoppingCart size={12} /></button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
