import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import {
  Users, UserPlus, Calendar, Trophy, Layers, Flag, Gift, BarChart3, Settings,
  TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500', trend: '+12%', up: true },
    { label: 'Active Teams', value: '156', icon: UserPlus, color: 'bg-green-500', trend: '+8%', up: true },
    { label: 'Mentors', value: '48', icon: Calendar, color: 'bg-purple-500', trend: '+3', up: true },
    { label: 'Judges', value: '24', icon: Trophy, color: 'bg-amber-500', trend: '-2', up: false },
  ];

  const tracks = [
    { name: 'AI/ML', teams: 45, submissions: 38 },
    { name: 'FinTech', teams: 32, submissions: 28 },
    { name: 'HealthTech', teams: 28, submissions: 24 },
    { name: 'EdTech', teams: 25, submissions: 22 },
    { name: 'Cloud', teams: 26, submissions: 20 },
  ];

  const rounds = [
    { name: 'Round 1: Ideation', status: 'completed', deadline: 'Completed' },
    { name: 'Round 2: Development', status: 'in-progress', deadline: 'In 5 days' },
    { name: 'Round 3: Final Presentation', status: 'upcoming', deadline: 'In 14 days' },
  ];

  const recentActivity = [
    { action: 'New user registered: Sarah Johnson', time: '5 minutes ago', type: 'user' },
    { action: 'Team "Code Warriors" submitted deliverables', time: '15 minutes ago', type: 'submission' },
    { action: 'Judge Michael Chen completed 3 evaluations', time: '1 hour ago', type: 'evaluation' },
    { action: 'New mentor session scheduled', time: '2 hours ago', type: 'calendar' },
    { action: 'Prize pool updated: $50,000 total', time: '3 hours ago', type: 'prize' },
  ];

  const systemStats = [
    { label: 'API Uptime', value: '99.9%', status: 'healthy' },
    { label: 'Active Sessions', value: '847', status: 'healthy' },
    { label: 'Storage Used', value: '67%', status: 'warning' },
    { label: 'Pending Approvals', value: '12', status: 'attention' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
        <Header />

        <main className="pt-16 min-h-screen">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                System overview and management
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      stat.up ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.trend}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tracks Overview */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Tracks Overview</h2>
                  <button className="text-sm text-blue-600 font-medium">Manage Tracks</button>
                </div>
                <div className="space-y-4">
                  {tracks.map((track, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Layers className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{track.name}</p>
                            <p className="text-xs text-gray-500">{track.teams} teams registered</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{track.submissions}/{track.teams}</p>
                          <p className="text-xs text-gray-500">submissions</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(track.submissions / track.teams) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                <div className="space-y-4">
                  {systemStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{stat.label}</p>
                        <p className="text-sm text-gray-500">{stat.value}</p>
                      </div>
                      <span className={`w-3 h-3 rounded-full ${
                        stat.status === 'healthy' ? 'bg-green-500' :
                        stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rounds Timeline */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Rounds Timeline</h2>
                <div className="space-y-4">
                  {rounds.map((round, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        round.status === 'completed' ? 'bg-green-100' :
                        round.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {round.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {round.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-600" />}
                        {round.status === 'upcoming' && <Flag className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{round.name}</p>
                        <p className={`text-xs ${
                          round.status === 'completed' ? 'text-green-600' :
                          round.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {round.deadline}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'submission' ? 'bg-green-100' :
                        activity.type === 'evaluation' ? 'bg-purple-100' :
                        activity.type === 'calendar' ? 'bg-amber-100' : 'bg-pink-100'
                      }`}>
                        {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'submission' && <Gift className="w-4 h-4 text-green-600" />}
                        {activity.type === 'evaluation' && <Trophy className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'calendar' && <Calendar className="w-4 h-4 text-amber-600" />}
                        {activity.type === 'prize' && <Gift className="w-4 h-4 text-pink-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Manage Users</p>
                  </button>
                  <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                    <UserPlus className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Add Participant</p>
                  </button>
                  <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                    <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Manage Event</p>
                  </button>
                  <button className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-center">
                    <Layers className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Manage Tracks</p>
                  </button>
                  <button className="p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors text-center">
                    <Gift className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Manage Prizes</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
