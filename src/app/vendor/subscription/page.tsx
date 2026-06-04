'use client';

import { motion } from 'framer-motion';
import { Crown, Check } from 'lucide-react';

const plans = [
  { name: 'Starter', price: 'Free', features: ['5 products', 'Basic analytics', 'Standard support'], current: false },
  { name: 'Growth', price: '₦5,000/mo', features: ['50 products', 'Advanced analytics', 'Priority support', 'Custom domain', 'Promotions'], current: true },
  { name: 'Enterprise', price: '₦20,000/mo', features: ['Unlimited products', 'Full analytics suite', 'Dedicated support', 'Custom domain', 'API access', 'Multi-branch', 'Investment tools'], current: false },
];

export default function SubscriptionPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Crown size={24} className="text-warning" /> Subscription</h1>

      <div className="rounded-card bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading font-semibold">Current Plan: Growth</div>
            <div className="text-sm text-gray-500">Renews on June 30, 2024</div>
          </div>
          <span className="text-xs px-3 py-1 rounded-pill bg-accent/10 text-accent font-medium">Active</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} className={`p-6 rounded-card shadow-soft ${plan.current ? 'bg-primary text-white ring-2 ring-primary' : 'bg-white dark:bg-card-dark'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <h3 className="font-heading font-bold text-lg">{plan.name}</h3>
            <div className="text-2xl font-heading font-bold mt-2 mb-4">{plan.price}</div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check size={14} className={plan.current ? 'text-white' : 'text-accent'} /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-btn text-sm font-medium ${plan.current ? 'bg-white text-primary' : 'bg-primary text-white hover:bg-primary-dark'}`}>
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

