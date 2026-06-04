'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';

const initialMenu = [
  { id: '1', category: 'Mains', items: [{ name: 'Jollof Rice', price: '₦2,500', available: true }, { name: 'Fried Rice', price: '₦2,800', available: true }, { name: 'Pounded Yam & Egusi', price: '₦3,500', available: false }] },
  { id: '2', category: 'Drinks', items: [{ name: 'Chapman', price: '₦1,500', available: true }, { name: 'Fresh Juice', price: '₦1,200', available: true }] },
  { id: '3', category: 'Desserts', items: [{ name: 'Puff Puff', price: '₦800', available: true }] },
];

export default function MenuBuilderPage() {
  const [menu] = useState(initialMenu);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Menu Builder</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Add Category</button>
      </div>

      {menu.map((cat, ci) => (
        <motion.div key={cat.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold">{cat.category}</h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1"><Plus size={12} /> Add Item</button>
          </div>
          <div className="space-y-2">
            {cat.items.map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-3 rounded-btn bg-gray-50 dark:bg-gray-800">
                <GripVertical size={14} className="text-gray-400 cursor-grab" />
                <div className="flex-1">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="ml-2 font-heading text-sm text-primary">{item.price}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${item.available ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>{item.available ? 'Available' : 'Sold Out'}</span>
                <button className="text-gray-400 hover:text-primary" aria-label="Edit"><Edit2 size={14} /></button>
                <button className="text-gray-400 hover:text-error" aria-label="Delete"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

