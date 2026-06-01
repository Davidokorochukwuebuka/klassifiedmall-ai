'use client';

import { motion } from 'framer-motion';
import { Store, Upload, Globe } from 'lucide-react';

export default function StorefrontPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Store size={24} /> Storefront Settings</h1>

      <motion.form className="space-y-6" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Branding</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-card bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><Upload size={24} className="text-gray-400" /></div>
            <div><p className="text-sm font-medium">Store Logo</p><p className="text-xs text-gray-500">Upload 200x200px PNG or JPG</p></div>
          </div>
          <input type="text" placeholder="Store name" defaultValue="FreshFarms NG" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <textarea rows={3} placeholder="Store description" defaultValue="Premium organic produce delivered fresh to your door." className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary resize-none" />
        </div>

        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold flex items-center gap-2"><Globe size={18} /> Custom Domain</h2>
          <input type="text" placeholder="yourstore.klassified.com" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <p className="text-xs text-gray-500">Or connect your own domain (e.g. shop.yourbrand.com)</p>
        </div>

        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Theme Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-500 block mb-1">Primary Color</label><input type="color" defaultValue="#6C2BD9" className="w-full h-10 rounded-btn cursor-pointer" /></div>
            <div><label className="text-xs text-gray-500 block mb-1">Accent Color</label><input type="color" defaultValue="#10B981" className="w-full h-10 rounded-btn cursor-pointer" /></div>
          </div>
        </div>

        <button type="submit" className="btn-primary">Save Settings</button>
      </motion.form>
    </div>
  );
}
