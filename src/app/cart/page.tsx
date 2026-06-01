'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const initialItems = [
  { id: '1', name: 'Wireless Earbuds', vendor: 'TechHub', price: 12000, qty: 1, image: '🎧' },
  { id: '2', name: 'Organic Honey', vendor: 'FreshFarms', price: 4500, qty: 2, image: '🍯' },
  { id: '3', name: 'Ankara Dress', vendor: 'StyleBox', price: 8500, qty: 1, image: '👗' },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id: string) => setItems(items.filter(i => i.id !== id));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><ShoppingBag size={24} /> Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <motion.div key={item.id} className="flex gap-4 p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl shrink-0">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.vendor}</p>
                  <p className="font-heading font-bold text-primary mt-1">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-error" aria-label="Remove"><Trash2 size={16} /></button>
                  <div className="flex items-center gap-2 border rounded-btn px-2 py-1">
                    <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease"><Minus size={14} /></button>
                    <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5 h-fit sticky top-20">
            <h2 className="font-heading font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span>₦1,500</span></div>
              <div className="border-t pt-2 flex justify-between font-heading font-bold text-lg"><span>Total</span><span>₦{(total + 1500).toLocaleString()}</span></div>
            </div>
            <Link href="/checkout" className="btn-primary w-full mt-4 block text-center">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
