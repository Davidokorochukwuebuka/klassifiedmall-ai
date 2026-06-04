'use client';

import { useState, useEffect } from 'react';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import { getGroups, getMessages } from '@/lib/api';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [active, setActive] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    setIsLoading(true);
    try {
      const res = await getGroups();
      const groups = res.data?.groups || [];
      // Convert groups to conversation format
      const convos = groups.map((g: any) => ({
        id: g.groupId || g.id,
        name: g.name,
        lastMsg: g.description || 'Start a conversation',
        members: g.members,
        unread: Math.floor(Math.random() * 3),
      }));
      setConversations(convos);
      if (convos.length > 0) {
        setActive(convos[0].id);
        await loadMessages(convos[0].id);
      }
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMessages(conversationId: string) {
    try {
      const res = await getMessages(conversationId);
      setMessages(res.data?.messages || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }

  async function handleSwitchConversation(id: string) {
    setActive(id);
    await loadMessages(id);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setSending(true);
    // Add message locally (optimistic update)
    const newMsg = {
      id: `MSG-${Date.now()}`,
      senderId: 'dev-user',
      senderName: 'You',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setInput('');
    setSending(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-5xl mx-auto">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto hidden sm:block">
        <div className="p-4">
          <h2 className="font-heading font-semibold flex items-center gap-2"><MessageCircle size={18} /> Messages</h2>
        </div>
        {conversations.map((c) => (
          <button key={c.id} onClick={() => handleSwitchConversation(c.id)} className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${active === c.id ? 'bg-primary/5' : ''}`}>
            <div className="flex justify-between items-start">
              <span className="font-medium text-sm">{c.name}</span>
              {c.members && <span className="text-xs text-gray-400">{c.members} members</span>}
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
          {conversations.find(c => c.id === active)?.name || 'Select a conversation'}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No messages yet. Start the conversation!</div>
          ) : (
            messages.map((m: any) => {
              const isMe = m.senderId === 'dev-user' || m.from === 'me';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'}`}>
                    {!isMe && <div className="text-xs font-medium mb-1 opacity-70">{m.senderName}</div>}
                    {m.content || m.text}
                    <div className={`text-xs mt-1 ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                      {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : m.time}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-pill border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <button type="submit" disabled={sending || !input.trim()} className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 transition-colors" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

