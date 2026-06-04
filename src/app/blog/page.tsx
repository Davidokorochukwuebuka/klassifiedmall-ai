'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const posts = [
  { slug: '1', title: 'How to Start Selling on KlASSIFIED', excerpt: 'A step-by-step guide to launching your store and making your first sale.', date: 'May 28, 2024', category: 'Guides', readTime: '5 min' },
  { slug: '2', title: '10 Tips for Growing Your Online Business', excerpt: 'Proven strategies from top vendors on the platform.', date: 'May 25, 2024', category: 'Business', readTime: '7 min' },
  { slug: '3', title: 'Introducing: Investment Tools for Vendors', excerpt: 'Get your business investor-ready with our new AI-powered tools.', date: 'May 20, 2024', category: 'Product', readTime: '4 min' },
  { slug: '4', title: 'Community Impact: ₦10M Raised for Charity', excerpt: 'How our users are making a difference through the Fund a Need feature.', date: 'May 15, 2024', category: 'Impact', readTime: '3 min' },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding max-w-5xl mx-auto">
          <motion.h1 className="text-3xl font-heading font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Blog</motion.h1>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((p, i) => (
              <motion.article key={p.slug} className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden hover:shadow-glow transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2"><span className="px-2 py-0.5 rounded-pill bg-secondary/10 text-secondary">{p.category}</span><span>{p.date}</span><span>· {p.readTime}</span></div>
                  <h2 className="font-heading font-semibold text-lg mb-2">{p.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{p.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

