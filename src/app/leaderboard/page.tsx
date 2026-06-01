'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, TrendingUp } from 'lucide-react';

const leaders = [
  { rank: 1, name: 'FreshFarms NG', xp: 12500, badge: '🥇', type: 'Vendor' },
  { rank: 2, name: 'TechHub Lagos', xp: 11200, badge: '🥈', type: 'Vendor' },
  { rank: 3, name: 'Chef Amara', xp: 9800, badge: '🥉', type: 'Vendor' },
  { rank: 4, name: 'Emeka A.', xp: 8500, badge: '', type: 'Driver' },
  { rank: 5, name: 'Grace I.', xp: 7200, badge: '', type: 'Coach' },
  { rank: 6, name: 'StyleBox', xp: 6800, badge: '', type: 'Vendor' },
  { rank: 7, name: 'Adaeze N.', xp: 5400, badge: '', type: 'Customer' },
  { rank: 8, name: 'Chidi O.', xp: 4900, badge: '', type: 'Investor' },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Trophy size={24} className="text-secondary" /> Leaderboard</motion.h1>

        <div className="space-y-2">
          {leaders.map((l, i) => (
            <motion.div key={l.name} className={`flex items-center gap-4 p-4 rounded-card shadow-soft ${l.rank <= 3 ? 'bg-secondary/5 border border-secondary/20' : 'bg-white dark:bg-card-dark'}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="w-8 text-center font-heading font-bold text-lg">{l.badge || `#${l.rank}`}</div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{l.name[0]}</div>
              <div className="flex-1"><div className="font-medium text-sm">{l.name}</div><div className="text-xs text-gray-500">{l.type}</div></div>
              <div className="text-right"><div className="font-heading font-bold text-secondary">{l.xp.toLocaleString()} XP</div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
