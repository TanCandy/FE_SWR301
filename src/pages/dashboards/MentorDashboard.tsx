import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { Calendar, Users, Clock, Star, TrendingUp, FileText } from 'lucide-react';

export default function MentorDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Active Sessions', value: '4', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Assigned Teams', value: '6', icon: Users, color: 'bg-blue-500' },
    { label: 'Hours Mentored', value: '24', icon: Clock, color: 'bg-green-500' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-amber-500' },
  ];

  const assignedTeams = [
    { name: 'Quantum Coders', track: 'AI/ML', progress: 75, members: 4 },
    { name: 'Cloud Innovators', track: 'Cloud', progress: 60, members: 5 },
    { name: 'Data Wizards', track: 'Data Science', progress: 85, members: 3 },
  ];

  const upcomingSessions = [
    { team: 'Quantum Coders', date: 'Today, 3:00 PM', topic: 'Model Optimization' },
    { team: 'Cloud Innovators', date: 'Tomorrow, 10:00 AM', topic: 'Architecture Review' },
    { team: 'Data Wizards', date: 'Friday, 2:00 PM', topic: 'Data Pipeline' },
  ];

  const recentFeedback = [
    { team: 'Quantum Coders', feedback: 'Great progress on the ML model! Focus on edge cases next.', date: '2 days ago' },
    { team: 'Cloud Innovators', feedback: 'Good architecture. Consider adding caching layer.', date: '3 days ago' },
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
                Welcome, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-500 mt-1">
                Here's your mentoring overview
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
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assigned Teams */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Teams</h2>
                <div className="space-y-4">
                  {assignedTeams.map((team, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{team.name}</p>
                          <p className="text-sm text-gray-500">{team.track} • {team.members} members</p>
                        </div>
                        <span className="text-lg font-bold text-purple-600">{team.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${team.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
                <div className="space-y-4">
                  {upcomingSessions.map((session, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{session.team}</p>
                        <p className="text-xs text-gray-500">{session.topic}</p>
                        <p className="text-xs text-purple-600 mt-1 font-medium">{session.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback Given</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentFeedback.map((fb, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{fb.team}</p>
                          <p className="text-sm text-gray-600 mt-1">{fb.feedback}</p>
                          <p className="text-xs text-gray-400 mt-2">{fb.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
