'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { icon: DollarSign, value: '₦500M+', label: 'Platform Transactions' },
  { icon: Users, value: '10,000+', label: 'Active Vendors' },
  { icon: TrendingUp, value: '300%', label: 'YoY Growth' },
];

export default function InvestorSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#0f172a] to-[#1a0533] text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Invest in Growing Businesses
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Back verified vendors, trade stocks of top public companies, track performance, earn returns, and grow the ecosystem.
        </motion.p>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <s.icon size={24} className="mx-auto mb-2 text-accent" />
              <div className="text-2xl sm:text-3xl font-heading font-bold">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <Link href="/investors" className="btn-primary text-lg px-8 py-4">
          Become an Investor
        </Link>
      </div>
    </section>
  );
}
