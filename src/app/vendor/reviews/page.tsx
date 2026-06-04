'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: '1', customer: 'Adaeze N.', rating: 5, text: 'Amazing quality honey! Will order again.', product: 'Organic Honey', date: 'May 30' },
  { id: '2', customer: 'Chidi O.', rating: 4, text: 'Good earbuds, fast delivery.', product: 'Wireless Earbuds', date: 'May 28' },
  { id: '3', customer: 'Fatima B.', rating: 5, text: 'Beautiful dress, perfect fit!', product: 'Ankara Dress', date: 'May 25' },
  { id: '4', customer: 'Emeka A.', rating: 3, text: 'Product is okay but packaging could be better.', product: 'Vitamin C Serum', date: 'May 22' },
];

export default function ReviewsPage() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Star size={24} className="text-warning" /> Reviews & Ratings</h1>

      <div className="flex items-center gap-4 p-4 rounded-card bg-white dark:bg-card-dark shadow-soft">
        <div className="text-4xl font-heading font-bold">{avg}</div>
        <div>
          <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className={i < Math.round(Number(avg)) ? 'text-warning fill-warning' : 'text-gray-300'} />)}</div>
          <div className="text-sm text-gray-500 mt-1">{reviews.length} reviews</div>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((r, i) => (
          <motion.div key={r.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{r.customer}</span>
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < r.rating ? 'text-warning fill-warning' : 'text-gray-300'} />)}</div>
              </div>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{r.text}</p>
            <p className="text-xs text-gray-400 mt-1">Product: {r.product}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

