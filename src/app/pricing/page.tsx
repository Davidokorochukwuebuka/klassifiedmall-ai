'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import Link from 'next/link';

const plans = [
  { name: 'Starter', price: 'Free', period: '', features: ['5 products', 'Basic analytics', 'Standard support', 'Community access'], popular: false },
  { name: 'Growth', price: '₦5,000', period: '/month', features: ['50 products', 'Advanced analytics', 'Priority support', 'Custom domain', 'Promotions', 'Negotiation tools'], popular: true },
  { name: 'Enterprise', price: '₦20,000', period: '/month', features: ['Unlimited products', 'Full analytics suite', 'Dedicated support', 'API access', 'Multi-branch', 'Investment tools', 'White-label storefront'], popular: false },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding text-center">
          <motion.h1 className="text-4xl font-heading font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Simple, Transparent Pricing</motion.h1>
          <p className="text-gray-500 max-w-xl mx-auto">Start free. Scale as you grow. No hidden fees.</p>
        </section>

        <section className="px-4 pb-20 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} className={`p-6 rounded-card shadow-soft relative ${plan.popular ? 'bg-primary text-white ring-2 ring-secondary' : 'bg-white dark:bg-card-dark'}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-pill bg-secondary text-white text-xs font-bold">Most Popular</span>}
                <h3 className="font-heading font-bold text-xl">{plan.name}</h3>
                <div className="mt-3 mb-6"><span className="text-3xl font-heading font-bold">{plan.price}</span><span className="text-sm opacity-70">{plan.period}</span></div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><Check size={14} className={plan.popular ? 'text-secondary' : 'text-accent'} />{f}</li>
                  ))}
                </ul>
                <Link href="/auth/signup?type=vendor" className={`block text-center py-3 rounded-btn font-medium text-sm ${plan.popular ? 'bg-secondary text-white hover:bg-secondary-dark' : 'bg-primary text-white hover:bg-primary-dark'}`}>Get Started</Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

