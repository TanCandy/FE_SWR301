import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { PAGE_COMPONENTS } from '../../config/navigation';
import { Users, Calendar, Upload, ClipboardCheck, Trophy, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Team Members', value: '5', icon: Users, color: 'bg-blue-500', trend: '+2 this week' },
    { label: 'Mentor Sessions', value: '3', icon: Calendar, color: 'bg-purple-500', trend: 'Next: Tomorrow' },
    { label: 'Deliverables', value: '8/12', icon: Upload, color: 'bg-green-500', trend: '66% complete' },
    { label: 'Avg Score', value: '8.5', icon: Trophy, color: 'bg-amber-500', trend: '+0.5 from last round' },
  ];

  const upcomingDeadlines = [
    { task: 'Project Documentation', due: 'Tomorrow, 5:00 PM', status: 'pending' },
    { task: 'Code Submission - Sprint 2', due: 'In 3 days', status: 'in-progress' },
    { task: 'Presentation Deck', due: 'In 5 days', status: 'pending' },
  ];

  const recentActivity = [
    { action: 'Submitted sprint 1 deliverables', time: '2 hours ago', type: 'upload' },
    { action: 'Received mentor feedback on UI design', time: '5 hours ago', type: 'feedback' },
    { action: 'Team meeting scheduled for tomorrow', time: 'Yesterday', type: 'calendar' },
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
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-500 mt-1">
                Here's an overview of your hackathon progress
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
                    <span className="text-xs text-gray-400">{stat.trend}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Deadlines */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
                  <span className="text-sm text-blue-600 font-medium">View all</span>
                </div>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        deadline.status === 'in-progress' ? 'bg-blue-100' : 'bg-amber-100'
                      }`}>
                        <Clock className={`w-5 h-5 ${
                          deadline.status === 'in-progress' ? 'text-blue-600' : 'text-amber-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{deadline.task}</p>
                        <p className="text-sm text-gray-500">{deadline.due}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deadline.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {deadline.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Mentor</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold text-xl">
                    SC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Sarah Chen</p>
                    <p className="text-sm text-gray-500">AI/ML Specialist</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Next Session</span>
                    <span className="font-medium text-gray-900">Tomorrow, 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sessions Completed</span>
                    <span className="font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Feedback Given</span>
                    <span className="font-medium text-gray-900">5 reviews</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {activity.type === 'upload' && <Upload className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'feedback' && <ClipboardCheck className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'calendar' && <Calendar className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
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
