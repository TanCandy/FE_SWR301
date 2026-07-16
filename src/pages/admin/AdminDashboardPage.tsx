import { useNavigate } from 'react-router-dom';
import {
  Users,
  Trophy,
  UserCheck,
  Gavel,
  Layers,
  Calendar,
  Upload,
  Activity,
  ArrowRight,
  UserPlus,
  GitBranch,
  FileCheck2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Registered Users',
      value: '256',
      subtitle: '+18 this week',
      icon: <Users className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Total users registered in the system',
      status: { label: '+18', variant: 'success' as const },
      trend: { value: '+18', up: true },
      href: '/dashboard/manage-users',
    },
    {
      title: 'Active Teams',
      value: '42',
      subtitle: 'Across 5 tracks',
      icon: <Trophy className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Currently active participating teams',
      status: { label: 'Active', variant: 'success' as const },
      href: '/dashboard/manage-participants',
    },
    {
      title: 'Mentors',
      value: '18',
      subtitle: '15 available today',
      icon: <UserCheck className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Mentors currently registered',
      status: { label: '15 Available', variant: 'info' as const },
      href: '/dashboard/manage-users',
    },
    {
      title: 'Judges',
      value: '12',
      subtitle: 'Assigned to Round 2',
      icon: <Gavel className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Judges for the current round',
      status: { label: 'Round 2', variant: 'info' as const },
      href: '/dashboard/manage-users',
    },
    {
      title: 'Hackathon Tracks',
      value: '5',
      subtitle: 'AI, Web, Mobile, Game, IoT',
      icon: <Layers className="w-5 h-5" />,
      iconColor: 'indigo' as const,
      tooltip: 'Active hackathon competition tracks',
      status: { label: 'All Active', variant: 'success' as const },
      href: '/dashboard/manage-track',
    },
    {
      title: 'Current Round',
      value: 'Round 2',
      subtitle: 'Submission Phase',
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'pink' as const,
      tooltip: 'Current hackathon round',
      status: { label: 'In Progress', variant: 'info' as const },
      href: '/dashboard/manage-round',
    },
    {
      title: 'Submissions',
      value: '138',
      subtitle: '91% submission rate',
      icon: <Upload className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Total project submissions received',
      status: { label: '91%', variant: 'success' as const },
      progress: 91,
      progressColor: 'green' as const,
      href: '/dashboard/reports',
    },
    {
      title: 'System Health',
      value: '99.98%',
      subtitle: 'All services operational',
      icon: <Activity className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'System uptime and health status',
      status: { label: 'Operational', variant: 'success' as const },
      progress: 99.98,
      progressColor: 'green' as const,
    },
  ];

  const recentActivities = [
    {
      type: 'user',
      title: 'New user registered',
      detail: 'Sarah Johnson joined as Team Leader',
      time: '5 min ago',
      icon: <UserPlus className="w-4 h-4" />,
      color: 'blue',
    },
    {
      type: 'team',
      title: 'Team created',
      detail: 'Team "Code Warriors" was formed',
      time: '15 min ago',
      icon: <Trophy className="w-4 h-4" />,
      color: 'green',
    },
    {
      type: 'judge',
      title: 'Judge assigned',
      detail: 'Michael Park assigned to Round 2 reviews',
      time: '1 hour ago',
      icon: <Gavel className="w-4 h-4" />,
      color: 'amber',
    },
    {
      type: 'submission',
      title: 'Submission uploaded',
      detail: 'Quantum Coders submitted Sprint 2 deliverables',
      time: '2 hours ago',
      icon: <FileCheck2 className="w-4 h-4" />,
      color: 'purple',
    },
    {
      type: 'team',
      title: 'Team merged',
      detail: 'Two teams merged into "Cloud Innovators"',
      time: '3 hours ago',
      icon: <GitBranch className="w-4 h-4" />,
      color: 'indigo',
    },
    {
      type: 'user',
      title: 'User role updated',
      detail: 'Taylor Kim promoted to Mentor',
      time: '5 hours ago',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'pink',
    },
    {
      type: 'system',
      title: 'System alert resolved',
      detail: 'Database performance issue fixed',
      time: '8 hours ago',
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'green',
    },
  ];

  // Chart data for User Registration (last 7 days)
  const userRegistrationData = [
    { day: 'Mon', count: 8 },
    { day: 'Tue', count: 12 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 9 },
    { day: 'Fri', count: 18 },
    { day: 'Sat', count: 22 },
    { day: 'Sun', count: 14 },
  ];
  const maxUserCount = Math.max(...userRegistrationData.map((d) => d.count));

  // Teams per Track
  const teamsPerTrack = [
    { name: 'AI/ML', count: 14, color: 'bg-blue-500' },
    { name: 'Web', count: 10, color: 'bg-green-500' },
    { name: 'Mobile', count: 7, color: 'bg-purple-500' },
    { name: 'Game', count: 6, color: 'bg-amber-500' },
    { name: 'IoT', count: 5, color: 'bg-pink-500' },
  ];
  const maxTeams = Math.max(...teamsPerTrack.map((t) => t.count));

  // Average Scores (per criterion)
  const avgScores = [
    { criterion: 'Innovation', score: 8.4 },
    { criterion: 'Technical', score: 8.1 },
    { criterion: 'UX', score: 8.6 },
    { criterion: 'Business', score: 7.9 },
    { criterion: 'Presentation', score: 8.3 },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}!`}
      subtitle="System overview and management at a glance."
      actions={
        <button
          onClick={() => navigate('/dashboard/reports')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
        >
          <TrendingUp className="w-4 h-4" />
          View Reports
        </button>
      }
    >
      {/* Stats Cards - 4 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {stats.slice(0, 4).map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Stats Cards - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.slice(4, 8).map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Registration Chart */}
        <DashboardWidget
          title="User Registration"
          subtitle="New users this week"
          action={<Badge variant="green">+18 this week</Badge>}
          className="lg:col-span-2"
        >
          <div className="flex items-end gap-3 h-48 px-2">
            {userRegistrationData.map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">{d.count}</span>
                <div className="w-full flex-1 bg-gray-100 rounded-lg relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg transition-all duration-700 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(d.count / maxUserCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Submission Progress */}
        <DashboardWidget
          title="Submission Progress"
          subtitle="Round 2 status"
          action={<Badge variant="green">91%</Badge>}
        >
          <div className="flex flex-col items-center justify-center py-4">
            {/* Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#2563EB"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={339.292}
                  strokeDashoffset={339.292 * (1 - 0.91)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">91%</span>
                <span className="text-xs text-gray-500">138 / 152</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 w-full">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">138</p>
                <p className="text-xs text-gray-500">Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-amber-600">10</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">4</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Teams per Track */}
        <DashboardWidget title="Teams per Track" subtitle="Distribution by category">
          <div className="space-y-3 mt-2">
            {teamsPerTrack.map((track, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{track.name}</span>
                  <span className="text-sm font-bold text-gray-900">{track.count} teams</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${track.color} transition-all duration-500`}
                    style={{ width: `${(track.count / maxTeams) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Average Scores per Criterion */}
        <DashboardWidget title="Average Scores" subtitle="Across all evaluated projects">
          <div className="grid grid-cols-5 gap-3 mt-2">
            {avgScores.map((c, idx) => {
              const percent = (c.score / 10) * 100;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="26" stroke="#E5E7EB" strokeWidth="5" fill="none" />
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        stroke="#2563EB"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={163.36}
                        strokeDashoffset={163.36 * (1 - percent / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">{c.score}</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-gray-600 mt-2 text-center">{c.criterion}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">Overall Average</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">8.26 / 10</p>
          </div>
        </DashboardWidget>
      </div>

      {/* Recent Activities + Evaluation Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <DashboardWidget
          title="Recent Activities"
          subtitle="Latest system events"
          action={
            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                amber: 'bg-amber-100 text-amber-600',
                purple: 'bg-purple-100 text-purple-600',
                indigo: 'bg-indigo-100 text-indigo-600',
                pink: 'bg-pink-100 text-pink-600',
              };
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[activity.color]}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Evaluation Completion */}
        <DashboardWidget title="Evaluation Completion" subtitle="Judge progress per round">
          <div className="space-y-4 mt-2">
            {[
              { round: 'Round 1', completed: 100, total: 152, color: 'green' },
              { round: 'Round 2', completed: 67, total: 152, color: 'blue' },
              { round: 'Round 3', completed: 0, total: 152, color: 'gray' },
            ].map((r, idx) => {
              const percent = Math.round((r.completed / r.total) * 100);
              const colorMap = {
                green: 'bg-green-500',
                blue: 'bg-blue-500',
                gray: 'bg-gray-300',
              };
              return (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-sm">{r.round}</span>
                    <span className="text-sm font-bold text-gray-700">{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${colorMap[r.color as keyof typeof colorMap]}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {Math.round((r.completed / 100) * r.total)} / {r.total} projects
                  </p>
                </div>
              );
            })}
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
}