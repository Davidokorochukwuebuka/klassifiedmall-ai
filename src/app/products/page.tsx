'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const products = [
  { id: '1', name: 'Organic Honey', price: 4500, vendor: 'FreshFarms', category: 'Food', image: '🍯', rating: 4.9 },
  { id: '2', name: 'Wireless Earbuds', price: 12000, vendor: 'TechHub', category: 'Electronics', image: '🎧', rating: 4.8 },
  { id: '3', name: 'Ankara Dress', price: 8500, vendor: 'StyleBox', category: 'Fashion', image: '👗', rating: 4.7 },
  { id: '4', name: 'Jollof Rice Pack', price: 3200, vendor: 'Chef Amara', category: 'Food', image: '🍚', rating: 4.6 },
  { id: '5', name: 'Vitamin C Serum', price: 6800, vendor: 'HealthFirst', category: 'Health', image: '🧴', rating: 4.5 },
  { id: '6', name: 'Smart Watch', price: 25000, vendor: 'TechHub', category: 'Electronics', image: '⌚', rating: 4.9 },
  { id: '7', name: 'Running Shoes', price: 18000, vendor: 'SportZone', category: 'Fashion', image: '👟', rating: 4.4 },
  { id: '8', name: 'Bluetooth Speaker', price: 15000, vendor: 'TechHub', category: 'Electronics', image: '🔊', rating: 4.7 },
];

const categories = ['All', 'Food', 'Electronics', 'Fashion', 'Health'];

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const filtered = products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <h1 className="text-2xl font-heading font-bold">Products</h1>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <button className="px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 flex items-center gap-2 text-sm" aria-label="Filters"><SlidersHorizontal size={16} /> Filters</button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-pill text-sm whitespace-nowrap ${cat === c ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700'}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} className="group rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              <Link href={`/products/${p.id}`}>
                <div className="relative h-36 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl">
                  {p.image}
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Wishlist" onClick={(e) => e.preventDefault()}>
                    <Heart size={14} />
                  </button>
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/products/${p.id}`}><h3 className="font-medium text-sm truncate hover:text-primary">{p.name}</h3></Link>
                <p className="text-xs text-gray-500">{p.vendor}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-heading font-bold text-primary">₦{p.price.toLocaleString()}</span>
                  <button className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Add to cart"><ShoppingCart size={12} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
