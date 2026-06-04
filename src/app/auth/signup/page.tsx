'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Store, Truck, TrendingUp, GraduationCap, Eye, EyeOff, Loader2, UtensilsCrossed, ChefHat, Coffee, Warehouse, Globe, Package, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import PhoneInput from '@/components/PhoneInput';

const accountTypes = [
  { id: 'CUSTOMER', label: 'Customer', icon: ShoppingBag, desc: 'Shop & buy' },
  { id: 'FARMER', label: 'Farmer/Vendor', icon: Store, desc: 'Sell farm produce' },
  { id: 'RESTAURANT', label: 'Restaurant', icon: UtensilsCrossed, desc: 'Serve meals & dishes' },
  { id: 'CHEF', label: 'Chef', icon: ChefHat, desc: 'Cook & cater' },
  { id: 'STREET_KIOSK', label: 'Street Food Kiosk', icon: Coffee, desc: 'Quick bites & drinks' },
  { id: 'SUPERMARKET', label: 'Supermarket/Store', icon: Warehouse, desc: 'Retail & groceries' },
  { id: 'EXPORTER', label: 'Exporter', icon: Globe, desc: 'International trade' },
  { id: 'SUPPLIER', label: 'Supplier', icon: Package, desc: 'Wholesale supply' },
  { id: 'DISTRIBUTOR', label: 'Distributor', icon: Truck, desc: 'Distribute products' },
  { id: 'PROCESSOR', label: 'Processor', icon: GraduationCap, desc: 'Process raw goods' },
  { id: 'DROPSHIPPER', label: 'Dropshipper', icon: Users, desc: 'Sell without stock' },
  { id: 'LOGISTICS_PROVIDER', label: 'Driver/Rider', icon: Truck, desc: 'Deliver orders' },
  { id: 'INVESTOR', label: 'Investor', icon: TrendingUp, desc: 'Fund businesses' },
  { id: 'PHARMACY', label: 'Pharmacy', icon: Store, desc: 'Health & medicine' },
];

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" size={32} /></div>}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referrerId = searchParams.get('ref') || '';
  const { register, login } = useAuth();
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [accountType, setAccountType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    // Client-side password validation with helpful messages
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must include at least one uppercase letter (A-Z)');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must include at least one lowercase letter (a-z)');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must include at least one number (0-9)');
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setError('Password must include at least one special character (e.g., !@#$%^&*)');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await register({
        email,
        password,
        name: `${firstName} ${lastName}`.trim(),
        accountType: accountType || 'CUSTOMER',
        phone,
        ...(referrerId && { referrerId }),
      });
      // Store pending verification data
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kl_pending_email', email);
        sessionStorage.setItem('kl_pending_phone', phone);
      }
      // Redirect to verification page
      router.push('/auth/verify');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {step === 'type' ? (
          <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl font-heading font-bold mb-2">Join KlASSIFIED</h1>
            <p className="text-gray-500 text-sm mb-4">Choose your account type</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 max-h-[400px] overflow-y-auto pr-1">
              {accountTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAccountType(t.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${accountType === t.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
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

            {error && (
              <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm mb-4">{error}</div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
                <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              </div>
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              <PhoneInput value={phone} onChange={setPhone} required />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 8 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
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

