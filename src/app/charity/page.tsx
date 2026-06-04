'use client';

import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import CharitySection from '@/components/home/CharitySection';

const campaigns = [
  { id: '1', title: 'School Supplies for 100 Kids', raised: 320000, goal: 500000, donors: 84, image: '📚' },
  { id: '2', title: 'Feed the Community', raised: 180000, goal: 250000, donors: 56, image: '🍲' },
  { id: '3', title: 'Medical Aid for Mama Nkechi', raised: 450000, goal: 600000, donors: 120, image: '🏥' },
  { id: '4', title: 'Build a Library in Aba', raised: 800000, goal: 2000000, donors: 200, image: '📖' },
  { id: '5', title: 'Clean Water for Ogun Village', raised: 150000, goal: 400000, donors: 42, image: '💧' },
  { id: '6', title: 'Tech Training for Youth', raised: 600000, goal: 1000000, donors: 95, image: '💻' },
];

export default function CharityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-center">
          <motion.h1 className="text-4xl font-heading font-bold mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Fund a Need <Heart className="inline text-secondary" size={28} /></motion.h1>
          <p className="text-white/80">Support verified campaigns and make a real difference.</p>
        </section>

        {/* Make Someone's Day - Gifting Section (same as homepage) */}
        <CharitySection />

        {/* All Campaigns */}
        <section className="section-padding max-w-6xl mx-auto">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">All Campaigns</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c, i) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <motion.div key={c.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="h-32 bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center text-4xl">{c.image}</div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold mb-3">{c.title}</h3>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mb-2"><div className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }} /></div>
                    <div className="flex justify-between text-sm mb-3"><span className="text-gray-500">₦{(c.raised / 1000).toFixed(0)}K / ₦{(c.goal / 1000).toFixed(0)}K</span><span className="font-bold text-secondary">{pct}%</span></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={12} />{c.donors} donors</span>
                      <Link href={`/fund/${c.id}`} className="text-sm px-4 py-1.5 rounded-btn bg-secondary text-white hover:bg-secondary-dark">Donate</Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

