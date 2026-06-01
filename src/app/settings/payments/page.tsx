'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

const initialCards = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'Mastercard', last4: '8888', expiry: '06/26', isDefault: false },
];

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState(initialCards);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><CreditCard size={24} /> Payment Methods</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>

      {showAdd && (
        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <h2 className="font-heading font-semibold">Add New Card</h2>
          <input type="text" placeholder="Card number" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="text" placeholder="CVV" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <button className="btn-primary text-sm" onClick={() => setShowAdd(false)}>Save Card</button>
        </motion.div>
      )}

      <div className="space-y-3">
        {cards.map((card, i) => (
          <motion.div key={card.id} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">{card.type[0]}</div>
              <div>
                <div className="font-medium text-sm">{card.type} •••• {card.last4}</div>
                <div className="text-xs text-gray-500">Expires {card.expiry}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {card.isDefault && <span className="text-xs px-2 py-0.5 rounded-pill bg-accent/10 text-accent">Default</span>}
              <button onClick={() => setCards(cards.filter(c => c.id !== card.id))} className="text-gray-400 hover:text-error" aria-label="Remove"><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
