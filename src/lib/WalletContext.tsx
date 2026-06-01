'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'escrow_hold' | 'escrow_release' | 'escrow_refund';
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed' | 'held' | 'released' | 'refunded';
  reference?: string;
  escrowId?: string;
}

export interface EscrowTransaction {
  id: string;
  amount: number;
  currency: string;
  buyerId: string;
  sellerId: string;
  orderId: string;
  status: 'held' | 'released' | 'refunded' | 'disputed';
  createdAt: string;
  releasedAt?: string;
  description: string;
}

export interface WalletBalance {
  currency: string;
  available: number;
  pending: number;
  escrow: number;
}

export interface GiftTransaction {
  id: string;
  type: 'grocery' | 'food' | 'funds';
  amount: number;
  recipientId: string;
  recipientName: string;
  message?: string;
  status: 'pending' | 'delivered' | 'claimed';
  createdAt: string;
}

interface WalletContextType {
  balances: WalletBalance[];
  transactions: WalletTransaction[];
  escrowTransactions: EscrowTransaction[];
  giftTransactions: GiftTransaction[];
  isLoading: boolean;
  fundWallet: (amount: number, currency: string, method: string) => Promise<void>;
  withdrawFunds: (amount: number, currency: string, bankDetails: object) => Promise<void>;
  transferFunds: (amount: number, currency: string, recipientId: string) => Promise<void>;
  createEscrow: (amount: number, currency: string, sellerId: string, orderId: string, description: string) => Promise<EscrowTransaction>;
  releaseEscrow: (escrowId: string) => Promise<void>;
  refundEscrow: (escrowId: string) => Promise<void>;
  disputeEscrow: (escrowId: string, reason: string) => Promise<void>;
  sendGift: (type: 'grocery' | 'food' | 'funds', amount: number, recipientId: string, recipientName: string, message?: string) => Promise<GiftTransaction>;
  getBalance: (currency: string) => WalletBalance;
  totalBalance: number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const defaultBalances: WalletBalance[] = [
  { currency: 'NGN', available: 45000, pending: 5000, escrow: 12000 },
  { currency: 'USD', available: 150, pending: 0, escrow: 0 },
  { currency: 'GBP', available: 75, pending: 0, escrow: 0 },
];

const defaultTransactions: WalletTransaction[] = [
  { id: '1', type: 'credit', amount: 25000, currency: 'NGN', description: 'Order payment received', timestamp: '2024-01-15T10:30:00Z', status: 'completed', reference: 'ORD-001' },
  { id: '2', type: 'escrow_hold', amount: 12000, currency: 'NGN', description: 'Escrow held for order ORD-003', timestamp: '2024-01-15T09:30:00Z', status: 'held', escrowId: 'ESC-001' },
  { id: '3', type: 'debit', amount: 1500, currency: 'NGN', description: 'Delivery fee - Hailing', timestamp: '2024-01-15T09:00:00Z', status: 'completed', reference: 'HAIL-042' },
  { id: '4', type: 'credit', amount: 50000, currency: 'NGN', description: 'Wallet top-up via Paystack', timestamp: '2024-01-14T14:20:00Z', status: 'completed' },
  { id: '5', type: 'debit', amount: 8500, currency: 'NGN', description: 'Product purchase - Ankara Dress', timestamp: '2024-01-14T11:45:00Z', status: 'completed', reference: 'ORD-002' },
  { id: '6', type: 'credit', amount: 150, currency: 'USD', description: 'International transfer received', timestamp: '2024-01-13T08:00:00Z', status: 'completed' },
];

const defaultEscrow: EscrowTransaction[] = [
  { id: 'ESC-001', amount: 12000, currency: 'NGN', buyerId: 'user-1', sellerId: 'vendor-1', orderId: 'ORD-003', status: 'held', createdAt: '2024-01-15T09:30:00Z', description: 'Fresh produce order - awaiting delivery confirmation' },
];

const defaultGifts: GiftTransaction[] = [
  { id: 'GIFT-001', type: 'grocery', amount: 5000, recipientId: 'user-5', recipientName: 'Mama Chioma', message: 'Stay strong!', status: 'delivered', createdAt: '2024-01-14T10:00:00Z' },
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balances, setBalances] = useState<WalletBalance[]>(defaultBalances);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(defaultTransactions);
  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>(defaultEscrow);
  const [giftTransactions, setGiftTransactions] = useState<GiftTransaction[]>(defaultGifts);
  const [isLoading, setIsLoading] = useState(false);

  const getBalance = useCallback((currency: string): WalletBalance => {
    return balances.find((b) => b.currency === currency) || { currency, available: 0, pending: 0, escrow: 0 };
  }, [balances]);

  const totalBalance = balances.reduce((sum, b) => {
    if (b.currency === 'NGN') return sum + b.available;
    if (b.currency === 'USD') return sum + b.available * 1600;
    if (b.currency === 'GBP') return sum + b.available * 2000;
    return sum;
  }, 0);

  const fundWallet = useCallback(async (amount: number, currency: string, _method: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setBalances((prev) =>
      prev.map((b) => b.currency === currency ? { ...b, available: b.available + amount } : b)
    );
    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'credit',
      amount,
      currency,
      description: `Wallet top-up via ${_method}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
    }, ...prev]);
    setIsLoading(false);
  }, []);

  const withdrawFunds = useCallback(async (amount: number, currency: string, _bankDetails: object) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setBalances((prev) =>
      prev.map((b) => b.currency === currency ? { ...b, available: b.available - amount } : b)
    );
    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'debit',
      amount,
      currency,
      description: 'Withdrawal to bank account',
      timestamp: new Date().toISOString(),
      status: 'pending',
    }, ...prev]);
    setIsLoading(false);
  }, []);

  const transferFunds = useCallback(async (amount: number, currency: string, recipientId: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setBalances((prev) =>
      prev.map((b) => b.currency === currency ? { ...b, available: b.available - amount } : b)
    );
    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'debit',
      amount,
      currency,
      description: `Transfer to user ${recipientId}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
    }, ...prev]);
    setIsLoading(false);
  }, []);

  // Escrow: Hold funds when buyer places order
  const createEscrow = useCallback(async (amount: number, currency: string, sellerId: string, orderId: string, description: string): Promise<EscrowTransaction> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const escrow: EscrowTransaction = {
      id: `ESC-${Date.now()}`,
      amount,
      currency,
      buyerId: 'current-user',
      sellerId,
      orderId,
      status: 'held',
      createdAt: new Date().toISOString(),
      description,
    };

    // Deduct from available, add to escrow
    setBalances((prev) =>
      prev.map((b) => b.currency === currency ? { ...b, available: b.available - amount, escrow: b.escrow + amount } : b)
    );

    setEscrowTransactions((prev) => [escrow, ...prev]);
    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'escrow_hold',
      amount,
      currency,
      description: `Escrow held: ${description}`,
      timestamp: new Date().toISOString(),
      status: 'held',
      escrowId: escrow.id,
      reference: orderId,
    }, ...prev]);

    setIsLoading(false);
    return escrow;
  }, []);

  // Escrow: Release funds to seller after delivery confirmed
  const releaseEscrow = useCallback(async (escrowId: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const escrow = escrowTransactions.find((e) => e.id === escrowId);
    if (!escrow) { setIsLoading(false); return; }

    setEscrowTransactions((prev) =>
      prev.map((e) => e.id === escrowId ? { ...e, status: 'released', releasedAt: new Date().toISOString() } : e)
    );

    setBalances((prev) =>
      prev.map((b) => b.currency === escrow.currency ? { ...b, escrow: b.escrow - escrow.amount } : b)
    );

    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'escrow_release',
      amount: escrow.amount,
      currency: escrow.currency,
      description: `Escrow released to seller for order ${escrow.orderId}`,
      timestamp: new Date().toISOString(),
      status: 'released',
      escrowId,
      reference: escrow.orderId,
    }, ...prev]);

    setIsLoading(false);
  }, [escrowTransactions]);

  // Escrow: Refund buyer if order cancelled/disputed
  const refundEscrow = useCallback(async (escrowId: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const escrow = escrowTransactions.find((e) => e.id === escrowId);
    if (!escrow) { setIsLoading(false); return; }

    setEscrowTransactions((prev) =>
      prev.map((e) => e.id === escrowId ? { ...e, status: 'refunded' } : e)
    );

    setBalances((prev) =>
      prev.map((b) => b.currency === escrow.currency ? { ...b, available: b.available + escrow.amount, escrow: b.escrow - escrow.amount } : b)
    );

    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'escrow_refund',
      amount: escrow.amount,
      currency: escrow.currency,
      description: `Escrow refunded for order ${escrow.orderId}`,
      timestamp: new Date().toISOString(),
      status: 'refunded',
      escrowId,
      reference: escrow.orderId,
    }, ...prev]);

    setIsLoading(false);
  }, [escrowTransactions]);

  // Escrow: Dispute
  const disputeEscrow = useCallback(async (escrowId: string, _reason: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setEscrowTransactions((prev) =>
      prev.map((e) => e.id === escrowId ? { ...e, status: 'disputed' } : e)
    );
    setIsLoading(false);
  }, []);

  // Send Gift (grocery, food, funds)
  const sendGift = useCallback(async (type: 'grocery' | 'food' | 'funds', amount: number, recipientId: string, recipientName: string, message?: string): Promise<GiftTransaction> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const gift: GiftTransaction = {
      id: `GIFT-${Date.now()}`,
      type,
      amount,
      recipientId,
      recipientName,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Deduct from wallet
    setBalances((prev) =>
      prev.map((b) => b.currency === 'NGN' ? { ...b, available: b.available - amount } : b)
    );

    setGiftTransactions((prev) => [gift, ...prev]);
    setTransactions((prev) => [{
      id: `tx-${Date.now()}`,
      type: 'debit',
      amount,
      currency: 'NGN',
      description: `Gift sent: ${type} to ${recipientName}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
      reference: gift.id,
    }, ...prev]);

    // Simulate delivery after 2 seconds
    setTimeout(() => {
      setGiftTransactions((prev) =>
        prev.map((g) => g.id === gift.id ? { ...g, status: 'delivered' } : g)
      );
    }, 2000);

    setIsLoading(false);
    return gift;
  }, []);

  return (
    <WalletContext.Provider value={{
      balances, transactions, escrowTransactions, giftTransactions, isLoading,
      fundWallet, withdrawFunds, transferFunds,
      createEscrow, releaseEscrow, refundEscrow, disputeEscrow,
      sendGift, getBalance, totalBalance,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
