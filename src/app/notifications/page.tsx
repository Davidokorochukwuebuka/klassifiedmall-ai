'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Package, Tag, MessageCircle, TrendingUp, Loader2 } from 'lucide-react';
import { getNotifications, markNotificationRead } from '@/lib/api';

const iconMap: Record<string, any> = {
  order: Package,
  delivery: Package,
  payment: TrendingUp,
  promo: Tag,
  community: MessageCircle,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setIsLoading(true);
    try {
      const res = await getNotifications();
      setNotifications(res.data?.notifications || res.notifications || []);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMarkAllRead() {
    const unread = notifications.filter(n => !n.read);
    for (const n of unread) {
      try {
        await markNotificationRead(n.id);
      } catch (err) {
        // continue
      }
    }
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  }

  async function handleMarkRead(id: string) {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Bell size={24} /> Notifications</h1>
        <button onClick={handleMarkAllRead} className="text-sm text-primary hover:underline">Mark all read</button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔔</div>
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any, i: number) => {
            const Icon = iconMap[n.type] || Bell;
            return (
              <motion.div
                key={n.id || i}
                onClick={() => !n.read && handleMarkRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-card transition-all cursor-pointer ${n.read ? 'bg-white dark:bg-card-dark' : 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'} shadow-soft hover:shadow-glow`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-gray-500 truncate">{n.message || n.desc}</div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : n.time}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

