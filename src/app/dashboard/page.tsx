'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, ShoppingCart, Bell, TrendingUp, Clock, Loader2, Wallet } from 'lucide-react';
import Link from 'next/link';
import { getOrders, getCart, getNotifications } from '@/lib/api';
import { useWallet } from '@/lib/WalletContext';
import { useAuth } from '@/lib/AuthContext';

const statusColor: Record<string, string> = {
  DELIVERED: 'bg-accent/10 text-accent',
  COMPLETED: 'bg-accent/10 text-accent',
  IN_TRANSIT: 'bg-secondary/10 text-secondary',
  SHIPPED: 'bg-secondary/10 text-secondary',
  CONFIRMED: 'bg-secondary/10 text-secondary',
  PROCESSING: 'bg-warning/10 text-warning',
  PENDING_PAYMENT: 'bg-warning/10 text-warning',
  CANCELLED: 'bg-error/10 text-error',
};

export default function DashboardPage() {
  const { user, isAuthenticated, token } = useAuth();
  const { totalBalance } = useWallet();
  const [stats, setStats] = useState({ orders: 0, cartItems: 0, notifications: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadDashboard();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  async function loadDashboard() {
    setIsLoading(true);
    try {
      const [ordersRes, cartRes, notifRes] = await Promise.allSettled([
        getOrders(),
        getCart(),
        getNotifications(),
      ]);

      const orders = ordersRes.status === 'fulfilled' ? (ordersRes.value.data?.orders || []) : [];
      const cart = cartRes.status === 'fulfilled' ? (cartRes.value.data || cartRes.value) : { items: [] };
      const notifs = notifRes.status === 'fulfilled' ? (notifRes.value.data?.notifications || []) : [];

      setStats({
        orders: orders.length,
        cartItems: (cart.items || []).length,
        notifications: notifs.filter((n: any) => !n.read).length,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const statCards = [
    { label: 'Orders', value: String(stats.orders), icon: Package, color: '#6C2BD9', href: '/orders' },
    { label: 'Wallet', value: `₦${totalBalance.toLocaleString()}`, icon: Wallet, color: '#D4A017', href: '/wallet' },
    { label: 'Cart Items', value: String(stats.cartItems), icon: ShoppingCart, color: '#2563EB', href: '/cart' },
    { label: 'Notifications', value: String(stats.notifications), icon: Bell, color: '#F59E0B', href: '/notifications' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold">Welcome back{user?.name ? `, ${user.name}` : ''}! 👋</h1>
        <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with your account.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={s.href} className="block p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-xl font-heading font-bold">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold flex items-center gap-2"><Clock size={18} /> Recent Orders</h2>
          <Link href="/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm py-4 text-center">No orders yet. Start shopping!</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((o: any) => {
              const itemNames = (o.items || []).map((it: any) => it.title || it.name).join(', ') || 'Order';
              const status = o.status || 'PENDING_PAYMENT';
              const displayStatus = status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
              return (
                <Link key={o.orderId} href={`/orders/${o.orderId}`} className="flex items-center justify-between p-3 rounded-btn hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div>
                    <div className="font-medium text-sm truncate max-w-[200px]">{itemNames}</div>
                    <div className="text-xs text-gray-500">{o.orderId} · {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-semibold text-sm">₦{(o.totalAmount || 0).toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-pill ${statusColor[status] || 'bg-gray-100'}`}>{displayStatus}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="rounded-card bg-gradient-to-r from-primary/10 to-secondary/10 p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="font-heading font-semibold mb-3 flex items-center gap-2"><TrendingUp size={18} /> Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-primary text-sm px-4 py-2">Browse Products</Link>
          <Link href="/hail" className="btn-primary text-sm px-4 py-2 !bg-accent">Hail a Rider</Link>
          <Link href="/wallet" className="btn-secondary text-sm px-4 py-2 !text-gray-700 dark:!text-gray-200 !border-gray-300">My Wallet</Link>
          <Link href="/messages" className="btn-secondary text-sm px-4 py-2 !text-gray-700 dark:!text-gray-200 !border-gray-300">Messages</Link>
        </div>
      </motion.div>
    </div>
  );
}

