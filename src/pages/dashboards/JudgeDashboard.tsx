import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { Folder, ClipboardCheck, Star, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function JudgeDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Assigned Projects', value: '12', icon: Folder, color: 'bg-amber-500' },
    { label: 'Pending Reviews', value: '4', icon: Clock, color: 'bg-orange-500' },
    { label: 'Completed', value: '8', icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Average Score', value: '8.4', icon: Star, color: 'bg-purple-500' },
  ];

  const assignedProjects = [
    { name: 'Quantum Analytics', team: 'Data Masters', track: 'AI/ML', status: 'pending', submitted: '2 days ago' },
    { name: 'Health Tracker Pro', team: 'Wellness Warriors', track: 'HealthTech', status: 'pending', submitted: '3 days ago' },
    { name: 'FinTech Connect', team: 'Money Makers', track: 'FinTech', status: 'pending', submitted: '1 day ago' },
    { name: 'EduLearn Platform', team: 'LearnHub', track: 'EdTech', status: 'completed', score: 8.5 },
  ];

  const evaluationCriteria = [
    { name: 'Innovation', weight: 25, avgScore: 8.2 },
    { name: 'Technical Implementation', weight: 30, avgScore: 8.7 },
    { name: 'User Experience', weight: 20, avgScore: 8.0 },
    { name: 'Business Potential', weight: 15, avgScore: 7.9 },
    { name: 'Presentation', weight: 10, avgScore: 8.8 },
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
                Judge Dashboard • AI/ML & FinTech Tracks
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
              {/* Assigned Projects */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Assigned Projects</h2>
                  <span className="text-sm text-amber-600 font-medium">{stats[1].value} pending review</span>
                </div>
                <div className="space-y-4">
                  {assignedProjects.map((project, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.team} • {project.track}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {project.status === 'completed' ? `Score: ${project.score}` : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Submitted: {project.submitted}</span>
                        <button className={`text-sm font-medium ${
                          project.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {project.status === 'completed' ? 'View Score' : 'Start Review'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Criteria</h2>
                <div className="space-y-4">
                  {evaluationCriteria.map((criteria, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{criteria.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{criteria.avgScore}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${criteria.avgScore * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{criteria.weight}% weight</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-left">
                    <ClipboardCheck className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">Submit Evaluation</p>
                    <p className="text-xs text-gray-500 mt-1">Evaluate a submission</p>
                  </button>
                  <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left">
                    <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">View Rankings</p>
                    <p className="text-xs text-gray-500 mt-1">Current standings</p>
                  </button>
                  <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-left">
                    <AlertCircle className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-900">Raise Concern</p>
                    <p className="text-xs text-gray-500 mt-1">Flag an issue</p>
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
