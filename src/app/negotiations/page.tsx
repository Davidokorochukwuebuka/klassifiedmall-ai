'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Loader2, Send } from 'lucide-react';
import { getNegotiations, createNegotiation } from '@/lib/api';

const statusStyle: Record<string, string> = {
  OPEN: 'bg-secondary/10 text-secondary',
  COUNTER_OFFERED: 'bg-warning/10 text-warning',
  AGREED: 'bg-accent/10 text-accent',
  EXPIRED: 'bg-gray-100 text-gray-500',
  CANCELLED: 'bg-error/10 text-error',
};

export default function NegotiationsPage() {
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    loadNegotiations();
  }, []);

  async function loadNegotiations() {
    setIsLoading(true);
    try {
      const res = await getNegotiations();
      setNegotiations(res.data?.negotiations || []);
    } catch (err) {
      console.error('Failed to load negotiations:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyMessage.trim() || !selected) return;

    // Add message locally
    const updatedNeg = {
      ...selected,
      messages: [
        ...(selected.messages || []),
        { sender: 'buyer', message: replyMessage, timestamp: new Date().toISOString() },
      ],
    };
    setSelected(updatedNeg);
    setNegotiations(negotiations.map(n => n.id === selected.id ? updatedNeg : n));
    setReplyMessage('');
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
        <MessageSquare size={24} className="text-primary" /> Negotiations
      </h1>
      <p className="text-gray-500 text-sm">Negotiate prices directly with vendors.</p>

      {negotiations.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🤝</div>
          <p className="text-gray-500 mb-2">No active negotiations</p>
          <p className="text-xs text-gray-400">Start a negotiation from any product page</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Negotiations list */}
          <div className="space-y-3">
            {negotiations.map((n: any, i: number) => {
              const status = n.status || 'OPEN';
              const displayStatus = status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
              return (
                <motion.button
                  key={n.id || i}
                  onClick={() => setSelected(n)}
                  className={`w-full text-left p-4 rounded-card bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all ${selected?.id === n.id ? 'ring-2 ring-primary' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{n.productName || `Product ${n.productId}`}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-pill ${statusStyle[status] || 'bg-gray-100'}`}>{displayStatus}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Vendor: {n.vendorName || n.vendorId}</span>
                    {n.proposedPrice && <span>Offered: ₦{n.proposedPrice.toLocaleString()}</span>}
                    {n.currentPrice && <span className="text-primary font-medium">Current: ₦{n.currentPrice.toLocaleString()}</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Chat panel */}
          {selected && (
            <motion.div
              className="rounded-card bg-white dark:bg-card-dark shadow-soft flex flex-col h-[500px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-heading font-semibold text-sm">{selected.productName || 'Negotiation'}</h3>
                <p className="text-xs text-gray-500">with {selected.vendorName || selected.vendorId}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {(selected.messages || []).map((m: any, idx: number) => (
                  <div key={idx} className={`flex ${m.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.sender === 'buyer' ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'}`}>
                      {m.message}
                      <div className={`text-xs mt-1 ${m.sender === 'buyer' ? 'text-white/70' : 'text-gray-400'}`}>
                        {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleReply} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Make a counter offer..."
                  className="flex-1 px-4 py-2 rounded-pill border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:border-primary"
                />
                <button type="submit" disabled={!replyMessage.trim()} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50">
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

