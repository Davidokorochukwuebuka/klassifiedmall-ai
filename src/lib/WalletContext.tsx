'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface WalletBalance { currency: string; available: number; pending: number; escrow: number; }
export interface WalletTransaction { id: string; type: string; amount: number; currency: string; description: string; timestamp: string; status: string; reference?: string; }
export interface EscrowTransaction { id: string; amount: number; currency: string; buyerId: string; sellerId: string; orderId: string; status: string; createdAt: string; description: string; }
export interface GiftTransaction { id: string; type: string; amount: number; recipientId: string; recipientName: string; message?: string; status: string; createdAt: string; }

interface WalletContextType {
  balances: WalletBalance[];
  transactions: WalletTransaction[];
  escrowTransactions: EscrowTransaction[];
  giftTransactions: GiftTransaction[];
  isLoading: boolean;
  error: string | null;
  fundWallet: (amount: number, currency: string, method: string) => Promise<void>;
  withdrawFunds: (amount: number, currency: string, details: any) => Promise<void>;
  transferFunds: (amount: number, currency: string, recipientId: string) => Promise<void>;
  createEscrow: (amount: number, currency: string, vendorId: string, orderId: string, description?: string) => Promise<any>;
  releaseEscrow: (escrowId: string) => Promise<void>;
  refundEscrow: (escrowId: string) => Promise<void>;
  disputeEscrow: (escrowId: string, reason: string) => Promise<void>;
  sendGift: (type: string, amount: number, recipientId: string, recipientName: string, message?: string) => Promise<any>;
  getBalance: (currency: string) => WalletBalance;
  totalBalance: number;
  refreshWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const API_URL = 'https://dx45lag82l.execute-api.us-east-1.amazonaws.com/dev/api/v1';

async function walletFetch(endpoint: string, token: string | null, options?: RequestInit) {
  if (!token) return null; // Silently skip if not authenticated
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options?.headers as Record<string, string>),
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API request failed: ${res.status}`);
  return data;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [balances, setBalances] = useState<WalletBalance[]>([
    { currency: 'NGN', available: 0, pending: 0, escrow: 0 },
    { currency: 'USD', available: 0, pending: 0, escrow: 0 },
  ]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>([]);
  const [giftTransactions, setGiftTransactions] = useState<GiftTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshWallet = useCallback(async () => {
    // CRITICAL: Do NOT call API if not authenticated
    if (!isAuthenticated || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await walletFetch('/payments/wallets', token);
      if (res?.data?.balances) {
        const b = Object.entries(res.data.balances).map(([currency, available]: [string, any]) => ({
          currency, available: available || 0, pending: 0, escrow: 0
        }));
        if (b.length > 0) setBalances(b);
      }
    } catch (e: any) {
      // Don't show error for wallet fetch - it's not critical
      console.warn('Wallet fetch:', e.message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      refreshWallet();
    }
  }, [isAuthenticated, token, refreshWallet]);

  const getBalance = useCallback((currency: string) =>
    balances.find(b => b.currency === currency) || { currency, available: 0, pending: 0, escrow: 0 },
  [balances]);

  const totalBalance = balances.reduce((sum, b) => sum + b.available, 0);

  const fundWallet = useCallback(async (amount: number, currency: string, method: string) => {
    await walletFetch('/payments/wallets/fund', token, { method: 'POST', body: JSON.stringify({ amount, currency, method }) });
    await refreshWallet();
  }, [token, refreshWallet]);

  const withdrawFunds = useCallback(async (amount: number, currency: string, details: any) => {
    await walletFetch('/payments/wallets/withdraw', token, { method: 'POST', body: JSON.stringify({ amount, currency, ...details }) });
    await refreshWallet();
  }, [token, refreshWallet]);

  const transferFunds = useCallback(async (amount: number, currency: string, recipientId: string) => {
    await walletFetch('/payments/wallets/transfer', token, { method: 'POST', body: JSON.stringify({ amount, currency, recipientId }) });
    await refreshWallet();
  }, [token, refreshWallet]);

  const createEscrow = useCallback(async (amount: number, currency: string, vendorId: string, orderId: string, description?: string) => {
    const r = await walletFetch('/payments/escrow', token, { method: 'POST', body: JSON.stringify({ amount, currency, vendorId, orderId, description }) });
    await refreshWallet();
    return r;
  }, [token, refreshWallet]);

  const releaseEscrow = useCallback(async (id: string) => {
    await walletFetch(`/payments/escrow/${id}/release`, token, { method: 'POST' });
    await refreshWallet();
  }, [token, refreshWallet]);

  const refundEscrow = useCallback(async (id: string) => {
    await walletFetch(`/payments/escrow/${id}/refund`, token, { method: 'POST' });
    await refreshWallet();
  }, [token, refreshWallet]);

  const disputeEscrow = useCallback(async (id: string, reason: string) => {
    await walletFetch(`/payments/escrow/${id}/dispute`, token, { method: 'POST', body: JSON.stringify({ reason }) });
  }, [token]);

  const sendGift = useCallback(async (type: string, amount: number, recipientId: string, recipientName: string, message?: string) => {
    const r = await walletFetch('/payments/wallets/transfer', token, {
      method: 'POST', body: JSON.stringify({ amount, currency: 'NGN', recipientId, description: `Gift to ${recipientName}` })
    });
    await refreshWallet();
    return r;
  }, [token, refreshWallet]);

  return (
    <WalletContext.Provider value={{
      balances, transactions, escrowTransactions, giftTransactions,
      isLoading, error, fundWallet, withdrawFunds, transferFunds,
      createEscrow, releaseEscrow, refundEscrow, disputeEscrow,
      sendGift, getBalance, totalBalance, refreshWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const c = useContext(WalletContext);
  if (!c) throw new Error('useWallet must be used within WalletProvider');
  return c;
}

