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
  const { user, isAuthenticated, isLoading, logout, updateAccountType } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const accountType = user?.accountType || 'FARMER';

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push('/login');
    return null;
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
