'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@klassified.com',
    phone: '+234 801 234 5678',
    business: 'Ade Farms Ltd',
    location: 'Oyo State, Nigeria',
    bio: 'Experienced farmer specializing in tomatoes and peppers. 10+ years in agricultural supply chain.',
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: true,
    communityMessages: true,
    promotions: false,
    smsAlerts: true,
    emailDigest: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Save Confirmation */}
      {saved && (
        <div className="fixed top-20 right-6 bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg z-50">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-green-50 text-green-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <div className="card space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <button className="btn-secondary text-sm">Change Photo</button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={profile.business}
                    onChange={(e) => setProfile({ ...profile, business: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </div>

              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="card space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'orderUpdates' && 'Get notified when order status changes'}
                        {key === 'priceAlerts' && 'Alerts when tracked product prices change'}
                        {key === 'communityMessages' && 'New messages in your community groups'}
                        {key === 'promotions' && 'Special offers and platform updates'}
                        {key === 'smsAlerts' && 'Receive critical alerts via SMS'}
                        {key === 'emailDigest' && 'Weekly summary of your activity'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleSave} className="btn-primary">
                Save Preferences
              </button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="card space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" placeholder="Enter new password" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="input-field" />
                </div>
              </div>

              <button onClick={handleSave} className="btn-primary">
                Update Password
              </button>

              <hr className="border-gray-200" />

              <div>
                <h3 className="font-medium text-gray-800 mb-3">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account</p>
                <button className="btn-secondary">Enable 2FA</button>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h3 className="font-medium text-gray-800 mb-3">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span>💻</span>
                      <div>
                        <p className="text-sm font-medium">Chrome on Windows</p>
                        <p className="text-xs text-gray-500">Lagos, Nigeria • Current session</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span>📱</span>
                      <div>
                        <p className="text-sm font-medium">Safari on iPhone</p>
                        <p className="text-xs text-gray-500">Lagos, Nigeria • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="card space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">App Preferences</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select className="input-field">
                    <option>English</option>
                    <option>Yoruba</option>
                    <option>Hausa</option>
                    <option>Igbo</option>
                    <option>Pidgin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select className="input-field">
                    <option>NGN (₦) - Nigerian Naira</option>
                    <option>USD ($) - US Dollar</option>
                    <option>GBP (£) - British Pound</option>
                    <option>EUR (€) - Euro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Measurement Unit</label>
                  <select className="input-field">
                    <option>Kilograms (kg)</option>
                    <option>Tonnes</option>
                    <option>Pounds (lbs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                  <select className="input-field">
                    <option>West Africa Time (WAT) UTC+1</option>
                    <option>Greenwich Mean Time (GMT) UTC+0</option>
                    <option>East Africa Time (EAT) UTC+3</option>
                  </select>
                </div>
              </div>

              <button onClick={handleSave} className="btn-primary">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
