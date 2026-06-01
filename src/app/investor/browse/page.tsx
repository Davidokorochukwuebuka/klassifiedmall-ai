'use client';

import { motion } from 'framer-motion';
import { Search, TrendingUp, Users, Star } from 'lucide-react';
import Link from 'next/link';

const businesses = [
  { id: '1', name: 'FreshFarms NG', category: 'Groceries', revenue: '₦1.2M/mo', growth: '+24%', rating: 4.9, seeking: '₦5M' },
  { id: '2', name: 'TechHub Lagos', category: 'Electronics', revenue: '₦3.5M/mo', growth: '+18%', rating: 4.8, seeking: '₦10M' },
  { id: '3', name: 'Chef Amara', category: 'Food', revenue: '₦800K/mo', growth: '+35%', rating: 4.7, seeking: '₦2M' },
  { id: '4', name: 'StyleBox', category: 'Fashion', revenue: '₦2.1M/mo', growth: '+15%', rating: 4.9, seeking: '₦8M' },
];

export default function BrowseBusinessesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold">Browse Businesses</h1>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search businesses..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
      </div>

      <div className="space-y-4">
        {businesses.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/investor/business/${b.id}`} className="block p-5 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-heading font-semibold">{b.name}</h3>
                  <span className="text-xs text-gray-500">{b.category}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-pill bg-accent/10 text-accent font-medium">Seeking {b.seeking}</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                <span>Revenue: {b.revenue}</span>
                <span className="flex items-center gap-1 text-accent"><TrendingUp size={12} />{b.growth}</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-warning" />{b.rating}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
