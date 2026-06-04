'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Truck, BookOpen, Users, Warehouse, Wallet, Heart, TrendingUp } from 'lucide-react';

const actions = [
  { label: 'Shop', icon: ShoppingBag, href: '/products', color: '#3B82F6' },
  { label: 'Hail Rider', icon: Truck, href: '/hail', color: '#10B981' },
  { label: 'Wallet', icon: Wallet, href: '/wallet', color: '#D4A017' },
  { label: 'Community', icon: Users, href: '/community', color: '#EC4899' },
  { label: 'Spaces', icon: Warehouse, href: '/spaces', color: '#F59E0B' },
  { label: 'Learn', icon: BookOpen, href: '/learn', color: '#8B5CF6' },
  { label: 'Charity', icon: Heart, href: '/charity', color: '#EF4444' },
  { label: 'Invest', icon: TrendingUp, href: '/investors', color: '#6366F1' },
];

export default function QuickActions() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {actions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={action.href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon size={22} style={{ color: action.color }} />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

