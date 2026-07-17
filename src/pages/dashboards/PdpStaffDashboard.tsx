import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Award,
  CheckCircle2,
  Users,
  ArrowRight,
  Calendar,
  Crown,
  TrendingUp,
  Sparkles,
  Megaphone,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function PdpStaffDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Current Ranking',
      value: 'Top 10',
      subtitle: 'Teams in current round',
      icon: <Trophy className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Top 10 performing teams',
      status: { label: 'Active', variant: 'success' as const },
      href: '/dashboard/view-ranking',
    },
    {
      title: 'Certificates Generated',
      value: '120',
      subtitle: 'Total certificates issued',
      icon: <Award className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Certificates generated for winners',
      status: { label: '+12', variant: 'success' as const },
      trend: { value: '+12', up: true },
      href: '/dashboard/certificates',
    },
    {
      title: 'Completed Events',
      value: '8',
      subtitle: 'Hackathons completed',
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Total completed hackathon events',
      status: { label: 'All Done', variant: 'success' as const },
      href: '/dashboard/statistics',
    },
    {
      title: 'Participants',
      value: '245',
      subtitle: 'Across all events',
      icon: <Users className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Total registered participants',
      status: { label: '+18', variant: 'success' as const },
      trend: { value: '+18%', up: true },
      href: '/dashboard/statistics',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Team Alpha', score: 92.5, change: 'up' as const, members: 5, track: 'AI/ML' },
    { rank: 2, name: 'Code Warriors', score: 89.8, change: 'same' as const, members: 4, track: 'FinTech' },
    { rank: 3, name: 'Quantum Coders', score: 86.5, change: 'up' as const, members: 5, track: 'AI/ML' },
    { rank: 4, name: 'Cloud Innovators', score: 84.2, change: 'down' as const, members: 4, track: 'Cloud' },
    { rank: 5, name: 'Data Dragons', score: 82.1, change: 'up' as const, members: 5, track: 'Data Science' },
  ];

  const announcements = [
    {
      title: 'Hackathon Opening Ceremony',
      content: 'Join us for the official kickoff this Friday at 10:00 AM in the Main Hall.',
      time: '2 hours ago',
      pinned: true,
    },
    {
      title: 'New Evaluation Criteria',
      content: 'The judging panel has updated the evaluation criteria for Round 2.',
      time: '1 day ago',
      pinned: false,
    },
    {
      title: 'Mentor Schedule Updated',
      content: 'Dr. Sarah Chen has updated her availability. New session slots are now open.',
      time: '3 days ago',
      pinned: false,
    },
  ];

  const recentActivities = [
    { action: 'Certificate generated for Team Alpha', time: '10 min ago', icon: <Award className="w-4 h-4" />, color: 'blue' },
    { action: 'Ranking published for Round 2', time: '1 hour ago', icon: <Trophy className="w-4 h-4" />, color: 'amber' },
    { action: 'Hackathon event completed', time: '3 hours ago', icon: <CheckCircle2 className="w-4 h-4" />, color: 'green' },
    { action: '45 new participants registered', time: '5 hours ago', icon: <Users className="w-4 h-4" />, color: 'purple' },
  ];

  const upcomingCeremony = {
    title: 'Awards & Closing Ceremony',
    date: 'March 28, 2026',
    time: '6:00 PM',
    venue: 'Main Auditorium',
    attendees: 245,
    daysLeft: 3,
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Robert'}!`}
      subtitle="Track rankings, certificates, and overall hackathon performance."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Leaderboard Preview + Upcoming Ceremony */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Leaderboard Preview */}
        <DashboardWidget
          title="Leaderboard Preview"
          subtitle="Top 5 performing teams"
          action={
            <button
              onClick={() => navigate('/dashboard/view-ranking')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Full ranking <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-2">
            {leaderboard.map((team) => (
              <div
                key={team.rank}
                className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                    team.rank === 1
                      ? 'bg-amber-100 text-amber-700'
                      : team.rank === 2
                      ? 'bg-gray-200 text-gray-700'
                      : team.rank === 3
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {team.rank === 1 ? <Crown className="w-4 h-4" /> : `#${team.rank}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{team.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {team.track} · {team.members} members
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">{team.score}</span>
                  {team.change === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Upcoming Ceremony */}
        <DashboardWidget
          title="Upcoming Ceremony"
          subtitle="Next major event"
          action={<Badge variant="amber">In {upcomingCeremony.daysLeft} days</Badge>}
        >
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">{upcomingCeremony.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{upcomingCeremony.venue}</p>
          </div>
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Date
              </span>
              <span className="font-medium text-gray-900">{upcomingCeremony.date}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="font-medium text-gray-900">{upcomingCeremony.time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Attendees
              </span>
              <span className="font-medium text-gray-900">{upcomingCeremony.attendees}</span>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Average Team Score */}
        <DashboardWidget
          title="Average Team Score"
          subtitle="Performance trend"
          action={<Badge variant="green">+0.4 vs last round</Badge>}
        >
          <div className="flex items-end gap-2 h-40 mt-4 px-1">
            {[7.8, 8.1, 7.9, 8.4, 8.6, 8.5, 8.9].map((score, idx) => {
              const percent = (score / 10) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-700">{score}</span>
                  <div className="w-full flex-1 bg-gray-100 rounded-lg relative overflow-hidden flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg transition-all duration-700"
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">R{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Participation Rate */}
        <DashboardWidget
          title="Participation Rate"
          subtitle="By event"
          action={<Badge variant="green">87% avg</Badge>}
        >
          <div className="space-y-3 mt-3">
            {[
              { event: 'SEAL Spring 2026', percent: 92 },
              { event: 'Winter Hack 2025', percent: 85 },
              { event: 'AI Innovation 2025', percent: 78 },
              { event: 'Cloud Build 2025', percent: 88 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{item.event}</span>
                  <span className="text-sm font-bold text-gray-900">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Submission Statistics */}
        <DashboardWidget
          title="Submission Statistics"
          subtitle="Round 2 status"
          action={<Badge variant="green">91% submitted</Badge>}
        >
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
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
                <span className="text-xs text-gray-500">138/152</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 w-full">
              <div className="text-center">
                <p className="text-base font-bold text-green-600">138</p>
                <p className="text-xs text-gray-500">Done</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-amber-600">10</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-red-600">4</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Announcements + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Announcements */}
        <DashboardWidget
          title="Latest Announcements"
          subtitle="Recent updates"
          action={
            <button
              onClick={() => navigate('/dashboard/announcements')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                    {ann.pinned && <Badge variant="blue">Pinned</Badge>}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-1.5">{ann.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Recent Activities */}
        <DashboardWidget title="Recent Activities" subtitle="Latest system events">
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-600',
                amber: 'bg-amber-100 text-amber-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
              };
              return (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[activity.color]}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
}