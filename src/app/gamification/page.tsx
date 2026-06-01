'use client';

import { motion } from 'framer-motion';
import { Award, Zap, Trophy, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Badge { id: string; name: string; description: string; icon: string; earnedAt?: string; category: string; }
interface UserPoints { totalPoints: number; level: number; levelName: string; nextLevelPoints: number; badges: Badge[]; streak: number; }

export default function GamificationPage() {
  const [data, setData] = useState<{ userPoints: UserPoints; allBadges: Badge[] } | null>(null);

  useEffect(() => {
    fetch('/api/gamification').then(r => r.json()).then(r => setData(r.data));
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">🎮</div></div>;

  const { userPoints, allBadges } = data;
  const progress = Math.min((userPoints.totalPoints / userPoints.nextLevelPoints) * 100, 100);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Award size={24} className="text-secondary" /> My Badges & XP
        </motion.h1>

        <motion.div className="rounded-card bg-gradient-to-r from-primary to-primary-dark text-white p-6 flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <div className="text-sm opacity-80">Your Level</div>
            <div className="text-3xl font-heading font-bold">Level {userPoints.level} — {userPoints.levelName}</div>
            <div className="text-sm opacity-80 mt-1">{userPoints.totalPoints.toLocaleString()} / {userPoints.nextLevelPoints.toLocaleString()} XP to next level</div>
          </div>
          <Zap size={48} className="text-secondary" />
        </motion.div>

        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white dark:bg-card-dark rounded-card p-4 text-center shadow-soft">
            <Flame className="mx-auto text-orange-500" size={24} />
            <div className="text-2xl font-bold mt-1">{userPoints.streak}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="flex-1 bg-white dark:bg-card-dark rounded-card p-4 text-center shadow-soft">
            <Award className="mx-auto text-purple-500" size={24} />
            <div className="text-2xl font-bold mt-1">{userPoints.badges.length}</div>
            <div className="text-xs text-gray-500">Badges Earned</div>
          </div>
          <Link href="/leaderboard" className="flex-1 bg-white dark:bg-card-dark rounded-card p-4 text-center shadow-soft hover:ring-2 ring-secondary transition-all">
            <Trophy className="mx-auto text-yellow-500" size={24} />
            <div className="text-2xl font-bold mt-1">View</div>
            <div className="text-xs text-gray-500">Leaderboard</div>
          </Link>
        </div>

        <h2 className="font-heading font-semibold">Badges ({userPoints.badges.length}/{allBadges.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allBadges.map((b, i) => {
            const earned = userPoints.badges.some(ub => ub.id === b.id);
            return (
              <motion.div key={b.id} className={`p-4 rounded-card text-center ${earned ? 'bg-white dark:bg-card-dark shadow-soft' : 'bg-gray-100 dark:bg-gray-800 opacity-50'}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: earned ? 1 : 0.5, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <div className="text-3xl mb-2">{b.icon}</div>
                <div className="font-medium text-sm">{b.name}</div>
                <div className="text-xs text-gray-500 mt-1">{b.description}</div>
                {earned && <span className="text-xs text-accent mt-2 block">✓ Earned</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
