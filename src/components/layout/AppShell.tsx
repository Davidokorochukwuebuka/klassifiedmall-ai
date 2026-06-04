'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import { useAuth } from '@/lib/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { user, isAuthenticated, isLoading, sessionExpired, logout, updateAccountType } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const accountType = user?.accountType || 'FARMER';

  // Only redirect if user was NEVER authenticated (no stored user at all and no user in context)
  if (!isLoading && !isAuthenticated && !sessionExpired && !user) {
    // Check localStorage directly as a safety net
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('kl_user') : null;
    if (!storedUser) {
      router.push('/auth/signin');
      return null;
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl animate-pulse">🏪</span>
          <p className="text-gray-500 mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session expired banner */}
      {sessionExpired && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-amber-800">
            Your session has expired. Please sign in again to continue.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-4 py-1.5 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out`}>
        <Sidebar
          accountType={accountType}
          onClose={() => setMobileMenuOpen(false)}
          userName={user?.name}
          userEmail={user?.email}
          onLogout={logout}
        />
      </div>

      {/* Main content area */}
      <div className="lg:ml-64">
        <Header
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          accountType={accountType}
          onAccountChange={updateAccountType}
          userName={user?.name}
        />
        <main className="pt-16 p-4 sm:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - mobile only */}
      <BottomNav />
    </div>
  );
}

