'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const members = ['Adaeze N.', 'Chidi O.', 'Fatima B.', 'Emeka A.', 'Grace I.'];
const posts = [
  { author: 'Adaeze N.', text: 'Anyone tried the new Paystack integration? Works great!', time: '1h ago' },
  { author: 'Emeka A.', text: 'Pro tip: Use the bulk upload feature for inventory. Saves hours.', time: '3h ago' },
];

export default function GroupPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/community" className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"><ArrowLeft size={14} /> Community</Link>

        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-heading font-bold">Vendor Success Tips</h1>
          <p className="text-sm text-gray-500 mt-1">A group for vendors to share strategies and help each other grow.</p>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500"><Users size={14} />{members.length} members</div>
        </motion.div>

        <div className="space-y-3">
          {posts.map((p, i) => (
            <motion.div key={i} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold text-secondary">{p.author[0]}</div><span className="font-medium text-sm">{p.author}</span><span className="text-xs text-gray-400">{p.time}</span></div>
              <p className="text-sm">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
