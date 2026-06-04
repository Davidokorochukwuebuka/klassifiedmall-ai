'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const COGNITO_DOMAIN = 'klassified-platform-dev.auth.us-east-1.amazoncognito.com';
const CLIENT_ID = '2jil2du1aop2akv98mn7tpu4hs';
const REDIRECT_URI = 'https://foodies.klassifiedmall.com/auth/callback';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');
      const errorDesc = searchParams.get('error_description');

      if (errorParam) {
        setError(errorDesc || `Authentication failed: ${errorParam}`);
        setTimeout(() => router.push('/auth/signin'), 3000);
        return;
      }

      if (!code) {
        setError('No authorization code received');
        setTimeout(() => router.push('/auth/signin'), 3000);
        return;
      }

      const storedState = typeof window !== 'undefined' ? sessionStorage.getItem('kl_oauth_state') : null;
      if (state && storedState && state !== storedState) {
        setError('Security validation failed. Please try again.');
        setTimeout(() => router.push('/auth/signin'), 3000);
        return;
      }

      try {
        const tokenUrl = `https://${COGNITO_DOMAIN}/oauth2/token`;
        const res = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            code,
            redirect_uri: REDIRECT_URI,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.id_token) {
          setError(data.error_description || 'Failed to exchange authorization code');
          setTimeout(() => router.push('/auth/signin'), 3000);
          return;
        }

        localStorage.setItem('kl_access_token', data.access_token);
        localStorage.setItem('kl_id_token', data.id_token);
        if (data.refresh_token) {
          localStorage.setItem('kl_refresh_token', data.refresh_token);
        }

        try {
          const payload = JSON.parse(atob(data.id_token.split('.')[1]));
          const user = {
            userId: payload.sub,
            email: payload.email,
            name: payload.name || payload['cognito:username'] || 'User',
            accountType: payload['custom:primaryAccountType'] || 'Customer',
          };
          localStorage.setItem('kl_user', JSON.stringify(user));
        } catch {
          // Non-critical
        }

        sessionStorage.removeItem('kl_oauth_state');
        router.push('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Network error during authentication');
        setTimeout(() => router.push('/auth/signin'), 3000);
      }
    }

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Authentication Failed</h2>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <p className="text-xs text-gray-400">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 size={32} className="animate-spin text-primary mb-4" />
      <p className="text-sm text-gray-500">Completing sign in...</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 size={32} className="animate-spin text-primary mb-4" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
