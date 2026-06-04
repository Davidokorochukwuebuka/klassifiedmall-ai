'use client';

import { motion } from 'framer-motion';
import { FileText, Presentation, Palette, Sparkles, Wrench } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const tools = [
  { icon: FileText, title: 'Business Plan Generator', desc: 'AMI creates a comprehensive business plan from your inputs.', cta: 'Generate Plan', href: '/auth/signup?type=vendor' },
  { icon: Presentation, title: 'Pitch Deck Builder', desc: 'Create investor-ready presentations in minutes.', cta: 'Build Deck', href: '/auth/signup?type=vendor' },
  { icon: Palette, title: 'Brand DNA Kit', desc: 'Extract your brand identity, voice, and strategic positioning.', cta: 'Extract DNA', href: '/tools/brand-dna' },
  { icon: Sparkles, title: 'Business Model Canvas', desc: 'Map your value proposition and revenue model.', cta: 'Start Canvas', href: '/auth/signup?type=vendor' },
];

export default function ToolsLandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-center">
          <motion.h1 className="text-4xl font-heading font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><Wrench className="inline text-secondary" size={32} /> Business Tools</motion.h1>
          <p className="text-white/80 max-w-xl mx-auto">Free AMI-powered tools to plan, brand, and grow your business.</p>
        </section>

        <section className="section-padding max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((t, i) => (
              <motion.div key={t.title} className="p-6 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <t.icon size={32} className="text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.desc}</p>
                <Link href={t.href} className="btn-primary text-sm px-4 py-2">{t.cta}</Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

