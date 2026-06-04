'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Phone, RefreshCw } from 'lucide-react';
import { maskEmail, maskPhone } from '@/lib/masking';

const API_URL = 'https://dx45lag82l.execute-api.us-east-1.amazonaws.com/dev/api/v1';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Get pending email/phone from sessionStorage
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPhone, setPendingPhone] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem('kl_pending_email') || '';
      const phone = sessionStorage.getItem('kl_pending_phone') || '';
      setPendingEmail(email);
      setPendingPhone(phone);

      if (!email) {
        // No pending verification — redirect to signup
        router.push('/auth/signup');
      }
    }
  }, [router]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!code || code.length < 4) {
      setError('Please enter the verification code');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed');
        return;
      }

      setSuccess(true);
      // Clear pending data
      sessionStorage.removeItem('kl_pending_email');
      sessionStorage.removeItem('kl_pending_phone');

      // Redirect to sign in (user needs to login after verification)
      setTimeout(() => router.push('/auth/signin'), 2000);
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;

    try {
      const res = await fetch(`${API_URL}/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setResendCooldown(60);
        setError('');
      } else {
        setError(data.error || 'Could not resend code');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Account Verified!</h2>
        <p className="text-gray-500 text-sm">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
      <p className="text-gray-500 text-sm mb-6">
        Enter the verification code sent to your email to activate your account.
      </p>

      {/* Where codes were sent */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 space-y-2">
        {pendingEmail && (
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-green-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Code sent to: <strong>{maskEmail(pendingEmail)}</strong>
            </span>
          </div>
        )}
        {pendingPhone && (
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              SMS sent to: <strong>{maskPhone(pendingPhone)}</strong>
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        {/* Verification code input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary text-center text-2xl tracking-widest"
            maxLength={6}
            inputMode="numeric"
            autoFocus
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || code.length < 4}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>

      {/* Resend code */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="text-sm text-primary hover:underline disabled:text-gray-400 disabled:no-underline flex items-center gap-1 mx-auto"
        >
          <RefreshCw size={14} />
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
        </button>
      </div>

      {/* Back to signup */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Wrong email?{' '}
        <a href="/auth/signup" className="text-primary hover:underline">
          Sign up again
        </a>
      </p>
    </div>
  );
}
