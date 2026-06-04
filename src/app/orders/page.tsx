'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getOrders } from '@/lib/api';

const statusStyle: Record<string, string> = {
  PENDING_PAYMENT: 'bg-warning/10 text-warning',
  CONFIRMED: 'bg-secondary/10 text-secondary',
  PROCESSING: 'bg-warning/10 text-warning',
  SHIPPED: 'bg-secondary/10 text-secondary',
  IN_TRANSIT: 'bg-secondary/10 text-secondary',
  DELIVERED: 'bg-accent/10 text-accent',
  COMPLETED: 'bg-accent/10 text-accent',
  CANCELLED: 'bg-error/10 text-error',
  REFUNDED: 'bg-error/10 text-error',
};

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <OrdersContent />
    </Suspense>
  );
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get('success') === 'true';
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setIsLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data?.orders || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const filtered = searchQuery
    ? orders.filter((o: any) =>
        (o.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.items || []).some((i: any) => (i.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : orders;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 text-accent px-4 py-3 rounded-xl text-sm flex items-center gap-2"
        >
          <CheckCircle size={16} /> Order placed successfully! You can track it below.
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Package size={24} /> My Orders</h1>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search orders..."
          className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500 mb-4">No orders yet</p>
          <Link href="/products" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o: any, i: number) => {
            const itemNames = (o.items || []).map((it: any) => it.title || it.name).join(', ') || 'Order';
            const status = o.status || 'PENDING_PAYMENT';
            const displayStatus = status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
            return (
              <motion.div key={o.orderId || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/orders/${o.orderId}`} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all">
                  <div>
                    <div className="font-medium text-sm truncate max-w-[200px]">{itemNames}</div>
                    <div className="text-xs text-gray-500">{o.orderId} · {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-semibold">₦{(o.totalAmount || 0).toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-pill ${statusStyle[status] || 'bg-gray-100 text-gray-600'}`}>{displayStatus}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

