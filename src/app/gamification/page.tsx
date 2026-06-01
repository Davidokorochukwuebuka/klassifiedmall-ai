'use client';

import { motion } from 'framer-motion';
import { Award, Star, Zap } from 'lucide-react';

const badges = [
  { name: 'First Sale', icon: '🏷️', earned: true, desc: 'Complete your first sale' },
  { name: 'Top Rated', icon: '⭐', earned: true, desc: 'Maintain 4.5+ rating' },
  { name: '100 Orders', icon: '📦', earned: true, desc: 'Fulfill 100 orders' },
  { name: 'Community Hero', icon: '🦸', earned: false, desc: 'Help 50 community members' },
  { name: 'Investor Ready', icon: '💎', earned: false, desc: 'Complete investment checklist' },
  { name: 'Speed Demon', icon: '⚡', earned: true, desc: 'Ship within 1 hour 10 times' },
  { name: 'Charity Champion', icon: '💜', earned: false, desc: 'Donate to 5 campaigns' },
  { name: 'Course Creator', icon: '🎓', earned: false, desc: 'Publish your first course' },
];

export default function GamificationPage() {
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Award size={24} className="text-secondary" /> My Badges & XP</motion.h1>

        <motion.div className="rounded-card bg-gradient-to-r from-primary to-primary-dark text-white p-6 flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div><div className="text-sm opacity-80">Your Level</div><div className="text-3xl font-heading font-bold">Level 7</div><div className="text-sm opacity-80 mt-1">5,400 / 8,000 XP to next level</div></div>
          <Zap size={48} className="text-secondary" />
        </motion.div>

        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-secondary" style={{ width: '67%' }} /></div>

        <h2 className="font-heading font-semibold">Badges ({earnedCount}/{badges.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div key={b.name} className={`p-4 rounded-card text-center ${b.earned ? 'bg-white dark:bg-card-dark shadow-soft' : 'bg-gray-100 dark:bg-gray-800 opacity-50'}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: b.earned ? 1 : 0.5, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-medium text-sm">{b.name}</div>
              <div className="text-xs text-gray-500 mt-1">{b.desc}</div>
              {b.earned && <span className="text-xs text-accent mt-2 block">✓ Earned</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
