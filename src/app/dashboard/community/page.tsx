'use client';

import { useState } from 'react';

interface Group {
  id: number;
  name: string;
  members: number;
  description: string;
  icon: string;
  isJoined: boolean;
  lastActive: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  avatar: string;
}

const mockGroups: Group[] = [
  { id: 1, name: 'Nigerian Farmers Network', members: 2340, description: 'Connect with farmers across Nigeria. Share tips, market prices, and best practices.', icon: '🌾', isJoined: true, lastActive: '2 min ago' },
  { id: 2, name: 'Lagos Exporters Hub', members: 890, description: 'For exporters based in Lagos. Discuss shipping, documentation, and international markets.', icon: '🚢', isJoined: true, lastActive: '15 min ago' },
  { id: 3, name: 'Cold Chain Logistics', members: 456, description: 'Best practices for cold storage and temperature-controlled supply chains.', icon: '❄️', isJoined: false, lastActive: '1 hour ago' },
  { id: 4, name: 'Organic Farming Nigeria', members: 1200, description: 'Organic certification, sustainable farming methods, and premium market access.', icon: '🌱', isJoined: false, lastActive: '30 min ago' },
  { id: 5, name: 'Agri-Tech Innovators', members: 678, description: 'Technology solutions for agriculture. IoT, drones, AI, and precision farming.', icon: '🤖', isJoined: true, lastActive: '5 min ago' },
  { id: 6, name: 'Women in Agriculture', members: 1560, description: 'Empowering women farmers and agri-business owners across Africa.', icon: '👩‍🌾', isJoined: false, lastActive: '45 min ago' },
];

const mockMessages: Message[] = [
  { id: 1, sender: 'Adebayo O.', text: 'Has anyone noticed the tomato prices going up in Mile 12 market?', time: '10:30 AM', avatar: '👨‍🌾' },
  { id: 2, sender: 'Chioma N.', text: 'Yes! Up 15% this week. The rains affected supply from Jos.', time: '10:32 AM', avatar: '👩‍💼' },
  { id: 3, sender: 'Ibrahim M.', text: 'We have surplus from our greenhouse. Can supply at last week\'s price.', time: '10:35 AM', avatar: '👨‍💼' },
  { id: 4, sender: 'Funke A.', text: 'Ibrahim, what quantity can you supply? We need about 500kg weekly.', time: '10:38 AM', avatar: '👩‍🌾' },
  { id: 5, sender: 'Ibrahim M.', text: 'We can do 300kg weekly consistently. DM me for details.', time: '10:40 AM', avatar: '👨‍💼' },
  { id: 6, sender: 'Admin', text: '📢 Reminder: Weekly market price update will be posted at 2 PM today.', time: '10:45 AM', avatar: '🏪' },
];

export default function CommunityPage() {
  const [groups, setGroups] = useState(mockGroups);
  const [activeGroup, setActiveGroup] = useState<Group | null>(mockGroups[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showGroups, setShowGroups] = useState(true);

  const toggleJoin = (groupId: number) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, isJoined: !g.isJoined, members: g.isJoined ? g.members - 1 : g.members + 1 } : g
    ));
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '👤',
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-500 mt-1">Connect with farmers, suppliers, and industry peers</p>
        </div>
        <button
          onClick={() => setShowGroups(!showGroups)}
          className="btn-secondary sm:hidden"
        >
          {showGroups ? 'Show Chat' : 'Show Groups'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className={`lg:col-span-1 space-y-4 ${!showGroups ? 'hidden lg:block' : ''}`}>
          <div className="card">
            <h2 className="font-semibold text-gray-800 mb-3">Your Groups</h2>
            <div className="space-y-3">
              {groups.filter(g => g.isJoined).map((group) => (
                <button
                  key={group.id}
                  onClick={() => { setActiveGroup(group); setShowGroups(false); }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeGroup?.id === group.id ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{group.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.members} members • {group.lastActive}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-gray-800 mb-3">Discover Groups</h2>
            <div className="space-y-3">
              {groups.filter(g => !g.isJoined).map((group) => (
                <div key={group.id} className="p-3 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{group.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{group.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{group.members} members</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{group.description}</p>
                      <button
                        onClick={() => toggleJoin(group.id)}
                        className="mt-2 text-xs font-medium text-green-700 hover:text-green-800"
                      >
                        + Join Group
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`lg:col-span-2 ${showGroups ? 'hidden lg:block' : ''}`}>
          {activeGroup ? (
            <div className="card flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <span className="text-2xl">{activeGroup.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{activeGroup.name}</h3>
                  <p className="text-xs text-gray-500">{activeGroup.members} members • Active {activeGroup.lastActive}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xl flex-shrink-0">{msg.avatar}</span>
                    <div className={`max-w-[70%] ${msg.sender === 'You' ? 'text-right' : ''}`}>
                      <p className="text-xs text-gray-500 mb-1">
                        {msg.sender} • {msg.time}
                      </p>
                      <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                        msg.sender === 'You'
                          ? 'bg-green-700 text-white'
                          : msg.sender === 'Admin'
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="input-field flex-1"
                  />
                  <button onClick={sendMessage} className="btn-primary px-4">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card flex items-center justify-center h-[600px]">
              <div className="text-center">
                <span className="text-4xl">💬</span>
                <p className="text-gray-500 mt-4">Select a group to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
