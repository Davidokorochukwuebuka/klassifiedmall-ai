import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { WalletProvider } from '@/lib/WalletContext';
import AIAssistant from '@/components/AIAssistant';

export const metadata: Metadata = {
  title: 'KlASSIFIED Mall - Africa\'s Super-App System',
  description: 'Shop, Sell, Deliver, Learn, Invest, Give — All in One System. Fresh produce, logistics, community, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-light text-gray-900 antialiased">
        <AuthProvider>
          <WalletProvider>
            {children}
            <AIAssistant />
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
