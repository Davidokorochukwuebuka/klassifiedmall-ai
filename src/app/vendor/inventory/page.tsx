'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Package } from 'lucide-react';

const inventory = [
  { name: 'Organic Honey', sku: 'HON-001', stock: 45, threshold: 10, status: 'ok' },
  { name: 'Wireless Earbuds', sku: 'EAR-002', stock: 12, threshold: 15, status: 'low' },
  { name: 'Ankara Dress', sku: 'DRS-003', stock: 0, threshold: 5, status: 'out' },
  { name: 'Vitamin C Serum', sku: 'SER-004', stock: 28, threshold: 10, status: 'ok' },
  { name: 'Smart Watch', sku: 'WAT-005', stock: 5, threshold: 10, status: 'low' },
];

export default function InventoryPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Package size={24} /> Inventory</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-2xl font-heading font-bold text-accent">90</div>
          <div className="text-xs text-gray-500">Total Stock</div>
        </div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-2xl font-heading font-bold text-warning">2</div>
          <div className="text-xs text-gray-500">Low Stock</div>
        </div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center">
          <div className="text-2xl font-heading font-bold text-error">1</div>
          <div className="text-xs text-gray-500">Out of Stock</div>
        </div>
      </div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><th className="p-4">Product</th><th className="p-4">SKU</th><th className="p-4">Stock</th><th className="p-4">Threshold</th><th className="p-4">Status</th></tr></thead>
          <tbody>
            {inventory.map((item, i) => (
              <motion.tr key={item.sku} className="border-b dark:border-gray-800 last:border-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-gray-500">{item.sku}</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4">{item.threshold}</td>
                <td className="p-4">
                  {item.status === 'ok' && <span className="text-xs px-2 py-0.5 rounded-pill bg-accent/10 text-accent">In Stock</span>}
                  {item.status === 'low' && <span className="text-xs px-2 py-0.5 rounded-pill bg-warning/10 text-warning flex items-center gap-1 w-fit"><AlertTriangle size={10} />Low</span>}
                  {item.status === 'out' && <span className="text-xs px-2 py-0.5 rounded-pill bg-error/10 text-error">Out</span>}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

