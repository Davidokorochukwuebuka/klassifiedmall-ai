'use client';

import { motion } from 'framer-motion';
import { User, Camera } from 'lucide-react';

export default function ProfileSettingsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><User size={24} /> Profile Settings</h1>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl">👤</div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center" aria-label="Change photo">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <div className="font-heading font-semibold">John Doe</div>
            <div className="text-sm text-gray-500">Customer account</div>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">First Name</label>
              <input type="text" defaultValue="John" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
            <input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone</label>
            <input type="tel" defaultValue="+234 801 234 5678" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Bio</label>
            <textarea rows={3} placeholder="Tell us about yourself..." className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary resize-none" />
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </motion.div>
    </div>
  );
}

