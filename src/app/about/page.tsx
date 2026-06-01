'use client';

import { motion } from 'framer-motion';
import { Target, Users, Globe, Heart } from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const values = [
  { icon: Target, title: 'Mission', desc: 'Empower African entrepreneurs and connect communities through technology.' },
  { icon: Users, title: 'Community', desc: 'Building a thriving ecosystem of vendors, customers, drivers, and investors.' },
  { icon: Globe, title: 'Accessibility', desc: 'Making commerce accessible to everyone, everywhere in Africa.' },
  { icon: Heart, title: 'Impact', desc: 'Creating real economic impact through charity, education, and opportunity.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-center">
          <motion.h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>About KlASSIFIED</motion.h1>
          <motion.p className="text-lg text-white/80 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>The super-app marketplace for Africa. We&apos;re building the everything platform — shop, sell, deliver, learn, invest, and give.</motion.p>
        </section>

        <section className="section-padding max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} className="text-center p-6 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <v.icon size={32} className="mx-auto text-secondary mb-3" />
                <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section-padding bg-gray-50 dark:bg-surface-dark text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Our Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[{ v: '10,000+', l: 'Vendors' }, { v: '50,000+', l: 'Customers' }, { v: '₦500M+', l: 'Transactions' }, { v: '5,000+', l: 'Deliveries/day' }].map((s) => (
              <div key={s.l}><div className="text-2xl font-heading font-bold text-primary">{s.v}</div><div className="text-sm text-gray-500">{s.l}</div></div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
