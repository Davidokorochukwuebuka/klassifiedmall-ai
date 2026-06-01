'use client';

import { useState } from 'react';
import { Send, DollarSign } from 'lucide-react';

const messages = [
  { from: 'buyer', text: 'Hi, I\'m interested in the Smart Watch. Can you do ₦20,000?', time: '10:30 AM' },
  { from: 'seller', text: 'Hello! The lowest I can go is ₦22,000. It\'s brand new.', time: '10:32 AM' },
  { from: 'buyer', text: 'How about ₦21,000? I\'ll pay immediately.', time: '10:33 AM' },
];

export default function NegotiationChatPage() {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-t-card bg-white dark:bg-card-dark shadow-soft border-b dark:border-gray-700">
        <div><div className="font-heading font-semibold">Negotiation: Smart Watch</div><div className="text-xs text-gray-500">TechHub Lagos · Original: ₦25,000</div></div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-pill bg-secondary/10 text-secondary text-sm font-medium"><DollarSign size={14} /> ₦21,000 offered</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-surface-dark">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'buyer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${m.from === 'buyer' ? 'bg-primary text-white rounded-br-sm' : 'bg-white dark:bg-card-dark shadow-soft rounded-bl-sm'}`}>
              {m.text}
              <div className={`text-xs mt-1 ${m.from === 'buyer' ? 'text-white/70' : 'text-gray-400'}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick offers */}
      <div className="flex gap-2 p-3 bg-white dark:bg-card-dark border-t dark:border-gray-700">
        {['₦20,000', '₦21,000', '₦22,000'].map((offer) => (
          <button key={offer} className="text-xs px-3 py-1.5 rounded-pill border border-secondary text-secondary hover:bg-secondary hover:text-white">{offer}</button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); setInput(''); }} className="flex gap-2 p-3 bg-white dark:bg-card-dark rounded-b-card shadow-soft">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message or make an offer..." className="flex-1 px-4 py-3 rounded-pill border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
        <button type="submit" className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center" aria-label="Send"><Send size={18} /></button>
      </form>
    </div>
  );
}
