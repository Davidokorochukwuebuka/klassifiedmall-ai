'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Store, Truck, TrendingUp, GraduationCap, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const accountTypes = [
  { id: 'customer', label: 'Customer', icon: ShoppingBag, desc: 'Shop & buy' },
  { id: 'vendor', label: 'Vendor', icon: Store, desc: 'Sell products' },
  { id: 'driver', label: 'Driver', icon: Truck, desc: 'Deliver orders' },
  { id: 'investor', label: 'Investor', icon: TrendingUp, desc: 'Fund businesses' },
  { id: 'coach', label: 'Coach', icon: GraduationCap, desc: 'Teach courses' },
];

export default function SignUpPage() {
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [accountType, setAccountType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {step === 'type' ? (
          <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl font-heading font-bold mb-2">Join KlASSIFIED</h1>
            <p className="text-gray-500 text-sm mb-6">Choose your account type</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {accountTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAccountType(t.id)}
                  className={`p-4 rounded-card border-2 text-left transition-all ${accountType === t.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                >
                  <t.icon size={20} className={accountType === t.id ? 'text-primary' : 'text-gray-400'} />
                  <div className="font-medium text-sm mt-2">{t.label}</div>
                  <div className="text-xs text-gray-500">{t.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => accountType && setStep('form')}
              disabled={!accountType}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setStep('type')} className="text-sm text-primary mb-4 hover:underline">← Change account type</button>
            <h1 className="text-2xl font-heading font-bold mb-6">Create Account</h1>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="First name" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
                <input type="text" placeholder="Last name" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              </div>
              <input type="email" placeholder="Email address" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              <input type="tel" placeholder="Phone number" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" className="btn-primary w-full">Create Account</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account? <Link href="/auth/signin" className="text-primary hover:underline">Sign In</Link>
      </p>
    </>
  );
}
