'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

const initialAddresses = [
  { id: '1', label: 'Home', address: '123 Main Street, Lekki, Lagos', phone: '+234 801 234 5678', isDefault: true },
  { id: '2', label: 'Office', address: '45 Victoria Island, Lagos', phone: '+234 802 345 6789', isDefault: false },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MapPin size={24} /> Addresses</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>

      {showAdd && (
        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <h2 className="font-heading font-semibold">Add New Address</h2>
          <input type="text" placeholder="Label (e.g. Home, Office)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Full address" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <button className="btn-primary text-sm" onClick={() => setShowAdd(false)}>Save Address</button>
        </motion.div>
      )}

      <div className="space-y-3">
        {addresses.map((addr, i) => (
          <motion.div key={addr.id} className="flex items-start justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm flex items-center gap-2">
                  {addr.label}
                  {addr.isDefault && <span className="text-xs px-2 py-0.5 rounded-pill bg-accent/10 text-accent">Default</span>}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{addr.address}</div>
                <div className="text-xs text-gray-400">{addr.phone}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-primary" aria-label="Edit"><Edit2 size={14} /></button>
              <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-gray-400 hover:text-error" aria-label="Delete"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
