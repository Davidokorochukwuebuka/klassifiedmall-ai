'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';

const products = [
  { name: 'Organic Honey', price: '₦4,500', image: '🍯', vendor: 'FreshFarms' },
  { name: 'Wireless Earbuds', price: '₦12,000', image: '🎧', vendor: 'TechHub' },
  { name: 'Ankara Dress', price: '₦8,500', image: '👗', vendor: 'StyleBox' },
  { name: 'Jollof Rice Pack', price: '₦3,200', image: '🍚', vendor: 'Chef Amara' },
  { name: 'Vitamin C Serum', price: '₦6,800', image: '🧴', vendor: 'HealthFirst' },
  { name: 'Smart Watch', price: '₦25,000', image: '⌚', vendor: 'TechHub' },
];

export default function TrendingProducts() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0c1222]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trending Now
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              className="group rounded-card bg-white dark:bg-card-dark shadow-soft p-4 transition-all hover:shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-32 sm:h-40 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl mb-3">
                {p.image}
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Add to wishlist">
                  <Heart size={14} className="text-gray-600" />
                </button>
              </div>
              <h3 className="font-medium text-sm truncate">{p.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{p.vendor}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-heading font-bold text-primary">{p.price}</span>
                <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Add to cart">
                  <ShoppingCart size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
