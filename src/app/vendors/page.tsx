'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const vendors = [
  { id: '1', name: 'Fresh Farms NG', type: 'Groceries', rating: 4.9, location: 'Lagos', badge: 'Top Seller', icon: '🥬' },
  { id: '2', name: 'TechHub Lagos', type: 'Electronics', rating: 4.8, location: 'Lagos', badge: 'Verified', icon: '📱' },
  { id: '3', name: 'Chef Amara', type: 'Food', rating: 4.7, location: 'Abuja', badge: 'Premium', icon: '👨‍🍳' },
  { id: '4', name: 'StyleBox', type: 'Fashion', rating: 4.9, location: 'Lagos', badge: 'Top Seller', icon: '👗' },
  { id: '5', name: 'HealthFirst', type: 'Health & Beauty', rating: 4.6, location: 'Port Harcourt', badge: 'Verified', icon: '🧴' },
  { id: '6', name: 'SportZone', type: 'Sports & Fitness', rating: 4.5, location: 'Lagos', badge: 'Verified', icon: '⚽' },
  { id: '7', name: 'AgriMart', type: 'Agriculture', rating: 4.4, location: 'Ibadan', badge: 'Verified', icon: '🌾' },
  { id: '8', name: 'GreenTech', type: 'Home & Living', rating: 4.7, location: 'Lagos', badge: 'Premium', icon: '☀️' },
  { id: '9', name: 'SpiceKing', type: 'Food', rating: 4.6, location: 'Kano', badge: 'Verified', icon: '🌶️' },
  { id: '10', name: 'BookWorm NG', type: 'Books & Media', rating: 4.8, location: 'Lagos', badge: 'Top Seller', icon: '📚' },
  { id: '11', name: 'AutoParts Hub', type: 'Automotive', rating: 4.3, location: 'Nnewi', badge: 'Verified', icon: '🚗' },
  { id: '12', name: 'EduLearn', type: 'Courses', rating: 4.9, location: 'Online', badge: 'Premium', icon: '🎓' },
];

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Navbar />

      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary-dark to-[#0f172a]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Vendors
          </motion.h1>
          <motion.p
            className="text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Discover trusted sellers across all categories
          </motion.p>
          <motion.div
            className="max-w-lg mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/vendors/${vendor.id}`}
                  className="block rounded-2xl bg-white dark:bg-card-dark shadow-soft p-5 hover:shadow-glow transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {vendor.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="font-heading font-semibold text-sm truncate">{vendor.name}</h3>
                        <BadgeCheck size={14} className="text-primary flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-500">{vendor.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-warning fill-warning" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={10} /> {vendor.location}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-pill bg-primary/10 text-primary font-medium">
                      {vendor.badge}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
