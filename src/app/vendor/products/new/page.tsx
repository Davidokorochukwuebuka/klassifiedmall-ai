'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <Link href="/vendor/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft size={14} /> Back to Products</Link>
      <h1 className="text-2xl font-heading font-bold">Add New Product</h1>

      <motion.form className="space-y-6" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Images */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
          <h2 className="font-heading font-semibold mb-4">Images</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Details</h2>
          <input type="text" placeholder="Product name" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <textarea rows={4} placeholder="Description" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary resize-none" />
          <select className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary">
            <option value="">Select category</option>
            <option>Food</option><option>Electronics</option><option>Fashion</option><option>Health</option><option>Services</option>
          </select>
        </div>

        {/* Pricing */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price (₦)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="number" placeholder="Compare at price" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Stock quantity" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="text" placeholder="SKU" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" /> Allow negotiation</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary">Publish Product</button>
          <button type="button" className="px-6 py-3 rounded-btn border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Save Draft</button>
        </div>
      </motion.form>
    </div>
  );
}
