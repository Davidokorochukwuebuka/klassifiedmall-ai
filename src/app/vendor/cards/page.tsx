'use client';

import { motion } from 'framer-motion';
import { CreditCard, Plus, Eye, EyeOff, Snowflake } from 'lucide-react';
import { useState } from 'react';

const cards = [
  { id: '1', name: 'Business Card', last4: '7890', balance: '₦150,000', status: 'Active', color: 'from-primary to-secondary' },
  { id: '2', name: 'Ads & Marketing', last4: '4321', balance: '₦25,000', status: 'Active', color: 'from-accent to-secondary' },
];

export default function VirtualCardsPage() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><CreditCard size={24} /> Virtual Cards</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Create Card</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div key={card.id} className={`p-6 rounded-card bg-gradient-to-br ${card.color} text-white shadow-glow`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex justify-between items-start mb-8">
              <div className="text-sm opacity-80">{card.name}</div>
              <button onClick={() => setShowBalance(!showBalance)} className="opacity-70 hover:opacity-100" aria-label="Toggle balance">
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            <div className="text-2xl font-heading font-bold mb-1">{showBalance ? card.balance : '••••••'}</div>
            <div className="text-sm opacity-80">•••• •••• •••• {card.last4}</div>
            <div className="flex gap-2 mt-4">
              <button className="text-xs px-3 py-1 rounded-btn bg-white/20 hover:bg-white/30">Fund</button>
              <button className="text-xs px-3 py-1 rounded-btn bg-white/20 hover:bg-white/30 flex items-center gap-1"><Snowflake size={10} /> Freeze</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

