'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft size={14} /> Back to Products</Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-8 flex items-center justify-center text-8xl h-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            🍯
          </motion.div>

          {/* Info */}
          <motion.div className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <h1 className="text-2xl font-heading font-bold">Organic Honey</h1>
              <Link href="/vendors/1" className="text-sm text-primary hover:underline">FreshFarms NG</Link>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < 5 ? 'text-warning fill-warning' : 'text-gray-300'} />)}</div>
              <span className="text-sm text-gray-500">(4.9 · 128 reviews)</span>
            </div>

            <div className="text-3xl font-heading font-bold text-primary">₦4,500</div>

            <p className="text-sm text-gray-600 dark:text-gray-400">100% pure organic honey sourced from local beekeepers. Rich in antioxidants and natural enzymes. Perfect for cooking, baking, or as a natural sweetener.</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-btn">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2" aria-label="Decrease"><Minus size={14} /></button>
                <span className="px-3 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2" aria-label="Increase"><Plus size={14} /></button>
              </div>
              <button className="btn-primary flex items-center gap-2 flex-1"><ShoppingCart size={16} /> Add to Cart</button>
              <button className="w-11 h-11 rounded-btn border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-error hover:text-error" aria-label="Wishlist"><Heart size={18} /></button>
            </div>

            <div className="space-y-2 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Truck size={14} /> Free delivery on orders above ₦10,000</div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Shield size={14} /> Buyer protection guaranteed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
