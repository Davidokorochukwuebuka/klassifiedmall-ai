'use client';

import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
          <Mail size={28} className="text-accent" />
        </div>
        <h1 className="text-2xl font-heading font-bold mb-2">Check Your Email</h1>
        <p className="text-gray-500 text-sm mb-6">We sent a password reset link to your email address.</p>
        <Link href="/auth/signin" className="text-primary hover:underline text-sm">Back to Sign In</Link>
      </div>
    );
  }

  return (
    <>
      <Link href="/auth/signin" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft size={14} /> Back to Sign In
      </Link>
      <h1 className="text-2xl font-heading font-bold mb-2">Forgot Password?</h1>
      <p className="text-gray-500 text-sm mb-6">Enter your email and we&apos;ll send you a reset link.</p>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <input type="email" placeholder="Email address" required className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
        <button type="submit" className="btn-primary w-full">Send Reset Link</button>
      </form>
    </>
  );
}

