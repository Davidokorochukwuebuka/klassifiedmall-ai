'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, ShoppingBag, Truck, HelpCircle, MessageCircle } from 'lucide-react';
import { sendChatMessage } from '../lib/api';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  model?: string;
}

/**
 * Convert a Bedrock model ID to a short, user-friendly display name.
 */
function getModelDisplayName(modelId?: string): string | null {
  if (!modelId) return null;
  if (modelId.includes('nova-lite')) return 'Nova Lite';
  if (modelId.includes('claude-sonnet')) return 'Claude Sonnet';
  if (modelId.includes('nova-canvas')) return 'Nova Canvas';
  if (modelId.includes('nova-sonic')) return 'Nova Sonic';
  return modelId;
}

const quickActions = [
  { icon: ShoppingBag, label: 'Find products', prompt: 'Help me find products' },
  { icon: Truck, label: 'Track order', prompt: 'Track my order' },
  { icon: HelpCircle, label: 'How it works', prompt: 'How does KlASSIFIED work?' },
  { icon: MessageCircle, label: 'Contact support', prompt: 'I need help with my account' },
];

const greetings = [
  'Hi there! 👋 I\'m AMI, your AI shopping assistant. How can I help you today?',
  'Welcome to KlASSIFIED! 🎉 I can help you find products, track orders, or answer any questions.',
  'Hello! 👋 Need help finding something? AMI is here to assist you with anything on the platform.',
];

const welcomeBackMessages = [
  'Welcome back! 👋 AMI missed you!',
  'Hey there! AMI is ready to help! 🎉',
  'Good to see you again! Need anything? 🤗',
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Show welcome-back popup after 2 seconds
  useEffect(() => {
    const msg = welcomeBackMessages[Math.floor(Math.random() * welcomeBackMessages.length)];
    setWelcomeMessage(msg);
    const timer = setTimeout(() => setShowWelcomePopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss welcome popup after 6 seconds
  useEffect(() => {
    if (showWelcomePopup) {
      const timer = setTimeout(() => setShowWelcomePopup(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomePopup]);

  // Show bubble after 5 seconds (after welcome popup dismisses)
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss bubble after 8 seconds
  useEffect(() => {
    if (showBubble && !isOpen) {
      const timer = setTimeout(() => setShowBubble(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showBubble, isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setShowBubble(false);
    setShowWelcomePopup(false);
    if (messages.length === 0) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ id: '1', role: 'assistant', content: greeting, timestamp: new Date() }]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await sendChatMessage(text);
      const reply = data.reply || data.data?.reply || 'Sorry, I couldn\'t process that. Please try again.';
      const model = data.model || data.data?.model;

      setMessages((prev) => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
        model,
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment. 🙏',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Welcome Back Popup */}
        <AnimatePresence>
          {showWelcomePopup && !isOpen && (
            <motion.div
              className="absolute bottom-16 right-0 w-72 p-4 rounded-2xl bg-white dark:bg-card-dark shadow-neon border border-primary/20 mb-2"
              initial={{ opacity: 0, scale: 0.3, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <button onClick={() => setShowWelcomePopup(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" aria-label="Dismiss">
                <X size={14} />
              </button>
              <div className="flex items-start gap-3">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🤖
                </motion.span>
                <div>
                  <p className="text-sm font-bold text-primary">AMI</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{welcomeMessage}</p>
                </div>
              </div>
              <button
                onClick={openChat}
                className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-xs font-bold hover:shadow-lg transition-shadow"
              >
                Chat with AMI →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Greeting Bubble */}
        <AnimatePresence>
          {showBubble && !isOpen && !showWelcomePopup && (
            <motion.div
              className="absolute bottom-16 right-0 w-64 p-3 rounded-2xl bg-white dark:bg-card-dark shadow-neon border border-primary/20 mb-2"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <button onClick={() => setShowBubble(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" aria-label="Dismiss">
                <X size={14} />
              </button>
              <div className="flex items-start gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <p className="text-sm font-medium">Hi! I&apos;m AMI</p>
                  <p className="text-xs text-gray-500 mt-0.5">Need help finding something? I&apos;m here to assist!</p>
                </div>
              </div>
              <button
                onClick={openChat}
                className="mt-2 w-full py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-xs font-medium"
              >
                Chat with me →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button - Continuous Bounce/Dangle Animation */}
        <motion.button
          onClick={isOpen ? () => setIsOpen(false) : openChat}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-sky to-accent text-white shadow-neon flex items-center justify-center relative"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0, -4, 0],
            rotate: [0, -3, 3, -2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
          aria-label="AMI AI Assistant"
        >
          {isOpen ? <X size={22} /> : <Sparkles size={22} />}
          {!isOpen && (
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] rounded-3xl bg-white dark:bg-card-dark shadow-neon border border-primary/10 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-accent text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-sm">AMI AI Assistant</h3>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online · Typically replies instantly
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[40vh]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="max-w-[80%]">
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-accent text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'assistant' && getModelDisplayName(msg.model) && (
                      <p className="mt-1 ml-2 text-[10px] text-gray-400 dark:text-gray-500">
                        ⚡ {getModelDisplayName(msg.model)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-medium whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AMI anything..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

