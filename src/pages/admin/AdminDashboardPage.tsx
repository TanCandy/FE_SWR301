import { useState } from 'react';
import { Users, Trophy, Calendar, Layers, Download, Upload, Plus } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import StatCard from '../../components/ui/StatCard';

export default function AdminDashboardPage() {
  return (
    <SharedLayout
      title="Admin Dashboard"
      subtitle="System overview and management"
      breadcrumbs={[{ label: 'Dashboard' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="1,234" icon={<Users className="w-6 h-6" />} color="blue" trend="+12%" trendUp />
        <StatCard title="Active Teams" value="156" icon={<Trophy className="w-6 h-6" />} color="green" trend="+8%" trendUp />
        <StatCard title="Mentors" value="48" icon={<Calendar className="w-6 h-6" />} color="purple" />
        <StatCard title="Judges" value="24" icon={<Layers className="w-6 h-6" />} color="amber" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: <Users className="w-5 h-5" />, label: 'Manage Users' },
            { icon: <Users className="w-5 h-5" />, label: 'Participants' },
            { icon: <Calendar className="w-5 h-5" />, label: 'Events' },
            { icon: <Layers className="w-5 h-5" />, label: 'Tracks' },
            { icon: <Trophy className="w-5 h-5" />, label: 'Prizes' },
          ].map((action) => (
            <button key={action.label} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-blue-600">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered: Sarah Johnson', time: '5 min ago' },
            { action: 'Team "Code Warriors" submitted deliverables', time: '15 min ago' },
            { action: 'Judge Michael completed 3 evaluations', time: '1 hour ago' },
            { action: 'New mentor session scheduled', time: '2 hours ago' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <p className="text-gray-700">{item.action}</p>
              <span className="text-sm text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}
