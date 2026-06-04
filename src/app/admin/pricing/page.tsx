'use client';

import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const fees = [
  { category: 'Product Sales', commission: '5%', description: 'Commission on all product sales' },
  { category: 'Food Orders', commission: '8%', description: 'Commission on restaurant orders' },
  { category: 'Delivery', commission: '15%', description: 'Platform fee on delivery charges' },
  { category: 'Course Sales', commission: '10%', description: 'Commission on course enrollments' },
  { category: 'Investment Deals', commission: '2%', description: 'Fee on successful investments' },
];

export default function PricingPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Tag size={24} /> Commission & Fees</h1>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><th className="p-4">Category</th><th className="p-4">Commission</th><th className="p-4">Description</th><th className="p-4"></th></tr></thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.category} className="border-b dark:border-gray-800 last:border-0">
                <td className="p-4 font-medium">{f.category}</td>
                <td className="p-4"><span className="font-heading font-bold text-primary">{f.commission}</span></td>
                <td className="p-4 text-gray-500">{f.description}</td>
                <td className="p-4"><button className="text-xs text-primary hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

