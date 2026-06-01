'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Users, Clock } from 'lucide-react';

const threads = [
  { title: 'Best practices for product photography?', author: 'Adaeze N.', replies: 24, views: 180, lastActivity: '30 min ago' },
  { title: 'How to handle difficult customers', author: 'Chidi O.', replies: 18, views: 120, lastActivity: '2h ago' },
  { title: 'Paystack vs Flutterwave - which is better?', author: 'Emeka A.', replies: 32, views: 250, lastActivity: '4h ago' },
  { title: 'Tips for getting your first 100 orders', author: 'Grace I.', replies: 45, views: 380, lastActivity: '6h ago' },
  { title: 'Cold storage recommendations in Lagos?', author: 'Fatima B.', replies: 8, views: 65, lastActivity: '1d ago' },
];

export default function ForumsPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MessageSquare size={24} className="text-secondary" /> Forums</h1>
          <button className="btn-primary text-sm px-4 py-2">New Thread</button>
        </div>

        <div className="space-y-2">
          {threads.map((t, i) => (
            <motion.div key={t.title} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all cursor-pointer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <h3 className="font-medium mb-1">{t.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>by {t.author}</span>
                <span className="flex items-center gap-1"><MessageSquare size={10} />{t.replies} replies</span>
                <span className="flex items-center gap-1"><Users size={10} />{t.views} views</span>
                <span className="flex items-center gap-1"><Clock size={10} />{t.lastActivity}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
