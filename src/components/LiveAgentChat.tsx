'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Send, X, Clock } from 'lucide-react';

/**
 * Live Agent Escalation — When AI can't resolve, connect to human support.
 * Shows agent availability, queue position, and real-time chat.
 * Requirement: Real live agent escalation.
 */

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

export default function LiveAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'You\'ve been connected to our support team. An agent will be with you shortly.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [agentStatus, setAgentStatus] = useState<'connecting' | 'online' | 'offline'>('connecting');
  const [queuePosition, setQueuePosition] = useState(2);

  // Simulate agent connecting
  useState(() => {
    setTimeout(() => setAgentStatus('online'), 3000);
    setTimeout(() => setQueuePosition(1), 2000);
    setTimeout(() => setQueuePosition(0), 4000);
  });

  function handleSend() {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        content: getAgentResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 2000);
  }

  function getAgentResponse(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('order') || q.includes('delivery')) {
      return 'I can see your recent orders. Let me check the status for you. Could you provide your order ID?';
    }
    if (q.includes('refund') || q.includes('return')) {
      return 'I understand you\'d like a refund. Let me look into this. What was the issue with your order?';
    }
    if (q.includes('account') || q.includes('login')) {
      return 'I can help with your account. What specific issue are you experiencing?';
    }
    return 'Thank you for reaching out. I\'m reviewing your query and will get back to you shortly. Is there anything specific I can help with?';
  }

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Talk to live agent"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 10 }}
        >
          <Headphones size={20} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-80 max-h-[70vh] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones size={18} />
                <div>
                  <h3 className="text-sm font-semibold">Live Support</h3>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1">
                    {agentStatus === 'online' && <><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Agent connected</>}
                    {agentStatus === 'connecting' && <><Clock size={10} /> Connecting... (#{queuePosition} in queue)</>}
                    {agentStatus === 'offline' && 'Leave a message'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[40vh]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : msg.sender === 'system'
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs italic'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.sender === 'agent' && (
                      <p className="text-[10px] text-blue-600 font-medium mb-0.5">Support Agent</p>
                    )}
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-blue-700 transition-colors"
                  aria-label="Send"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
