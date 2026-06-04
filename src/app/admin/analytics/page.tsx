'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import { getAcquisitionAnalytics, getAdminUserStats } from '@/lib/admin-api';

interface AcquisitionData {
  period: string;
  totalNewUsers: number;
  dailySignups: Record<string, number>;
  byAccountType: Record<string, number>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AcquisitionData | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, [days]);

  async function load() {
    setLoading(true);
    try {
      const [analytics, stats] = await Promise.all([
        getAcquisitionAnalytics(days),
        getAdminUserStats(),
      ]);
      setData(analytics.data);
      setTotalUsers(stats.data.totalUsers);
    } catch (err: any) {
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  }

  const sortedDays = data ? Object.entries(data.dailySignups).sort(([a], [b]) => a.localeCompare(b)) : [];
  const maxSignups = sortedDays.length ? Math.max(...sortedDays.map(([, v]) => v)) : 1;
  const sortedTypes = data ? Object.entries(data.byAccountType).sort(([, a], [, b]) => b - a) : [];
  const typeColors = ['#6C2BD9', '#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];

  if (loading) return <div className="p-6 text-center text-gray-500">Loading analytics...</div>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><TrendingUp size={24} /> Acquisition Analytics</h1>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="px-3 py-2 rounded-btn border text-sm">
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div className="p-5 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Users size={18} className="text-primary" />
          <div className="text-2xl font-heading font-bold mt-2">{totalUsers.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total Users</div>
        </motion.div>
        <motion.div className="p-5 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <TrendingUp size={18} className="text-accent" />
          <div className="text-2xl font-heading font-bold mt-2">{data?.totalNewUsers || 0}</div>
          <div className="text-xs text-gray-500">New Users ({days}d)</div>
        </motion.div>
        <motion.div className="p-5 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Calendar size={18} className="text-secondary" />
          <div className="text-2xl font-heading font-bold mt-2">{data?.totalNewUsers ? Math.round(data.totalNewUsers / days) : 0}</div>
          <div className="text-xs text-gray-500">Avg / Day</div>
        </motion.div>
      </div>

      {/* Daily Signups Chart */}
      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading font-semibold mb-4">Daily Signups</h2>
        {sortedDays.length === 0 ? (
          <p className="text-sm text-gray-500">No signups in this period.</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {sortedDays.map(([day, count], i) => (
              <div key={day} className="flex-1 flex flex-col items-center group" title={`${day}: ${count} signups`}>
                <motion.div
                  className="w-full bg-primary rounded-t min-h-[2px]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(count / maxSignups) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                />
                {sortedDays.length <= 14 && <span className="text-[9px] text-gray-400 mt-1 rotate-[-45deg]">{day.slice(5)}</span>}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* By Account Type */}
      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="font-heading font-semibold mb-4">Signups by Account Type</h2>
        {sortedTypes.length === 0 ? (
          <p className="text-sm text-gray-500">No data available.</p>
        ) : (
          <div className="space-y-3">
            {sortedTypes.map(([type, count], i) => {
              const pct = data?.totalNewUsers ? Math.round((count / data.totalNewUsers) * 100) : 0;
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-sm w-28 truncate">{type}</span>
                  <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: typeColors[i % typeColors.length] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{count}</span>
                  <span className="text-xs text-gray-400 w-10">{pct}%</span>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
