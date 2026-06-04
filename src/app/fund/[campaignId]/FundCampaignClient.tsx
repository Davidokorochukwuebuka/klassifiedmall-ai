'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FundCampaignClient({ campaignId }: { campaignId: string }) {
  const [amount, setAmount] = useState('');
  const raised = 320000, goal = 500000;
  const pct = Math.round((raised / goal) * 100);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/charity" className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"><ArrowLeft size={14} /> Back to Campaigns</Link>

        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-6xl">📚</div>
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-heading font-bold">School Supplies for 100 Kids</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Help provide notebooks, pens, bags, and uniforms for 100 children in underserved communities.</p>

            <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }} /></div>
            <div className="flex justify-between text-sm">
              <span><strong>₦{(raised / 1000).toFixed(0)}K</strong> raised of ₦{(goal / 1000).toFixed(0)}K</span>
              <span className="flex items-center gap-1 text-gray-500"><Users size={12} /> 84 donors</span>
            </div>
          </div>
        </motion.div>

        <motion.form className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-heading font-semibold">Make a Donation</h2>
          <div className="flex gap-2">
            {['1000', '5000', '10000', '25000'].map((v) => (
              <button key={v} type="button" onClick={() => setAmount(v)} className={`px-4 py-2 rounded-btn text-sm border ${amount === v ? 'border-secondary bg-secondary/10 text-secondary' : 'border-gray-300 dark:border-gray-600'}`}>₦{Number(v).toLocaleString()}</button>
            ))}
          </div>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Or enter custom amount (₦)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2"><Heart size={16} /> Donate Now</button>
        </motion.form>
      </div>
    </div>
  );
}
