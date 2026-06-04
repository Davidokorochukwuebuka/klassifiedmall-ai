'use client';

import { motion } from 'framer-motion';
import { FileText, Presentation, Palette, Rocket, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';

const tools = [
  { icon: FileText, title: 'Business Plan', desc: 'AI-generated plans tailored to your business.', href: '/tools' },
  { icon: Presentation, title: 'Pitch Deck', desc: 'Investor-ready decks in minutes.', href: '/tools' },
  { icon: Palette, title: 'Brand DNA', desc: 'Logo, colors, and brand identity kit.', href: '/tools/brand-dna' },
  { icon: Rocket, title: 'Go-to-Market', desc: 'Launch strategy, pricing, and distribution plan for startups.', href: '/tools' },
  { icon: TrendingUp, title: 'Revenue Streams', desc: 'Identify and activate multiple income channels.', href: '/tools' },
  { icon: Target, title: 'Market Analysis', desc: 'Competitor research and market sizing powered by AMI.', href: '/tools' },
];

export default function BusinessTools() {
  return (
    <section className="section-padding bg-white dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3">Build Your Business</h2>
          <p className="text-gray-600 dark:text-gray-400">Free AMI-powered tools to launch, grow, and scale.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t, i) => (
            <motion.div
              key={t.title}
              className="p-6 rounded-card border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-glow transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <t.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{t.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.desc}</p>
              <Link href={t.href} className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">
                Try Now →
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/tools" className="btn-primary">Explore All Tools</Link>
        </div>
      </div>
    </section>
  );
}

