'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

const vendors = [
  { name: 'Fresh Farms NG', type: 'Groceries', rating: 4.9, image: '/vendors/1.jpg', badge: 'Top Seller' },
  { name: 'TechHub Lagos', type: 'Electronics', rating: 4.8, image: '/vendors/2.jpg', badge: 'Verified' },
  { name: 'Chef Amara', type: 'Food', rating: 4.7, image: '/vendors/3.jpg', badge: 'Premium' },
  { name: 'StyleBox', type: 'Fashion', rating: 4.9, image: '/vendors/4.jpg', badge: 'Top Seller' },
  { name: 'HealthFirst', type: 'Health', rating: 4.6, image: '/vendors/5.jpg', badge: 'Verified' },
];

export default function FeaturedVendors() {
  return (
    <section className="section-padding bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Vendors
        </motion.h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {vendors.map((v, i) => (
            <motion.div
              key={v.name}
              className="flex-shrink-0 snap-center w-72 glass rounded-card p-6 bg-white/80 dark:bg-white/5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 flex items-center justify-center">
                <span className="text-4xl">🏪</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading font-semibold">{v.name}</h3>
                <BadgeCheck size={16} className="text-primary" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{v.type}</p>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-sm font-medium">{v.rating}</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-pill bg-primary/10 text-primary font-medium">{v.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

