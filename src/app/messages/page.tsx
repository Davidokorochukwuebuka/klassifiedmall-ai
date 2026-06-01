'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

const conversations = [
  { id: '1', name: 'TechHub Lagos', lastMsg: 'Your order is being prepared', time: '2m ago', unread: 2 },
  { id: '2', name: 'FreshFarms NG', lastMsg: 'Thanks for your purchase!', time: '1h ago', unread: 0 },
  { id: '3', name: 'StyleBox', lastMsg: 'We have new arrivals!', time: '3h ago', unread: 1 },
  { id: '4', name: 'Support', lastMsg: 'How can we help you?', time: '1d ago', unread: 0 },
];

const messages = [
  { id: '1', from: 'them', text: 'Hi! Your order is being prepared.', time: '10:30 AM' },
  { id: '2', from: 'me', text: 'Great, when will it ship?', time: '10:32 AM' },
  { id: '3', from: 'them', text: 'It should ship by tomorrow morning.', time: '10:33 AM' },
];

export default function MessagesPage() {
  const [active, setActive] = useState('1');
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-5xl mx-auto">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto hidden sm:block">
        <div className="p-4">
          <h2 className="font-heading font-semibold flex items-center gap-2"><MessageCircle size={18} /> Messages</h2>
        </div>
        {conversations.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)} className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 ${active === c.id ? 'bg-primary/5' : ''}`}>
            <div className="flex justify-between items-start">
              <span className="font-medium text-sm">{c.name}</span>
              <span className="text-xs text-gray-400">{c.time}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500 truncate max-w-[160px]">{c.lastMsg}</span>
              {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">{c.unread}</span>}
            </div>
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-heading font-semibold">
          {conversations.find(c => c.id === active)?.name}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${m.from === 'me' ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'}`}>
                {m.text}
                <div className={`text-xs mt-1 ${m.from === 'me' ? 'text-white/70' : 'text-gray-400'}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setInput(''); }} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-pill border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <button type="submit" className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
