'use client';

import { motion } from 'framer-motion';
import { FileText, Presentation, Palette, Sparkles } from 'lucide-react';
import Link from 'next/link';

const tools = [
  { icon: FileText, title: 'Business Plan Generator', desc: 'AMI creates a full business plan from your store data.', cta: 'Generate Plan', color: '#6C2BD9', href: '#' },
  { icon: Presentation, title: 'Pitch Deck Builder', desc: 'Create investor-ready slides in minutes.', cta: 'Build Deck', color: '#2563EB', href: '#' },
  { icon: Palette, title: 'Brand DNA Kit', desc: 'Extract your brand identity, voice, and strategic positioning.', cta: 'Extract DNA', color: '#10B981', href: '/tools/brand-dna' },
  { icon: Sparkles, title: 'Business Model Canvas', desc: 'Map your value proposition and revenue streams.', cta: 'Start Canvas', color: '#F59E0B', href: '#' },
];

export default function BusinessToolsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold">Business Tools</h1>
      <p className="text-gray-500 text-sm">AMI-powered tools to grow and professionalize your business.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((t, i) => (
          <motion.div key={t.title} className="p-6 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${t.color}15` }}>
              <t.icon size={24} style={{ color: t.color }} />
            </div>
            <h3 className="font-heading font-semibold mb-1">{t.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{t.desc}</p>
            <Link href={t.href} className="btn-primary text-sm px-4 py-2">{t.cta}</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

