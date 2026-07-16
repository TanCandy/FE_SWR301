import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { Users, CheckSquare, FileText, Bell, Clock, TrendingUp, Trophy } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'My Tasks', value: '12', icon: CheckSquare, color: 'bg-green-500', completed: 8 },
    { label: 'Team Rank', value: '#3', icon: Trophy, color: 'bg-amber-500' },
    { label: 'Deliverables', value: '4/6', icon: FileText, color: 'bg-blue-500' },
    { label: 'Score', value: '8.7', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const teamMembers = [
    { name: 'Alex Johnson', role: 'Team Leader', status: 'online' },
    { name: 'Jamie Rodriguez', role: 'You', status: 'online' },
    { name: 'Chris Lee', role: 'Developer', status: 'away' },
    { name: 'Taylor Kim', role: 'Designer', status: 'offline' },
    { name: 'Jordan Patel', role: 'Data Scientist', status: 'online' },
  ];

  const tasks = [
    { title: 'Implement API endpoints', status: 'completed', assignee: 'Jamie Rodriguez' },
    { title: 'Design database schema', status: 'completed', assignee: 'Taylor Kim' },
    { title: 'Create dashboard UI', status: 'in-progress', assignee: 'Taylor Kim' },
    { title: 'Write unit tests', status: 'pending', assignee: 'Chris Lee' },
    { title: 'Deploy to staging', status: 'pending', assignee: 'Jordan Patel' },
  ];

  const announcements = [
    { title: 'Round 2 deadline extended', date: 'Today', important: true },
    { title: 'New mentor session available', date: 'Yesterday', important: false },
    { title: 'System maintenance tonight', date: '2 days ago', important: false },
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
                Team "Innovators" • Ranked #3 Overall
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
                    {stat.completed !== undefined && (
                      <span className="text-xs text-gray-400">{stat.completed} done</span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Tasks */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h2>
                <div className="space-y-3">
                  {tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-green-100' : task.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-200'
                      }`}>
                        {task.status === 'completed' && <CheckSquare className="w-4 h-4 text-green-600" />}
                        {task.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-400">{task.assignee}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
                <div className="space-y-3">
                  {announcements.map((ann, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-2">
                        {ann.important && <Bell className="w-4 h-4 text-red-500 mt-0.5" />}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{ann.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{ann.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl text-center">
                      <div className="relative inline-block mb-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto">
                          {member.name.charAt(0)}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' :
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
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
