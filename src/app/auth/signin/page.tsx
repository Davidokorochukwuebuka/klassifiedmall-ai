'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-heading font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Email address" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary pr-10" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle password visibility">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary w-full">Sign In</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account? <Link href="/auth/signup" className="text-primary hover:underline">Sign Up</Link>
      </p>
    </>
  );
}
