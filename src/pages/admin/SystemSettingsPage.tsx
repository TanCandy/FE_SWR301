import { useState } from 'react';
import { Settings, Mail, Bell, Palette, Shield, Database } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';

export default function AdminSystemSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <SharedLayout
      title="System Settings"
      subtitle="Configure system settings"
      breadcrumbs={[{ label: 'System Settings' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 text-lg">General Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <input type="text" defaultValue="SEAL Hackathon" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Timezone</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl">Save Changes</button>
            </div>
          )}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 text-lg">Email Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input type="text" defaultValue="587" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl">Save Changes</button>
            </div>
          )}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 text-lg">Security Settings</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for all administrators</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Password Requirements</p>
                  <p className="text-sm text-gray-500">Enforce strong passwords</p>
                </div>
                <input type="checkbox" className="w-5 h-5" defaultChecked />
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </SharedLayout>
  );
}
