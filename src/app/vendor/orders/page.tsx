'use client';

import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useState } from 'react';

const orders = [
  { id: 'ORD-201', customer: 'Adaeze N.', items: 'Organic Honey x2', total: '₦9,000', status: 'New', date: 'May 30' },
  { id: 'ORD-200', customer: 'Chidi O.', items: 'Wireless Earbuds', total: '₦12,000', status: 'Processing', date: 'May 29' },
  { id: 'ORD-199', customer: 'Fatima B.', items: 'Smart Watch', total: '₦25,000', status: 'Shipped', date: 'May 28' },
  { id: 'ORD-198', customer: 'Emeka A.', items: 'Vitamin C Serum x3', total: '₦20,400', status: 'Delivered', date: 'May 27' },
];

const tabs = ['All', 'New', 'Processing', 'Shipped', 'Delivered'];

export default function VendorOrdersPage() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? orders : orders.filter(o => o.status === tab);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold">Order Management</h1>

      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-pill text-sm whitespace-nowrap ${tab === t ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((o, i) => (
          <motion.div key={o.id} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-medium text-sm">{o.id} — {o.customer}</div>
              <div className="text-xs text-gray-500">{o.items} · {o.date}</div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <div className="font-heading font-semibold text-sm">{o.total}</div>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${o.status === 'New' ? 'bg-secondary/10 text-secondary' : o.status === 'Delivered' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>{o.status}</span>
              </div>
              {o.status === 'New' && <button className="text-xs px-3 py-1 rounded-btn bg-primary text-white">Accept</button>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
