'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

const trackingSteps = [
  { label: 'Order Placed', time: 'May 27, 10:30 AM', done: true, icon: Package },
  { label: 'Processing', time: 'May 27, 11:00 AM', done: true, icon: Package },
  { label: 'Shipped', time: 'May 28, 9:00 AM', done: true, icon: Truck },
  { label: 'Out for Delivery', time: 'May 29, 2:00 PM', done: false, icon: Truck },
  { label: 'Delivered', time: '', done: false, icon: CheckCircle },
];

export default function OrderDetailPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <Link href="/orders" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold">Order ORD-002</h1>
        <p className="text-gray-500 text-sm">Placed on May 27, 2024</p>
      </motion.div>

      {/* Tracking */}
      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
        <h2 className="font-heading font-semibold mb-6">Tracking</h2>
        <div className="space-y-0">
          {trackingSteps.map((s, i) => (
            <div key={s.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.done ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                  <s.icon size={14} />
                </div>
                {i < trackingSteps.length - 1 && <div className={`w-0.5 h-10 ${s.done ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
              <div className="pb-8">
                <div className={`font-medium text-sm ${s.done ? '' : 'text-gray-400'}`}>{s.label}</div>
                <div className="text-xs text-gray-500">{s.time || 'Pending'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
        <h2 className="font-heading font-semibold mb-4">Items</h2>
        <div className="flex items-center gap-4 p-3 rounded-btn bg-gray-50 dark:bg-gray-800">
          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">🍯</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Organic Honey x2</div>
            <div className="text-xs text-gray-500">FreshFarms</div>
          </div>
          <div className="font-heading font-bold">₦9,000</div>
        </div>
      </div>

      {/* Delivery */}
      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
        <h2 className="font-heading font-semibold mb-2 flex items-center gap-2"><MapPin size={16} /> Delivery Address</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">123 Main Street, Lekki, Lagos, Nigeria</p>
      </div>
    </div>
  );
}
