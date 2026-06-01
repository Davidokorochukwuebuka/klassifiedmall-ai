'use client';

import { motion } from 'framer-motion';
import { Bell, Package, Tag, MessageCircle, TrendingUp } from 'lucide-react';

const notifications = [
  { id: '1', icon: Package, title: 'Order Shipped', desc: 'Your order ORD-002 is on its way!', time: '2 hours ago', read: false },
  { id: '2', icon: Tag, title: 'Flash Sale!', desc: '50% off electronics today only.', time: '5 hours ago', read: false },
  { id: '3', icon: MessageCircle, title: 'New Message', desc: 'TechHub replied to your inquiry.', time: '1 day ago', read: true },
  { id: '4', icon: TrendingUp, title: 'Price Drop', desc: 'Smart Watch is now ₦20,000.', time: '2 days ago', read: true },
  { id: '5', icon: Package, title: 'Order Delivered', desc: 'ORD-001 has been delivered.', time: '3 days ago', read: true },
];

export default function NotificationsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Bell size={24} /> Notifications</h1>
        <button className="text-sm text-primary hover:underline">Mark all read</button>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            className={`flex items-start gap-4 p-4 rounded-card transition-all ${n.read ? 'bg-white dark:bg-card-dark' : 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'} shadow-soft`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <n.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{n.title}</div>
              <div className="text-xs text-gray-500 truncate">{n.desc}</div>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
