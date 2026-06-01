'use client';

import { useState, useRef } from 'react';

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-heading font-bold mb-2">Verify Your Account</h1>
      <p className="text-gray-500 text-sm mb-8">Enter the 6-digit code sent to your email/phone.</p>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-center gap-3">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>
        <button type="submit" className="btn-primary w-full">Verify</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Didn&apos;t receive a code? <button className="text-primary hover:underline">Resend</button>
      </p>
    </div>
  );
}
