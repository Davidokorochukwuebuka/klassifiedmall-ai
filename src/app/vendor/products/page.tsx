'use client';

import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const products = [
  { id: '1', name: 'Organic Honey', price: '₦4,500', stock: 45, status: 'Active', image: '🍯' },
  { id: '2', name: 'Wireless Earbuds', price: '₦12,000', stock: 12, status: 'Active', image: '🎧' },
  { id: '3', name: 'Ankara Dress', price: '₦8,500', stock: 0, status: 'Out of Stock', image: '👗' },
  { id: '4', name: 'Vitamin C Serum', price: '₦6,800', stock: 28, status: 'Active', image: '🧴' },
  { id: '5', name: 'Smart Watch', price: '₦25,000', stock: 5, status: 'Low Stock', image: '⌚' },
];

export default function VendorProductsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Products</h1>
        <Link href="/vendor/products/new" className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Add Product</Link>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
      </div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead>
          <tbody>
            {products.map((p, i) => (
              <motion.tr key={p.id} className="border-b dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="p-4 flex items-center gap-3"><span className="text-xl">{p.image}</span><span className="font-medium">{p.name}</span></td>
                <td className="p-4 font-heading font-semibold">{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-pill ${p.status === 'Active' ? 'bg-accent/10 text-accent' : p.status === 'Low Stock' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'}`}>{p.status}</span></td>
                <td className="p-4"><button className="text-gray-400 hover:text-gray-600" aria-label="More"><MoreVertical size={16} /></button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

