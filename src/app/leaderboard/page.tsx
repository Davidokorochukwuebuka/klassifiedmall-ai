'use client';

import { motion } from 'framer-motion';
import { Trophy, Crown, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LeaderboardEntry { rank: number; userId: string; name: string; avatar: string; points: number; level: number; badges: number; }

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch('/api/gamification').then(r => r.json()).then(r => setEntries(r.data.leaderboard));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Trophy size={24} className="text-yellow-500" /> Leaderboard
        </motion.h1>

        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div key={entry.userId} className={`flex items-center gap-4 p-4 rounded-card ${i < 3 ? 'bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/20 dark:to-card-dark shadow-soft' : 'bg-white dark:bg-card-dark'}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="text-2xl w-8 text-center">{i < 3 ? medals[i] : <span className="text-gray-400 text-sm font-bold">#{entry.rank}</span>}</div>
              <div className="text-2xl">{entry.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{entry.name}</div>
                <div className="text-xs text-gray-500">Level {entry.level} • {entry.badges} badges</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
              {i === 0 && <Crown size={20} className="text-yellow-500" />}
            </motion.div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl mb-4">🏆</div>
            <p className="text-gray-500">Loading leaderboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
